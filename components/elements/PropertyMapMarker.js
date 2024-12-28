'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import Preloader from './Preloader';

export default function PropertyMapMarker({ isGeolocation, latitude, longitude, zoom, onPlaceSelected }) {
  const [currentLocation, setCurrentLocation] = useState({ lat: latitude || 0, lng: longitude || 0 });
  const [map, setMap] = useState(null);
  const autocompleteRef = useRef(null);

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDdhV2ojxz4IEp98Gvn5sz9rKWf89Ke5gw', // Replace with your API key
    libraries: ['places'], // Required for Autocomplete
  });

  const zoomLevel = zoom || 8;

  useEffect(() => {
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
	console.log('place');
	console.log(place);
    if (place.geometry) {
      const { lat, lng } = place.geometry.location;
      setCurrentLocation({ lat: lat(), lng: lng() });
	 
	  if (onPlaceSelected) {
		const newAddress = place.formatted_address;
        onPlaceSelected(newAddress, { lat: lat(), lng: lng() }); // Notify parent component
      }
      map.panTo(place.geometry.location);
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
							placeholder="Search for a place"
							
						/>
					 </fieldset>
				
				</Autocomplete>
			</div>

			{/* Google Map */}
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={currentLocation}
				zoom={zoomLevel}
				onLoad={onLoad}
				onUnmount={onUnmount}
			>
				<Marker position={currentLocation} />
			</GoogleMap>
        </>
      ) : (
        <Preloader />
      )}
    </>
  );
}
