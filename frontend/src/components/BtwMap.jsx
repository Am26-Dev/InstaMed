import React, { useContext, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet-routing-machine"; // Importing routing machine
import { AppContext } from "../context/AppContext";

export const BtwMap = () => {
  const [userPosition, setUserPosition] = useState({
    latitude: 28.6139, // Initial default coordinates for user (Delhi)
    longitude: 77.209,
  });
  const [doctorPosition, setDoctorPosition] = useState(null); // State to store doctor's coordinates
  const [isUserPositionFetched, setIsUserPositionFetched] = useState(false); // Flag to check if position is updated
  const { loadUserProfileData, userData, doctors, getDoctorsData } = useContext(AppContext);
  const [distance, setDistance] = useState(null);

  // Fetching user data and setting position
  useEffect(() => {
    if (!userData) {
      loadUserProfileData();
      return;
    }

    if (userData.address && userData.address.locality) {
      const locality = userData.address.locality; // e.g., "Janakpuri"
      const district = userData.address.district || ""; // e.g., "West Delhi"
      const state = userData.address.state || ""; // e.g., "Delhi"
      const country = userData.address.country || ""; // e.g., "India"

      const searchQuery = `${locality}, ${district}, ${state}, ${country}`.trim();
      console.log("Search query for user:", searchQuery); // Debug: log the constructed search query for user

      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&addressdetails=1&limit=1`
          );

          console.log("API Response for user:", response.data); // Debug: log the response from API

          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setUserPosition({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
            setIsUserPositionFetched(true); // Set the flag to true once position is fetched
          } else {
            console.error("No results found for address:", searchQuery);
          }
        } catch (error) {
          console.error("Error fetching coordinates for user:", error);
        }
      };

      fetchCoordinates();
    }
  }, [userData, loadUserProfileData]);

  // Fetching doctor data and setting coordinates based on doctor's address
  useEffect(() => {
    const fetchDoctorCoordinates = async () => {
      if (!doctors || doctors.length === 0) {
        return;
      }

      // Loop through each doctor and fetch their coordinates
      for (const doctor of doctors) {
        if (doctor.address && doctor.address.locality) {
          const locality = doctor.address.locality;
          const district = doctor.address.district || "";
          const state = doctor.address.state || "";
          const country = doctor.address.country || "";

          const searchQuery = `${locality}, ${district}, ${state}, ${country}`.trim();
          console.log("Doctor search query:", searchQuery); // Debug: log the constructed search query for doctor

          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&addressdetails=1&limit=1`
            );

            console.log("API Response for doctor:", response.data); // Debug: log the response from API

            if (response.data.length > 0) {
              const { lat, lon } = response.data[0];
              setDoctorPosition({
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
              });
            } else {
              console.error("No results found for doctor's address:", searchQuery);
            }
          } catch (error) {
            console.error("Error fetching doctor's coordinates:", error);
          }
        }
      }
    };

    fetchDoctorCoordinates();
  }, [doctors]); // Trigger when doctors data changes

  const customIcon = new Icon({
    iconUrl: "/marker.png",
    iconSize: [40, 40],
  });

  const customDoctorIcon = new Icon({
    iconUrl: "/healthcare.png", // Use a doctor icon image
    iconSize: [40, 40],
  });

  // This component will update the map center based on user position
  const UpdateMapCenter = () => {
    const map = useMap(); // Correct use of useMap hook here
    useEffect(() => {
      if (userPosition.latitude && userPosition.longitude) {
        map.setView([userPosition.latitude, userPosition.longitude], 8);
      }
    }, [userPosition, map]);

    // Display route when both user and doctor positions are available
    useEffect(() => {
      if (userPosition && doctorPosition) {
        const userLatLng = L.latLng(userPosition.latitude, userPosition.longitude);
        const doctorLatLng = L.latLng(doctorPosition.latitude, doctorPosition.longitude);

        // Calculate and set the distance between the user and doctor 
        const distance = userLatLng.distanceTo(doctorLatLng) / 1000; 
        // Convert meters to kilometers 
        setDistance(distance.toFixed(2)); // Set the distance state

        // Create routing control to display the route
        const routingControl = L.Routing.control({
          waypoints: [userLatLng, doctorLatLng],
          routeWhileDragging: true,
          createMarker: function(i, waypoint, n) {
            // Customize markers for waypoints
            if (i === 0) {
              // Return null for user location marker to suppress it
              return null;
            } else if (i === n - 1) {
              // Return null for doctor location marker to suppress it
              return null;
            }
          },
        }).addTo(map);

        return () => {
          map.removeControl(routingControl);
        };
      }
    }, [userPosition, doctorPosition, map]);

    return null; // No rendering needed
  };

  return (
    <>
      <MapContainer
        center={[userPosition.latitude, userPosition.longitude]}
        zoom={13}
        style={{ height: "80vh", width: "50%", borderRadius: "10px" }}
      >
        <UpdateMapCenter />
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Render user's marker only if the position is fetched and updated */}
        {isUserPositionFetched && (
          <Marker position={[userPosition.latitude, userPosition.longitude]} icon={customIcon}>
            <Popup>Your location</Popup>
          </Marker>
        )}
        {/* Render doctor's marker only if the doctor position is available */}
        {doctorPosition && (
          <Marker position={[doctorPosition.latitude, doctorPosition.longitude]} icon={customDoctorIcon}>
            <Popup>Doctor's location</Popup>
          </Marker>
        )}
      </MapContainer>
      {/* Display the distance between the user and doctor */}
      {distance && (
        <div className="text-center mt-4">
          <h2>Distance to Doctor: {distance} km</h2>
        </div>
      )}
    </>
  );
};
