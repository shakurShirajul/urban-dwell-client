import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const position = [40.748817, -73.985428];
const Map = () => {
    return (
        <div>
            <MapContainer center={position} zoom={13} style={{ height: "50vh" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        Empire State Building<br /> 350 5th Avenue, New York, NY 10118.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
