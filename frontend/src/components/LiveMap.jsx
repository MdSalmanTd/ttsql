import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState, useCallback, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import API from '../api/axios';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const driverIcon = L.divIcon({
  className: '',
  html: '<div style="background:#22c55e;width:14px;height:14px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 8px rgba(34,197,94,0.8)"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const MapView = ({ position, zoom = 15 }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, zoom);
  }, [position, zoom, map]);
  return null;
};

const FitDriversBounds = ({ drivers }) => {
  const map = useMap();
  useEffect(() => {
    if (!drivers.length) return;
    const bounds = L.latLngBounds(
      drivers.map((d) => [Number(d.latitude), Number(d.longitude)])
    );
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
  }, [drivers, map]);
  return null;
};

const LiveMap = ({ isAdmin = false }) => {
  const [position, setPosition] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [locationError, setLocationError] = useState('');
  const lastPostRef = useRef(0);

  const postLocation = useCallback(async (latitude, longitude) => {
    try {
      await API.post('/users/location', { latitude, longitude });
    } catch (err) {
      console.error('Failed to share location:', err.response?.data?.message || err.message);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) return;

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported on this device.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        const now = Date.now();
        if (now - lastPostRef.current >= 10000) {
          lastPostRef.current = now;
          postLocation(latitude, longitude);
        }
      },
      (err) => {
        setLocationError(err.message || 'Unable to access your location.');
      },
      { enableHighAccuracy: true, maximumAge: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isAdmin, postLocation]);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchDrivers = async () => {
      try {
        const res = await API.get('/users/drivers/locations');
        setDrivers(res.data);
      } catch (err) {
        console.error('Failed to load driver locations:', err.response?.data?.message || err.message);
      }
    };

    fetchDrivers();
    const interval = setInterval(fetchDrivers, 5000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  const defaultCenter = [23.8103, 90.4125];
  const mapCenter = isAdmin
    ? drivers.length
      ? [Number(drivers[0].latitude), Number(drivers[0].longitude)]
      : defaultCenter
    : position || defaultCenter;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {locationError && !isAdmin && (
        <div className="absolute top-4 left-4 right-4 z-[1000] rounded-lg bg-white/80 border border-white/40 px-4 py-2 text-sm text-white">
          {locationError}
        </div>
      )}
      {isAdmin && (
        <div className="absolute top-4 right-4 z-[1000] rounded-lg bg-black/80 border border-white/20 px-4 py-2 text-sm">
          <span className="text-white font-medium">Live drivers: </span>
          <span className="text-white">{drivers.length}</span>
          <span className="text-neutral-400 text-xs block mt-1">Updates every 5s · last 30 min</span>
        </div>
      )}
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom
        className="w-full h-screen"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {!isAdmin && (
          <>
            <MapView position={position} />
            {position && (
              <Marker position={position} icon={defaultIcon}>
                <Popup>You are here</Popup>
              </Marker>
            )}
          </>
        )}
        {isAdmin && (
          <>
            <FitDriversBounds drivers={drivers} />
            {drivers.map((driver) => (
              <Marker
                key={driver._id}
                position={[Number(driver.latitude), Number(driver.longitude)]}
                icon={driverIcon}
              >
                <Popup>
                  <strong>{driver.fullname}</strong>
                  <br />
                  <span className="text-xs text-neutral-600">{driver.email}</span>
                  <br />
                  <span className="text-xs">
                    Updated: {new Date(driver.updated_at).toLocaleString()}
                  </span>
                </Popup>
              </Marker>
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default LiveMap;
