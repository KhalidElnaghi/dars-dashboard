'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Map,
  Pin,
  APIProvider,
  AdvancedMarker,
  Marker,
  ControlPosition,
  MapControl,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';

import { Box, useTheme } from '@mui/material';
import { Position } from 'src/types/map';
import { Circle } from './Circle';
import { AutocompleteMode } from '../map';

const defaultPosition = { lat: 26, lng: 29, radius: 5000 };

type Props = {
  staticPosition?: boolean;
  defaultPosition?: any;
  setCurrentPosition?: any;
  additionalMarkers?: Position[];
  defaultZoomLevel?: number;
};

export function GoogleMapCircle({
  staticPosition = false,
  defaultPosition: initialPosition = defaultPosition,
  setCurrentPosition,
  additionalMarkers = [],
  defaultZoomLevel = 5,
}: Props) {
  const [center, setCenter] = useState(initialPosition);
  const [radius, setRadius] = useState(initialPosition.radius);
 

  const changeCenter = (newCenter: google.maps.LatLng | null) => {
    if (!newCenter) return;
    setCenter({ lng: newCenter.lng(), lat: newCenter.lat() });
  };
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    setCurrentPosition({ lat: center.lat, lng: center.lng, radius });
  }, [center, radius, setCurrentPosition]);
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
      <Map
        defaultCenter={initialPosition}
        defaultZoom={6}
        gestureHandling="greedy"
        disableDefaultUI
        onClick={(e) => {
          if (e.detail.latLng) {
            const newCenter = { lat: e.detail.latLng.lat, lng: e.detail.latLng.lng };
            setCenter(newCenter);
          }
        }}
      >
        <Marker
          position={center}
          draggable
          onDrag={(e) => setCenter({ lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0 })}
          onClick={(e) => setCenter({ lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0 })}
        />

        <Circle
          radius={radius}
          center={center}
          onRadiusChanged={setRadius}
          onCenterChanged={changeCenter}
          strokeColor="#0c4cb3"
          strokeOpacity={1}
          strokeWeight={3}
          fillColor="#3b82f6"
          fillOpacity={0.3}
          editable
          draggable
        />
      </Map>
      <CustomMapControl
        controlPosition={ControlPosition.TOP}
        selectedAutocompleteMode={{ id: 'classic', label: 'Google Autocomplete Widget' }}
        onPlaceSelect={setSelectedPlace}
      />

      <MapHandler place={selectedPlace} />
    </APIProvider>
  );
}
interface Propsss {
  place: google.maps.places.PlaceResult | null;
}

const MapHandler = ({ place }: Propsss) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
  }, [map, place]);

  return null;
};

type CustomAutocompleteControlProps = {
  controlPosition: any;
  selectedAutocompleteMode: AutocompleteMode;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export const CustomMapControl = ({
  controlPosition,
  selectedAutocompleteMode,
  onPlaceSelect,
}: CustomAutocompleteControlProps) => (
  <MapControl position={controlPosition}>
    <div className="autocomplete-control">
      <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} />
    </div>
  </MapControl>
);

// This is an example of the classic "Place Autocomplete" widget.
// https://developers.google.com/maps/documentation/javascript/place-autocomplete
export const PlaceAutocompleteClassic = ({ onPlaceSelect }: any) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input
        ref={inputRef}
        style={{
          width: '150%',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          alignSelf: 'center',
          margin: '0 60px 0 -40px',
        }}
      />
    </div>
  );
};
