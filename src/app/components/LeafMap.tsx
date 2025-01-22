'use client';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import {LatLngExpression, LatLngTuple} from "leaflet";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

interface MapProps {
    posix: LatLngExpression | LatLngTuple;
    zoom?: number;
}

const defaults = {
    zoom: 19,
};

function LeafMap(Map: Readonly<MapProps>) {
    const {zoom = defaults.zoom, posix} = Map;

    return (
        <MapContainer
            center={posix}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{height: "100%", width: "100%"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                    OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker
                position={posix}
                draggable={false}>
                <Popup>Ferienhaus Panoramablick</Popup>
            </Marker>
        </MapContainer>
    )
}

export default LeafMap;