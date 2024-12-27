'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import MarkerImg from '../../public/images/favicon/marker.jpg';
import Preloader from './Preloader';
export default function PropertyMapMarker({ isGeolocation, latitude, longitude, zoom }) {

	const [currentLocation, setCurrentLocation] = useState({ lat: latitude || 0, lng: longitude || 0 });
	const [isGeolocationAvailable, setGeolocationAvailable] = useState(isGeolocation);
	const [map, setMap] = useState(null);

	const containerStyle = {
		width: '100%',
		height: '400px',
	};

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyCwhqQx0uqNX7VYhsgByiF9TzXwy81CFag',
	});

	useEffect(() => {
		if (isGeolocation) {
			// console.log("isGeolocation");

		  if ("geolocation" in navigator) {
			// console.log("Geolocation");

			navigator.geolocation.getCurrentPosition(
			  (position) => {
				setCurrentLocation({
				  lat: position.coords.latitude,
				  lng: position.coords.longitude,
				});
			  },
			  (error) => {
				console.error("Geolocation error:", error);
				setCurrentLocation({ lat: 33.985047, lng: -118.469483 }); // Default location
			  }
			);
		  } else {

			console.error("Geolocation not supported.");
			setCurrentLocation({ lat: 33.985047, lng: -118.469483 });
		  }
		} else if (latitude && longitude) {

			console.error("Geolocation not supported.");

		  setCurrentLocation({ lat: latitude, lng: longitude });
		}
	}, [isGeolocation, latitude, longitude]);
	
	console.log(currentLocation);
	// Custom marker icon
	const customIcon = {
		url: '/images/favicon/marker.jpg', // Replace with the correct path to your image
		scaledSize: { width: 40, height: 40 }, // Adjust size
		origin: { x: 0, y: 0 }, // Image origin
		// Image anchor point
	};
	// console.log(currentLocation);
	
	const zoomlevel = zoom? zoom: 8;

	const center = {
		lat: latitude ? currentLocation.lat || 33.5945144 : latitude ,
		lng: latitude ? currentLocation.lng || -7.6200284 : longitude ,
	  };
	  
	  const onLoad = useCallback(function callback(map) {
		if (zoomlevel) {
			map.setZoom(zoomlevel); // Explicitly set zoom level
		} else {
			const bounds = new window.google.maps.LatLngBounds(center);
			map.fitBounds(bounds);
		}
		setMap(map);
	}, [center,zoomlevel]);
	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoomlevel}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
    	{/* <Marker
            position={center} // Position of the marker
            icon={customIcon} // Custom icon
          /> */}
        </GoogleMap>
      ) : (
        <Preloader /> 
      )}
    </>
  );
}
