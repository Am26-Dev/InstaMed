import React, { useContext, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet-routing-machine";
import { AppContext } from "../context/AppContext";

export const BtwMap = () => {
  const [userPosition, setUserPosition] = useState({
    latitude: 28.6139,
    longitude: 77.209,
  });
  const [doctorPosition, setDoctorPosition] = useState(null);
  const [isUserPositionFetched, setIsUserPositionFetched] = useState(false);
  const { loadUserProfileData, userData, doctors, getDoctorsData } =
    useContext(AppContext);
  const [distance, setDistance] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(8);

  // Fetching user data and setting position
  useEffect(() => {
    if (!userData) {
      loadUserProfileData();
      return;
    }

    if (userData.address && userData.address.locality) {
      const locality = userData.address.locality;
      const district = userData.address.district || "";
      const state = userData.address.state || "";
      const country = userData.address.country || "";

      const searchQuery =
        `${locality}, ${district}, ${state}, ${country}`.trim();
      console.log("Search query for user:", searchQuery);
      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              searchQuery
            )}&format=json&addressdetails=1&limit=1`
          );

          console.log("API Response for user:", response.data);

          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setUserPosition({
              latitude: parseFloat(lat),
              longitude: parseFloat(lon),
            });
            setIsUserPositionFetched(true);
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

  //========== Fetching doctor data and setting coordinates based on doctor's address=========================================
  useEffect(() => {
    const fetchDoctorCoordinates = async () => {
      if (!doctors || doctors.length === 0) {
        return;
      }

      //==============Loop through each doctor and fetch their coordinates=============================================
      for (const doctor of doctors) {
        if (doctor.address && doctor.address.locality) {
          const locality = doctor.address.locality;
          const district = doctor.address.district || "";
          const state = doctor.address.state || "";
          const country = doctor.address.country || "";

          const searchQuery =
            `${locality}, ${district}, ${state}, ${country}`.trim();
          console.log("Doctor search query:", searchQuery);

          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                searchQuery
              )}&format=json&addressdetails=1&limit=1`
            );

            console.log("API Response for doctor:", response.data);

            if (response.data.length > 0) {
              const { lat, lon } = response.data[0];
              setDoctorPosition({
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
              });
            } else {
              console.error(
                "No results found for doctor's address:",
                searchQuery
              );
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
    iconUrl: "/healthcare.png",
    iconSize: [40, 40],
  });

  const UpdateMapCenter = () => {
    const map = useMap();
    useEffect(() => {
      if (userPosition.latitude && userPosition.longitude) {
        map.setView([userPosition.latitude, userPosition.longitude], zoomLevel);
      }
    }, [userPosition, zoomLevel, map]);

    useEffect(() => {
      if (userPosition && doctorPosition) {
        const userLatLng = L.latLng(
          userPosition.latitude,
          userPosition.longitude
        );
        const doctorLatLng = L.latLng(
          doctorPosition.latitude,
          doctorPosition.longitude
        );

        // Calculating and set the distance between the user and doctor
        const distance = userLatLng.distanceTo(doctorLatLng) / 1000;
        //  meters to kilometers
        setDistance(distance.toFixed(2));

        // Create routing control to display the route
        const routingControl = L.Routing.control({
          waypoints: [userLatLng, doctorLatLng],
          routeWhileDragging: true,
          createMarker: function (i, waypoint, n) {
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

    return null;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setZoomLevel(10);
      } else {
        setZoomLevel(8);
      }
    };

    // Sets zoom level when the component mounts
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mt-5">
        <h1 className="text-gray-600 font-bold text-4xl mb-5">
          Doctor's Location and Distance from You
        </h1>
        <MapContainer
          center={[userPosition.latitude, userPosition.longitude]}
          zoom={zoomLevel}
          style={{ height: "50vh", width: "100%", borderRadius: "10px" }}
        >
          <UpdateMapCenter />
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Render user's marker only if the position is fetched and updated */}
          {isUserPositionFetched && (
            <Marker
              position={[userPosition.latitude, userPosition.longitude]}
              icon={customIcon}
            >
              <Popup>Your location</Popup>
            </Marker>
          )}
          {/* Render doctor's marker only if the doctor position is available */}
          {doctorPosition && (
            <Marker
              position={[doctorPosition.latitude, doctorPosition.longitude]}
              icon={customDoctorIcon}
            >
              <Popup>Doctor's location</Popup>
            </Marker>
          )}
        </MapContainer>
        {/* Display the distance between the user and doctor */}
        {distance && (
          <div className="text-center mt-4 p-5 bg-blue-100 border-2 border-blue-300 rounded-xl shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Distance to Doctor
            </h2>
            <p className="text-3xl font-bold text-blue-800">{distance} km</p>
            <p className="text-sm text-gray-600 mt-2">
              This is the distance between you and your doctor
            </p>
          </div>
        )}
      </div>
    </>
  );
};
