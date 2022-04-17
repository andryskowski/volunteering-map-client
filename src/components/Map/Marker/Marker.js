import React, { useContext } from 'react';
import L from 'leaflet';
import { Popup, Marker } from 'react-leaflet';
import { Link } from 'react-router-dom';
import purplePin from '../../../assets/gps1.svg';
import redPin from '../../../assets/gps2.svg';
import orangePin from '../../../assets/gps3.svg';
import yellowPin from '../../../assets/gps4.svg';
import greenPin from '../../../assets/gps5.svg';
import bluePin from '../../../assets/gps6.svg';
import { PlacesContext } from '../../../contexts/PlacesContext';
import { AccessibleInterfaceContext } from '../../../contexts/AccessibleInterfaceContext';

const setPinColor = (place) => {
  if (place.category === 'zwierzeta') return purplePin;
  if (place.category === 'dzieci') return greenPin;
  if (place.category === 'inwalidzi') return orangePin;
  if (place.category === 'uzaleznienia') return yellowPin;
  if (place.category === 'emeryci') return bluePin;
  if (place.category === 'inne') return redPin;
  return redPin;
};

const MyIcon = (place) => {
  const { isAccessibleInterface } = useContext(AccessibleInterfaceContext);
  const icon = L.icon({
    iconUrl: setPinColor(place),
    iconSize: isAccessibleInterface ? [50, 70] : [40, 60],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });
  return icon;
};

function MarkerComponent(props) {
  const PLACES = useContext(PlacesContext);
  
  return (
    <>
      {PLACES.filter((place) => place.statusPlace === 'added').map((place) => (
        <Marker position={place.position} icon={MyIcon(place)}>
          <Popup>
            <img src={place.img} width="190px" height="190px" alt="Logo" />
            <br />
            <Link to={place._id}><b>{place.name}</b></Link>
            <br />
            <p>
              {place.city}
              ,
              {' '}
              {place.street}
              ,
              {' '}
              {place.houseNo}
              ,
              {' '}
              {place.postalCode}
            </p>
          </Popup>
        </Marker>
      ))}
      ;
    </>
  );
}

export default MarkerComponent;
