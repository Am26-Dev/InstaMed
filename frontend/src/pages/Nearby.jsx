import React, { useContext, useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import axios from "axios";
import { AppContext } from "../context/AppContext";

export const Nearby = () => {
  const [userPosition, setUserPosition] = useState({
    latitude: 28.6139,
    longitude: 77.209,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null); // State for the single marker position
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const { loadUserProfileData, userData } = useContext(AppContext)

  // const markers = [
  //   {
  //     geocode: [28.61957, 77.088104],
  //     popUp: "Hello, I am popup 1",
  //   },
  //   {
  //     geocode: [28.59214, 77.046051],
  //     popUp: "Hello, I am popup 2",
  //   },
  //   {
  //     geocode: [28.636944, 77.052849],
  //     popUp: "Hello, I am popup 3",
  //   },
  //   {
  //     geocode: [28.609674, 77.089539],
  //     popUp: "Hello, I am popup 4",
  //   },
  // ];

  useEffect(()=>{
    if(!userData){
      loadUserProfileData()
    }
  },[userData, loadUserProfileData])

  if (!userData) { return <p>Loading user data...</p>; }

  console.log(userData.address)
  const customIcon = new Icon({
    iconUrl: "/marker.png",
    iconSize: [40, 40],
  });

  const customHealtCareIcon = new Icon({
    iconUrl: "/healthcare.png",
    iconSize: [40, 40],
  });

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      // Fetch suggestions only if the query is longer than 2 characters
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const latitude = parseFloat(suggestion.lat); // Get latitude from suggestion
    const longitude = parseFloat(suggestion.lon); // Get longitude from suggestion

    setUserPosition({ latitude, longitude });
    setMarkerPosition([latitude, longitude]); // Set the marker at the searched location
    setSearchQuery(suggestion.display_name);
    setSuggestions([]);

    // Fetch nearby places
    fetchNearbyPlaces(latitude, longitude);
  };

  const fetchNearbyPlaces = async (latitude, longitude) => {
    const types = ["hospital"]; // Place types to search
    const places = await Promise.all(
      types.map((type) =>
        axios.get(
          `https://overpass-api.de/api/interpreter?data=[out:json];node(around:2000,${latitude},${longitude})[amenity=${type}];out;`
        )
      )
    );

    const allPlaces = places.flatMap((response) =>
      response.data.elements.map((place) => ({
        name: place.tags.name,
        lat: place.lat,
        lon: place.lon,
        type: place.tags.amenity,
      }))
    );

    setNearbyPlaces(allPlaces);
  };

  const UpdateMapCenter = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([userPosition.latitude, userPosition.longitude], 13);
    }, [userPosition, map]);
    return null;
  };

  return (
    <>
      <div style={{ position: "relative", marginBottom: "10px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a place"
          style={{
            padding: "8px",
            fontSize: "16px",
            width: "300px",
          }}
        />
        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: "8px",
              border: "1px solid #ccc",
              width: "300px",
              maxHeight: "150px",
              overflowY: "auto",
              backgroundColor: "#fff",
              position: "absolute",
              zIndex: 1000,
              top: "40px", // Position below the input
            }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <MapContainer
        center={[userPosition.latitude, userPosition.longitude]}
        zoom={13}
        style={{ height: "50vh", width: "100%", borderRadius: "10px" }}
      >
        <UpdateMapCenter />
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Display only a single marker at the searched location */}
        {markerPosition && (
          <Marker position={markerPosition} icon={customIcon}>
            <Popup>{searchQuery}</Popup>
          </Marker>
        )}
        {/* Markers for nearby places */}
        {nearbyPlaces.map((place, index) => (
          <Marker
            key={index}
            position={[place.lat, place.lon]}
            icon={customHealtCareIcon}
          >
            <Popup>
              {place.name} <br /> Type: {place.type}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

// export default Nearby;
