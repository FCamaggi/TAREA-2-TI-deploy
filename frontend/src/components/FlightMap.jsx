import React, { useMemo, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import airportIcon from '../assets/icons/airport.png';
import crashIcon from '../assets/icons/crash.png';
import landingIcon from '../assets/icons/landing.png';
import latePlaneIcon from '../assets/icons/late_plane.png';
import planeIcon from '../assets/icons/plane.png';
import takeOffIcon from '../assets/icons/take_off.png';

const createIcon = (iconUrl, size = [32, 32]) =>
  new L.Icon({
    iconUrl,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1] / 2],
    popupAnchor: [0, -size[1] / 2],
  });

const icons = {
  airport: createIcon(airportIcon),
  crash: createIcon(crashIcon),
  landing: createIcon(landingIcon),
  latePlane: createIcon(latePlaneIcon),
  plane: createIcon(planeIcon),
  takeOff: createIcon(takeOffIcon),
};

// Componente para actualizar la vista del mapa
const MapUpdater = ({ flights }) => {
  const map = useMap();

  useEffect(() => {
    if (Object.keys(flights).length > 0) {
      const bounds = L.latLngBounds(
        Object.values(flights)
          .filter((flight) => flight.position)
          .map((flight) => [flight.position.lat, flight.position.long])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [flights, map]);

  return null;
};

const FlightMap = React.memo(({ flights }) => {
  const [recentEvents, setRecentEvents] = useState({});

  useEffect(() => {
    Object.values(flights).forEach((flight) => {
      if (['take-off', 'landing', 'crashed'].includes(flight.status)) {
        setRecentEvents((prev) => ({ ...prev, [flight.id]: flight.status }));
        setTimeout(() => {
          setRecentEvents((prev) => {
            const newEvents = { ...prev };
            delete newEvents[flight.id];
            return newEvents;
          });
        }, 60000); // Mostrar por 1 minuto
      }
    });
  }, [flights]);

  const eventMarker = useCallback(
    ({ event, position, flightId }) => (
      <CircleMarker
        center={position}
        pathOptions={{ color: event === 'crashed' ? 'red' : 'yellow' }}
        radius={20}
      >
        <Popup>{`${event.toUpperCase()} - Vuelo ${flightId}`}</Popup>
      </CircleMarker>
    ),
    []
  );

  const mapElements = useMemo(() => {
    return Object.values(flights).map((flight) => {
      if (
        !flight ||
        !flight.departure ||
        !flight.departure.location ||
        !flight.destination ||
        !flight.destination.location
      ) {
        return null;
      }

      return (
        <React.Fragment key={flight.id}>
          {recentEvents[flight.id] &&
            eventMarker({
              event: recentEvents[flight.id],
              position: [
                flight.position?.lat || flight.departure.location.lat,
                flight.position?.long || flight.departure.location.long,
              ],
              flightId: flight.id,
            })}

          <Polyline
            positions={[
              [flight.departure.location.lat, flight.departure.location.long],
              [
                flight.destination.location.lat,
                flight.destination.location.long,
              ],
            ]}
            color="blue"
            weight={2}
            opacity={0.5}
          />

          <Marker
            position={[
              flight.departure.location.lat,
              flight.departure.location.long,
            ]}
            icon={icons.airport}
          >
            <Popup>{flight.departure.name}</Popup>
          </Marker>

          <Marker
            position={[
              flight.destination.location.lat,
              flight.destination.location.long,
            ]}
            icon={icons.airport}
          >
            <Popup>{flight.destination.name}</Popup>
          </Marker>

          {flight.position && (
            <>
              <Marker
                position={[flight.position.lat, flight.position.long]}
                icon={
                  flight.status === 'delayed' ? icons.latePlane : icons.plane
                }
              >
                <Popup>{`Vuelo ${flight.id}`}</Popup>
              </Marker>

              <Polyline
                positions={[
                  [flight.position.lat, flight.position.long],
                  [
                    flight.destination.location.lat,
                    flight.destination.location.long,
                  ],
                ]}
                color="green"
                weight={2}
                opacity={0.7}
              />
            </>
          )}

          {flight.status === 'take-off' && (
            <Marker
              position={[
                flight.departure.location.lat,
                flight.departure.location.long,
              ]}
              icon={icons.takeOff}
            >
              <Popup>{`Despegue del vuelo ${flight.id}`}</Popup>
            </Marker>
          )}

          {flight.status === 'landing' && (
            <Marker
              position={[
                flight.destination.location.lat,
                flight.destination.location.long,
              ]}
              icon={icons.landing}
            >
              <Popup>{`Aterrizaje del vuelo ${flight.id}`}</Popup>
            </Marker>
          )}

          {flight.status === 'crashed' && flight.position && (
            <Marker
              position={[flight.position.lat, flight.position.long]}
              icon={icons.crash}
            >
              <Popup>{`Accidente del vuelo ${flight.id}`}</Popup>
            </Marker>
          )}
        </React.Fragment>
      );
    });
  }, [flights, recentEvents, eventMarker]);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapUpdater flights={flights} />
      {mapElements}
    </MapContainer>
  );
});

FlightMap.propTypes = {
  flights: PropTypes.object.isRequired,
};
MapUpdater.propTypes = {
  flights: PropTypes.object.isRequired,
};

FlightMap.displayName = 'FlightMap';

export default FlightMap;
