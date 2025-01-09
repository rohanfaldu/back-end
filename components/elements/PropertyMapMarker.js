'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import Preloader from './Preloader';

export default function PropertyMapMarker({
  isGeolocation,
  latitude,
  longitude,
  zoom,
  onPlaceSelected,
  address: initialAddress,
}) {
  const [currentLocation, setCurrentLocation] = useState({ lat: latitude || 0, lng: longitude || 0 });
  const [zoomlevel, setZoomlevel] = useState(8);
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState(initialAddress || ''); // Editable address state
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
      console.log(latitude,longitude,"jjjjjjjjjjjjj")
      setCurrentLocation({ lat: latitude, lng: longitude });
    }
  }, [isGeolocation, latitude, longitude]);

  // Synchronize address state with the initialAddress prop
  useEffect(() => {
    setAddress(initialAddress || '');
  }, [initialAddress]);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    console.log('Selected place:', place);
    if (place.geometry) {
      const { lat, lng } = place.geometry.location;
      setCurrentLocation({ lat: lat(), lng: lng() });
      setZoomlevel(14);

      const formattedAddress = place.formatted_address || 'No address found';
      setAddress(formattedAddress); // Update the editable address field

      if (onPlaceSelected) {
        onPlaceSelected(formattedAddress, { lat: lat(), lng: lng() });
      }

      if (map && place.geometry) {
        map.panTo(place.geometry.location);
      }
    } else {
      alert('Place details are not available.');
    }
  };


  const geocodeLatLng = (lat, lng) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const formattedAddress = results[0].formatted_address;
        setAddress(formattedAddress); // Update the editable address

        if (onPlaceSelected) {
          onPlaceSelected(formattedAddress, { lat, lng });
        }
      } else {
        console.error('Geocoder failed due to:', status);
      }
    });
  };

  const handleMarkerDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();

    setCurrentLocation({ lat: newLat, lng: newLng });
    geocodeLatLng(newLat, newLng); // Update the address based on the new location
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value); // Update the address state
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
          <div>
            <Autocomplete
              onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
              onPlaceChanged={handlePlaceSelect}
            >
              <fieldset className="fieldset-input">
                <input
                  type="text"
                  className="ip-file"
                  value={address}
                  placeholder="Search for a place"
                  onChange={handleAddressChange} // Add onChange handler
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
            <Marker
              position={currentLocation}
              draggable={true} // Enable marker dragging
              onDragEnd={handleMarkerDragEnd} // Handle marker drag event
            />
          </GoogleMap>
        </>
      ) : (
        <Preloader />
      )}
    </>
  );
}
