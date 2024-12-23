'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import MarkerImg from '../../public/images/favicon/marker.jpg';
import Preloader from './Preloader';
export default function PropertyMapMarker({ isGeolocation, latitude, longitude, zoom }) {
	const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
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
		if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
			setCurrentLocation({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
			},
			(error) => {
			console.error('Geolocation error:', error);
			setGeolocationAvailable(false);
			}
		);
		} else {
		console.error('Geolocation is not supported by this browser.');
		setGeolocationAvailable(false);
		}
	}, []);
	

	const onLoad = useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	// Custom marker icon
	const customIcon = {
		url: MarkerImg, // Replace with the correct path to your image
		scaledSize: { width: 40, height: 40 }, // Adjust size
		origin: { x: 0, y: 0 }, // Image origin
		anchor: { x: 20, y: 40 },  // Image anchor point
	};
	console.log(currentLocation);
	isGeolocationAvailable? latitude= currentLocation.lat: latitude= 33.985047;
	isGeolocationAvailable? longitude= currentLocation.lng: longitude= -118.469483;
	isGeolocationAvailable? zoom= 15: zoom= 15;
	
	const center = {
		lat: currentLocation.lat,
		lng: currentLocation.lng,
	};

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
    	<Marker
            position={center} // Position of the marker
            icon={customIcon} // Custom icon
          />
        </GoogleMap>
      ) : (
        <Preloader /> 
      )}
    </>
  );
}
