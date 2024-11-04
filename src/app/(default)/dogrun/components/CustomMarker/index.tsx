import { Dogrun } from '@/types/Dogrun';
import { AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import styles from './CustomMarker.module.scss';
import usePhoto from '../../hooks/usePhoto';
import NoImage from '@public/noimage.png';
import { Marker } from '@googlemaps/markerclusterer';

type Props = {
  dogrun: Dogrun;
  currentDogrunId: string | undefined;
  selectDogrunId: (dogrunId: string | undefined) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
};

const CustomMarker = (props: Props) => {
  const { dogrun, currentDogrunId, selectDogrunId, setMarkerRef } = props;
  const [marker, setMarker] = useState<Marker | undefined>(undefined);

  // dogrunIdを持たないデータもあるため暫定
  const dogrunId = useMemo(() => dogrun.dogrunId || dogrun.placeId, [dogrun]);

  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) => {
      setMarkerRef(marker, dogrunId);
      setMarker(marker);
    },
    [dogrunId, setMarkerRef],
  );

  const photo = dogrun.photos?.[0];
  const imageUrl = usePhoto(photo);

  const selected = useMemo(
    () => dogrunId === currentDogrunId,
    [dogrunId, currentDogrunId],
  );

  const clickMarker = useCallback(
    () => selectDogrunId(dogrunId),
    [dogrunId, selectDogrunId],
  );

  const closeWindow = useCallback(
    () => selectDogrunId(undefined),
    [selectDogrunId],
  );

  const lng = dogrun.location.longitude;
  const lat = dogrun.location.latitude;

  return (
    <>
      <AdvancedMarker ref={ref} position={{ lng, lat }} onClick={clickMarker}>
        <Pin
          background={selected ? '#ff6666' : '#66cc66'}
          borderColor={selected ? '#cc0000' : '#339933'}
          glyphColor={selected ? '#990000' : '#006600'}
        />
      </AdvancedMarker>
      {selected && (
        <InfoWindow onClose={closeWindow} anchor={marker}>
          <div className={styles.image}>
            <Image
              src={imageUrl || NoImage}
              alt={dogrun.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.description}>
            <h3>{dogrun.name}</h3>
            <p>description</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default CustomMarker;
