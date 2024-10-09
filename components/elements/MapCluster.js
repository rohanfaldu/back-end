import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import "react-leaflet-markercluster/dist/styles.min.css";

const customMsrker = L.icon({
    iconUrl: "https://i.ibb.co/sJrMTdz/favicon-32x32.png",
    iconSize: [30, 30]
});

export default function MapCluster({topmap}) {
    return (
        <>
            <MapContainer
                style={{ height: `${topmap ? "460px":"100vh"}`, zIndex:-1 }}
                center={[51.0, 19.0]}
                zoom={4}
                maxZoom={18}
                scrollWheelZoom={false}
            >
                <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />

                {/* <MarkerClusterGroup> */}
                <Marker position={[49.8397, 24.0297]} icon={customMsrker}>
                    <Popup>
                        <div className="map-box">
							<div className="map-listing-item">
								<div className="inner-box">
									{/* <div className="infoBox-close"><i className="icon icon-close2" /></div> */}
									<div className="image-box"><img src="/images/home/house-7.jpg" alt /></div>
									<div className="content">
										<p className="location"><span className="icon icon-mapPin" />100 km from my location</p>
										<div className="title"><a href="property-details-v1.html">Villa del Mar Retreat, Malibu...</a></div>
										<ul className="list-info">
											<li><span className="icon icon-bed" />3</li>
											<li><span className="icon icon-bathtub" />2</li>
											<li><span className="icon icon-ruler" />600 SqFT</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
                    </Popup>
                </Marker>
                <Marker position={[52.2297, 21.0122]} icon={customMsrker}>
                    <Popup>
                        <div className="map-box">
							<div className="map-listing-item">
								<div className="inner-box">
									{/* <div className="infoBox-close"><i className="icon icon-close2" /></div> */}
									<div className="image-box"><img src="/images/home/house-7.jpg" alt /></div>
									<div className="content">
										<p className="location"><span className="icon icon-mapPin" />100 km from my location</p>
										<div className="title"><a href="property-details-v1.html">Villa del Mar Retreat, Malibu...</a></div>
										<ul className="list-info">
											<li><span className="icon icon-bed" />3</li>
											<li><span className="icon icon-bathtub" />2</li>
											<li><span className="icon icon-ruler" />600 SqFT</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
                    </Popup>
                </Marker>
                <Marker position={[51.5074, -0.0901]} icon={customMsrker}>
                    <Popup>
                        <div className="map-box">
							<div className="map-listing-item">
								<div className="inner-box">
									{/* <div className="infoBox-close"><i className="icon icon-close2" /></div> */}
									<div className="image-box"><img src="/images/home/house-7.jpg" alt /></div>
									<div className="content">
										<p className="location"><span className="icon icon-mapPin" />100 km from my location</p>
										<div className="title"><a href="property-details-v1.html">Villa del Mar Retreat, Malibu...</a></div>
										<ul className="list-info">
											<li><span className="icon icon-bed" />3</li>
											<li><span className="icon icon-bathtub" />2</li>
											<li><span className="icon icon-ruler" />600 SqFT</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
                    </Popup>
                </Marker>
                {/* </MarkerClusterGroup> */}
            </MapContainer>
        </>
    )
}