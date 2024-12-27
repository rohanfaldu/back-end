'use client'
import dynamic from 'next/dynamic';
import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const MapCluster = dynamic(() => import('./MapCluster'), {
	ssr: false,
})

export default function PropertyMap({ topmap, singleMap }) {
	
	const containerStyle = {
		width: '400px',
		height: '400px',
	}
	
	const center = {
		lat: 33.985047,
		lng: -118.469483,
	}
	
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyDdhV2ojxz4IEp98Gvn5sz9rKWf89Ke5gw',
	  })
	
	const [map, setMap] = React.useState(null)

	const onLoad = React.useCallback(function callback(map) {
	// This is just an example of getting and using the map instance!!! don't just blindly copy!
		const bounds = new window.google.maps.LatLngBounds(center)
		map.fitBounds(bounds)
		setMap(map)
	}, [])

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null)
	}, [])

	console.log('Map Here');
	return (
		<>{
			isLoaded ? (
				<GoogleMap
				  mapContainerStyle={containerStyle}
				  center={center}
				  zoom={18}
				  onLoad={onLoad}
				  onUnmount={onUnmount}
				>
				  {/* Child components, such as markers, info windows, etc. */}
				  <></>
				</GoogleMap>
			  ) : (
				<>
				{!singleMap ?
					<MapCluster topmap={topmap} />
					:
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2643.6895046810805!2d-122.52642526124438!3d38.00014098339506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085976736097a2f%3A0xbe014d20e6e22654!2sSan Rafael%2C California%2C Hoa Kỳ!5e0!3m2!1svi!2s!4v1678975266976!5m2!1svi!2s" height={570} style={{ border: 0, width: "100%" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
				}
				</>
			  )
		}
		</>
	)
}
