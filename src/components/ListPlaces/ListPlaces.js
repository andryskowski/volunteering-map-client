/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  useState, useContext, useEffect, useRef, 
} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../scss/base/_list-places.scss';
import { PlacesContext } from '../../contexts/PlacesContext';
import Pagination from '../Pagination/Pagination';
import '../../scss/base/_pagination.scss';
import '../../scss/base/_filters.scss';

function ListPlaces() {
  const [filteredDistrict, setFilteredDistrict] = useState('');
  const [filteredCategory, setFilteredCategory] = useState('');
  const [filteredName, setFilteredName] = useState('');
  const PLACES = useContext(PlacesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [sortBy, setSortBy] = useState('-');
  const { t } = useTranslation();
  
  function handleChange(event) {
    if (event.target.name === 'district') {
      setFilteredDistrict(event.target.value);
    }
    if (event.target.name === 'category') {
      setFilteredCategory(event.target.value);
    }
    if (event.target.name === 'search-name') {
      setFilteredName(event.target.value);
    }
  }

  function changeFiltres() {
    if (filteredCategory === '' && filteredDistrict === '' && filteredName === '') return ((place) => place);
    if (filteredCategory && filteredDistrict) return ((place) => place.district === filteredDistrict && place.category === filteredCategory);
    if (filteredDistrict) return ((place) => place.district === filteredDistrict);
    if (filteredCategory) return ((place) => place.category === filteredCategory);
    if (filteredName) return ((place) => place.name.toLowerCase().includes(filteredName.toLowerCase()));
    return ((place) => place);
  }

  const sortPlaces = () => {
    if (sortBy === 'oldest') {
      return PLACES?.sort((a, b) => new Date(a.date) - new Date(b.date));
    } if (sortBy === 'newest') {
      return PLACES?.sort((a, b) => new Date(b.date) - new Date(a.date));
    } if (sortBy === '-') {
      return PLACES;
    }
  };

  const currentPlaces = sortPlaces().filter(changeFiltres()).map((place) => (
    <div className="place-list-item" key={place._id}>
      <div>
        <Link to={place._id}><img className="place-img" src={place.img} alt="place-img" width="100" height="100" /></Link>
      </div>
      <div className="place-name">
        <h4><Link to={place._id}>{place.name}</Link></h4>
      </div>
      <div className="place-address">
        <h5>
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
        </h5>
      </div>
      <div className="place-category">
        <p>
          <b>{t('List of places.5')}</b>
          {place.category}
        </p>
      </div>
      <div className="place-district">
        <p>
          <b>{t('List of places.2')}</b>
          {place.district}
        </p>
      </div>
      <div className="place-date">
        <p>
          <b>{t('List of places.16')}</b>
          {' '}
          {place.date.substring(0, 10)}
          {' '}
          {place.date.substring(11, 19)}
        </p>
      </div>
      <div className="short-description">
        <p>
          <b>{t('List of places.17')}</b>
          <p>{place.shortDescription}</p>
        </p>
      </div>
    </div>
  ));

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const placesWithPagination = currentPlaces.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="page-container">
      <h1 className="page-header">{t('List of places.1')}</h1>
      <div className="filter">
        <form className="filters-form">
          <label htmlFor="district">
            {t('List of places.2')}
            <select id="district" name="district" onChange={handleChange}>
              <option value="">{t('List of places.3')}</option>
              <option value="Bałuty">Bałuty</option>
              <option value="Śródmieście">Śródmieście</option>
              <option value="Widzew">Widzew</option>
              <option value="Polesie">Polesie</option>
              <option value="Górna">Górna</option>
              <option value="inna">{t('List of places.4')}</option>
            </select>
          </label>
          <label htmlFor="category">
            {t('List of places.5')}
            <select id="category" name="category" onChange={handleChange}>
              <option value="">{t('List of places.3')}</option>
              <option value="dzieci">{t('List of places.6')}</option>
              <option value="zwierzeta">{t('List of places.7')}</option>
              <option value="inwalidzi">{t('List of places.8')}</option>
              <option value="uzaleznienia">{t('List of places.9')}</option>
              <option value="emeryci">{t('List of places.10')}</option>
              <option value="inne">{t('List of places.11')}</option>
            </select>
          </label>
          <label htmlFor="sort">
            {t('List of places.12')}
            <select onChange={(e) => setSortBy(e.target.value)} id="sort" name="sort">
              <option value="-">--</option>
              <option value="newest">{t('List of places.13')}</option>
              <option value="oldest">{t('List of places.14')}</option>
            </select>
          </label>
          <label>
            {t('List of places.15')}
            <input type="text" name="search-name" onChange={handleChange} />
          </label>
        </form>
      </div>
      {placesWithPagination}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={currentPlaces.length}
        paginate={paginate}
      />
    </div>
  );
}

export default ListPlaces;
