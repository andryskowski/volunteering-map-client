import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updatePlace } from '../../../actions/FetchData';
import '../../../scss/base/_common.scss';

function EditPlaceForm(props) {
  const [placeName, setPlaceName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [webPage, setWebPage] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [logo, setLogo] = useState('');
  const [district, setDistrict] = useState('');
  const [position, setPosition] = useState({
    lat: '',
    lng: '',
  });

  function handleChange(event) {
    const { name } = event.target;
    if (name === 'city') setCity(event.target.value);
    else if (name === 'street') setStreet(event.target.value);
    else if (name === 'houseNo') setHouseNo(event.target.value);
    else if (name === 'postalCode') setPostalCode(event.target.value);
    else if (name === 'placeName') setPlaceName(event.target.value);
    else if (name === 'webPage') setWebPage(event.target.value);
    else if (name === 'email') setEmail(event.target.value);
    else if (name === 'phone') setPhone(event.target.value);
    else if (name === 'logo') setLogo(event.target.value);
    else if (name === 'category') setCategory(event.target.value);
    else if (name === 'district') setDistrict(event.target.value);
    else if (name === 'shortDescription') setShortDescription(event.target.value);
    else if (name === 'positionLng') {
      setPosition({
        lng: event.target.value,
        lat: position.lat,
      });
    } else if (name === 'positionLat') {
      setPosition({
        lat: event.target.value,
        lng: position.lng,
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  function handleSubmit(event) {
    event.preventDefault();
    alert('The place has been edited');
    updatePlace(props.placeToEdit[0]._id, placeName, logo, shortDescription, description,
      category, phone, email, webPage, city, street, postalCode, houseNo, district, position);
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'color',
  ];

  const modules = {
    toolbar: [
      'bold', 'italic', 'underline', 'strike', 'blockquote', 'link', 'image', 'video', 'background', 'header', [{
        color: ['#FF0000', '#001F3F', '#0074D9', '#7FDBFF',
          '#39CCCC', '#3D9970', '#2ECC40', '#01FF70',
          '#FFDC00', '#FF851B', '#FF4136', '#85144B',
          '#F012BE', '#B10DC9', '#111111', '#AAAAAA',
        ],
      }],
    ],
  };

  const getInfoAboutPlace = () => {
    setPlaceName(props.placeToEdit[0].name);
    setWebPage(props.placeToEdit[0].webPage);
    setEmail(props.placeToEdit[0].email);
    setPhone(props.placeToEdit[0].phone);
    setCity(props.placeToEdit[0].city);
    setStreet(props.placeToEdit[0].street);
    setHouseNo(props.placeToEdit[0].houseNo);
    setPostalCode(props.placeToEdit[0].postalCode);
    setDistrict(props.placeToEdit[0].district);
    setPosition({
      lat: props.placeToEdit[0] ? props.placeToEdit[0].position.lat : props.placeToEdit[0],
      lng: props.placeToEdit[0] ? props.placeToEdit[0].position.lng : props.placeToEdit[0],
    });
    setLogo(props.placeToEdit[0].img);
    setCategory(props.placeToEdit[0].category);
    setShortDescription(props.placeToEdit[0].shortDescription);
    setDescription(props.placeToEdit[0].description);
  };

  const clearInfoAboutPlace = () => {
    setPlaceName('');
    setWebPage('');
    setEmail('');
    setPhone('');
    setCity('');
    setStreet('');
    setHouseNo('');
    setPostalCode('');
    setDistrict('');
    setPosition({
      lat: '',
      lng: '',
    });
    setLogo('');
    setCategory('');
    setShortDescription('');
    setDescription('');
  };

  return (
    <div className="edit-place-form">
      <input
        id="getInfoAboutPlace"
        type="submit"
        value="Pobierz dane o miejscu"
        className="getInfoAboutPlace"
        onClick={getInfoAboutPlace}
      />
      <input
        id="getInfoAboutPlace"
        type="submit"
        value="Wyczyść formularz"
        className="getInfoAboutPlace"
        onClick={clearInfoAboutPlace}
      />
      <h1 className="page-header">Edytuj miejsce</h1>
      <form onSubmit={handleSubmit} className="form form-edit-place">
        <label htmlFor="place-name">
          Nazwa fundacji (lub miejsca pomocy):
          <input id="place-name" defaultValue={placeName} type="place-name" name="placeName" onChange={handleChange} />
        </label>
        <label htmlFor="web-page">
          Strona internetowa:
          <input id="web-page" defaultValue={webPage} type="web-page" name="webPage" onChange={handleChange} />
        </label>
        <label htmlFor="email">
          E-mail:
          <input id="email" defaultValue={email} type="email" name="email" onChange={handleChange} />
        </label>
        <label htmlFor="phone">
          Telefon:
          <input id="phone" defaultValue={phone} type="phone" name="phone" onChange={handleChange} />
        </label>
        <label htmlFor="city">
          Miasto:
          <input id="city" defaultValue={city} type="city" name="city" onChange={handleChange} />
        </label>
        <label htmlFor="street">
          Ulica:
          <input id="street" defaultValue={street} type="street" name="street" onChange={handleChange} />
        </label>
        <label htmlFor="house-no">
          Numer domu:
          <input id="house-no" defaultValue={houseNo} type="house-no" name="houseNo" onChange={handleChange} />
        </label>
        <label htmlFor="postal-code">
          Kod pocztowy:
          <input id="postal-code" defaultValue={postalCode} type="postal-code" name="postalCode" onChange={handleChange} />
        </label>
        <label htmlFor="district">
          Dzielnica:
          <select id="district" selected={district} name="district" onChange={handleChange}>
            <option value="Bałuty">Bałuty</option>
            <option value="Śródmieście">Śródmieście</option>
            <option value="Widzew">Widzew</option>
            <option value="Polesie">Polesie</option>
            <option value="Górna">Górna</option>
            <option value="inna">inna</option>
          </select>
        </label>
        <label htmlFor="position-lat">
          Szerokość geograficznej (Latitude):
          <input id="position-lat" defaultValue={position.lat} type="logo" name="positionLat" onChange={handleChange} />
        </label>
        <label htmlFor="position-lng">
          Długość geograficzna (Longitude):
          <input id="position-lng" defaultValue={position.lng} type="logo" name="positionLng" onChange={handleChange} />
        </label>
        <label htmlFor="logo">
          Link do zdjecia logo fundacji/miejsca pomocy:
          <input id="logo" defaultValue={logo} type="logo" name="logo" onChange={handleChange} />
        </label>
        <label htmlFor="category">
          Kategoria:
          <select id="category" selected={category} name="category" onChange={handleChange}>
            <option value="dzieci">dzieci</option>
            <option value="zwierzeta">zwierzeta</option>
            <option value="inwalidzi">inwalidzi</option>
            <option value="uzaleznienia">uzaleznienia</option>
            <option value="emeryci">emeryci</option>
            <option value="inne">inne</option>
          </select>
        </label>
        <label htmlFor="shortDescription">
          Krótki opis fundacji/miejsca pomocy:
          <input id="shortDescription" defaultValue={shortDescription} type="text" name="shortDescription" onChange={handleChange} />
        </label>
        <label htmlFor="description">
          Opis:
          <ReactQuill className="description-box" id="description" theme="snow" value={description} onChange={setDescription} modules={modules} formats={formats} />
        </label>
        <input
          id="send"
          type="submit"
          value="Wyślij"
          className="submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default EditPlaceForm;
