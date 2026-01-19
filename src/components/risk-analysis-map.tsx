import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState, useEffect } from 'react'

// Fix for default marker icon in Next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

type LocationDetails = {
    lat: number;
    lng: number;
    address?: string;
    village?: string;
    subdistrict?: string;
    regency?: string;
    province?: string;
}

function LocationMarker({ onLocationSelect }: { onLocationSelect: (details: LocationDetails) => void }) {
    const [position, setPosition] = useState<L.LatLng | null>(null)
    const map = useMapEvents({
        click: async (e) => {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())

            // Reverse geocoding using Nominatim (OpenStreetMap)
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=18&addressdetails=1`)
                const data = await response.json()

                const locationDetails: LocationDetails = {
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                    address: data.display_name,
                    village: data.address.village || data.address.suburb,
                    subdistrict: data.address.subdistrict || data.address.town || data.address.city_district,
                    regency: data.address.city || data.address.county,
                    province: data.address.state
                }

                onLocationSelect(locationDetails)
            } catch (error) {
                console.error("Error fetching location details:", error)
                // Fallback details if geocoding fails
                onLocationSelect({
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                    address: "Koordinat: " + e.latlng.lat.toFixed(6) + ", " + e.latlng.lng.toFixed(6)
                })
            }
        },
    })

    return position === null ? null : (
        <Marker position={position} icon={icon}>
            <Popup>Lokasi Terpilih</Popup>
        </Marker>
    )
}

export default function RiskAnalysisMap({ onLocationSelect }: { onLocationSelect: (details: LocationDetails) => void }) {
    // Default center: Monas, Jakarta
    const center = { lat: -6.1754, lng: 106.8272 }

    return (
        <div className="h-[500px] w-full rounded-xl overflow-hidden border-2 border-slate-200 shadow-inner z-0 relative">
            <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker onLocationSelect={onLocationSelect} />
            </MapContainer>
        </div>
    )
}
