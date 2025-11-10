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

const defaultPosition = { lat: 26, lng: 29 };

type Props = {
  staticPosition?: boolean;
  defaultPosition?: Position | undefined;
  setCurrentPosition?: (newPosition: Position) => void;
  additionalMarkers?: Position[];
  defaultZoomLevel?: number;
};
export type AutocompleteMode = { id: string; label: string };

export function GoogleMapBranch(props: Props) {
  const [position, setPosition] = useState({
    lat: props.defaultPosition?.lat || defaultPosition.lat,
    lng: props.defaultPosition?.lng || defaultPosition.lng,
  });
  const theme = useTheme();
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
      <Box height="100%">
        <Map
          defaultCenter={props.defaultPosition || defaultPosition}
          defaultZoom={props.defaultZoomLevel || 5}
          gestureHandling="greedy"
          disableDefaultUI
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          onClick={(e) => {
            setPosition((prev) => {
              const newPosition = e.detail.latLng ? { ...e.detail.latLng } : prev;
              if (props.setCurrentPosition && newPosition) props.setCurrentPosition(newPosition);
              return props.staticPosition ? prev : newPosition;
            });
          }}
        >
          {position ? (
            <AdvancedMarker position={position}>
              <Pin />
            </AdvancedMarker>
          ) : null}

          {props.additionalMarkers?.map((marker, i) => (
            <AdvancedMarker position={marker} key={i}>
              <Pin
                background={theme.palette.primary.main}
                borderColor={theme.palette.primary.dark}
                glyphColor={theme.palette.primary.dark}
              />
            </AdvancedMarker>
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
