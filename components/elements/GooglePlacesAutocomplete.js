import React, { useState, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"]; // Specify the required libraries

const GooglePlacesAutocomplete = () => {
    const [address, setAddress] = useState("");
    const autocompleteRef = useRef(null);

    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            setAddress(place.formatted_address || "");
            console.log("Selected Place:", place); // Full place object
        }
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCwhqQx0uqNX7VYhsgByiF9TzXwy81CFag" // Replace with your actual Google Maps API key
            libraries={libraries}
        >
            <Autocomplete
                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                onPlaceChanged={handlePlaceChanged}
            >
                <input
                    type="text"
                    placeholder="Enter a location"
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        marginBottom: "10px",
                    }}
                />
            </Autocomplete>
            {address && (
                <div>
                    <strong>Selected Address:</strong> {address}
                </div>
            )}
        </LoadScript>
    );
};

export default GooglePlacesAutocomplete;
