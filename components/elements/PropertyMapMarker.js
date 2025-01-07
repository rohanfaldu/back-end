'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import Preloader from './Preloader';

export default function PropertyMapMarker({ isGeolocation, latitude, longitude, zoom, onPlaceSelected, address }) {
  const [currentLocation, setCurrentLocation] = useState({ lat: latitude || 0, lng: longitude || 0 });
  const [zoomlevel, setZoomlevel] = useState(8);
  const [map, setMap] = useState(null);
  const autocompleteRef = useRef(null);

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCwhqQx0uqNX7VYhsgByiF9TzXwy81CFag', // Replace with your API key
    libraries: ['places'], // Required for Autocomplete
  });



  useEffect(() => {
      setZoomlevel(zoom);
    if (isGeolocation) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => {
            setCurrentLocation({ lat: 33.985047, lng: -118.469483 }); // Default location
          }
        );
      } else {
        setCurrentLocation({ lat: 33.985047, lng: -118.469483 });
      }
    } else if (latitude && longitude) {
      setCurrentLocation({ lat: latitude, lng: longitude });
    }
  }, [isGeolocation, latitude, longitude]);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    console.log('Selected place:', place);
    // Ensure the place contains geometry (location)
    if (place.geometry) {
      const { lat, lng } = place.geometry.location;
      setCurrentLocation({ lat: lat(), lng: lng() });
      setZoomlevel(14);
      // Retrieve the address from place details
      const formattedAddress = place.formatted_address || 'No address found';
      const addressComponents = place.address_components;
      const addressName = place.name;

      // Optionally, handle address components for more detailed info
      let fullAddress = formattedAddress;
      if (addressComponents) {
        fullAddress = addressComponents.map((component) => component.long_name).join(', ');
      }

      console.log('Full Address:', `${addressName},${fullAddress}`); // Log the full address

      if (onPlaceSelected) {
        // Pass the selected address and coordinates to the parent component
        onPlaceSelected(fullAddress, { lat: lat(), lng: lng() });
      }

      // Optionally, pan the map to the selected place
      if (map && place.geometry) {
        map.panTo(place.geometry.location);
      }
    } else {
      alert("Place details are not available.");
    }
  };

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <>
      {isLoaded ? (
        <>
          {/* Search Input */}
          <div >
            <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceSelect}
            >
              <fieldset className="fieldset-input">
                <input
                  type="text"
                  label="Search for a place"
                  className="ip-file"
                  value={address}
                  placeholder="Search for a place"
                  
                />
              </fieldset>
            
            </Autocomplete>
          </div>

			{/* Google Map */}
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={currentLocation}
				zoom={zoomlevel}
				onLoad={onLoad}
				onUnmount={onUnmount}
			>
				{/* <Marker position={currentLocation} /> */}
			</GoogleMap>
        </>
      ) : (
        <Preloader />
      )}
    </>
  );
}
