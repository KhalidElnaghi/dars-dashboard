/* eslint-disable react/destructuring-assignment */

'use client';

import { FormEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Map,
  Pin,
  APIProvider,
  AdvancedMarker,
  useMap,
  MapControl,
  useMapsLibrary,
  ControlPosition,
  Marker,
} from '@vis.gl/react-google-maps';

import { Box, useTheme } from '@mui/material';

import { Position } from 'src/types/map';
import { Circle } from './Circle';


type Props = {
  areas: any;
};
export type AutocompleteMode = { id: string; label: string };

export function GoogleMap(props: Props) {
  const [markers, setMarkers] = useState<Array<{ lat: number; lng: number; radius: number }>>(
    props?.areas?.map((area: any) => ({
      lat: area?.centerLatitude,
      lng: area?.centerLongitude,
      radius: Number(area?.radius) * 1000,
    }))
  );


  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
      <Box height="100%">
        <Map
          defaultZoom={4}
          defaultCenter={{ lat: 22.54992, lng: 25 }}
          gestureHandling="greedy"
          disableDefaultUI
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
          {markers.map((marker, index) => (
            <Circle
              radius={marker.radius}
              center={{ lat: marker.lat, lng: marker.lng }}
              strokeColor="#0c4cb3"
              strokeOpacity={1}
              strokeWeight={3}
              fillColor="#3b82f6"
              fillOpacity={0.3}
            />
          ))}
        </Map>

        <CustomMapControl
          controlPosition={ControlPosition.TOP}
          selectedAutocompleteMode={{ id: 'classic', label: 'Google Autocomplete Widget' }}
          onPlaceSelect={setSelectedPlace}
        />

        <MapHandler place={selectedPlace} />
      </Box>
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
