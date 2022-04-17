import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import '../../scss/base/_common.scss';
import '../../scss/base/_place-form.scss';
import ViewPlaceForm from './ViewPlaceForm/ViewPlaceForm';
import { validationPlaceForm } from './ValidationPlaceForm';

function PlaceForm() {
  const [placeName, setPlaceame] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [webPage, setWebPage] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('inna');
  const [logo, setLogo] = useState('');
  const [district, setDistrict] = useState('inna');
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [smallMapOfPlace, setSmallMapOfPlace] = useState('Nie znaleziono lub wprowadzono nieprawidłowy adres');
  const [statusPlace, setStatusPlace] = useState('draft');
  const infoAboutCurretPlace = {
    placeName, phone, email, webPage, city, street, postalCode, houseNo, description, shortDescription, category, logo, district, latLng, smallMapOfPlace, statusPlace,
  };
  const [showPopUp, setShowPopUp] = useState(false);
  const { t } = useTranslation();

  async function getPlaceCoordinates() {
    const URL = `https://www.mapquestapi.com/geocoding/v1/address?key=dYvAAN5PGJqo3AiKXCtuUoJpy7LUhwNs&inFormat=kvp&outFormat=json&location=${city}+${street}+${houseNo}+${postalCode}&thumbMaps=true&maxResults=1`;
    const apiRES = await fetch(URL).then((res) => res.json());
    setSmallMapOfPlace(apiRES.results[0].locations[0].mapUrl);
    setLatLng(apiRES.results[0].locations[0].latLng);
  }

  function handleChange(event) {
    const { name } = event.target;
    if (name === 'city') setCity(event.target.value);
    else if (name === 'street') setStreet(event.target.value);
    else if (name === 'houseNo') setHouseNo(event.target.value);
    else if (name === 'postalCode') setPostalCode(event.target.value);
    else if (name === 'placeName') setPlaceame(event.target.value);
    else if (name === 'webPage') setWebPage(event.target.value);
    else if (name === 'email') setEmail(event.target.value);
    else if (name === 'phone') setPhone(event.target.value);
    else if (name === 'logo') setLogo(event.target.value);
    else if (name === 'category') setCategory(event.target.value);
    else if (name === 'district') setDistrict(event.target.value);
    else if (name === 'shortDescription') setShortDescription(event.target.value);
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

  // eslint-disable-next-line no-unused-vars
  function handleSubmit(event) {
    event.preventDefault();
    const isValidated = validationPlaceForm(placeName, webPage, email, phone, city, street, 
      postalCode, houseNo, district, logo, category, shortDescription);
    if (isValidated === true) {
      getPlaceCoordinates();
      setStatusPlace('pending');
      setShowPopUp(true);
    }
  }

  return (
    <div className="page-container placeform-page">
      <h1 className="page-header">{t('Placeform.1')}</h1>
      <form className="form">
        <label htmlFor="place-name">
          {t('Placeform.2')}
          <input id="place-name" type="place-name" name="placeName" onChange={handleChange} />
        </label>
        <label htmlFor="web-page">
          {t('Placeform.3')}
          <input id="web-page" type="web-page" name="webPage" onChange={handleChange} />
        </label>
        <label htmlFor="email">
          {t('Placeform.4')}
          <input id="email" type="email" name="email" onChange={handleChange} />
        </label>
        <label htmlFor="phone">
          {t('Placeform.5')}
          <input id="phone" type="phone" name="phone" onChange={handleChange} />
        </label>
        <label htmlFor="city">
          {t('Placeform.6')}
          <input id="city" type="city" name="city" onChange={handleChange} />
        </label>
        <label htmlFor="street">
          {t('Placeform.7')}
          <input id="street" type="street" name="street" onChange={handleChange} />
        </label>
        <label htmlFor="house-no">
          {t('Placeform.8')}
          <input id="house-no" type="house-no" name="houseNo" onChange={handleChange} />
        </label>
        <label htmlFor="postal-code">
          {t('Placeform.9')}
          <input id="postal-code" type="postal-code" name="postalCode" onChange={handleChange} />
        </label>
        <label htmlFor="district">
          {t('Placeform.10')}
          <select id="district" name="district" onChange={handleChange}>
            <option value="Bałuty">Bałuty</option>
            <option value="Śródmieście">Śródmieście</option>
            <option value="Widzew">Widzew</option>
            <option value="Polesie">Polesie</option>
            <option value="Górna">Górna</option>
            <option selected value="inna">{t('Placeform.11')}</option>
          </select>
        </label>
        <label htmlFor="logo">
          {t('Placeform.12')}
          <input id="logo" type="logo" name="logo" onChange={handleChange} />
        </label>
        <label htmlFor="category">
          {t('Placeform.13')}
          <select id="category" name="category" onChange={handleChange}>
            <option value="dzieci">{t('Placeform.15')}</option>
            <option value="zwierzeta">{t('Placeform.16')}</option>
            <option value="inwalidzi">{t('Placeform.17')}</option>
            <option value="uzaleznienia">{t('Placeform.18')}</option>
            <option value="emeryci">{t('Placeform.19')}</option>
            <option selected value="inne">{t('Placeform.14')}</option>
          </select>
        </label>
        <label htmlFor="shortDescription">
          {t('Placeform.20')}
          <input id="shortDescription" type="text" name="shortDescription" onChange={handleChange} />
        </label>
        <label htmlFor="description">
          {t('Placeform.21')}
          <ReactQuill className="description-box" id="description" theme="snow" value={description} onChange={setDescription} modules={modules} formats={formats} />
        </label>
        <input
          id="send"
          type="submit"
          value={t('Placeform.22')}
          className="submit submit-addplace"
          onClick={(event) => { handleSubmit(event); }}
        />
      </form>
      <ViewPlaceForm info={infoAboutCurretPlace} showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
    </div>
  );
}

export default PlaceForm;
