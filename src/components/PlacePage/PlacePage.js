import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../scss/base/_list-places.scss';
import Parser from 'html-react-parser';
import { PlacesContext } from '../../contexts/PlacesContext';
import Comments from '../Comments/Comments';

function PlacePage(props) {
  const { placeId } = props;
  const PLACES = useContext(PlacesContext);
  const { t } = useTranslation();

  return (
    <>
      <div className="page-container placepage-placeinfo">
        <h1>
          {t('PlacePage.1')}
        </h1>
        {PLACES
          .filter((place) => placeId === place._id)
          .map((place) => (
            <div className="placepage-places">
              <div>
                <h4>
                  <img
                    className="place-img-placepage"
                    src={place.img}
                    alt="place-img"
                    width="300"
                    height="300"
                  />
                </h4>
              </div>
              <div className="place-name">
                <h4>
                  {place.name}
                </h4>
              </div>
              <div className="place-address">
                <h5>
                  {t('PlacePage.2')}
                  {place.city}
                  ,
                  {place.street}
                  ,
                  {place.houseNo}
                  ,
                  {place.postalCode}
                </h5>
              </div>
              <div className="place-category">
                <p>
                  <b>{t('PlacePage.3')}</b>
                  {place.category}
                </p>
              </div>
              <div className="place-district">
                <p>
                  <b>{t('PlacePage.4')}</b>
                  {place.district}
                </p>
              </div>
              <div className="place-phone">
                <p>
                  <b>{t('PlacePage.5')}</b>
                  {place.phone}
                </p>
              </div>
              <div className="place-email">
                <p>
                  <b>{t('PlacePage.6')}</b>
                  {place.email}
                </p>
              </div>
              <div className="place-webpage">
                <p>
                  <b>{t('PlacePage.7')}</b>
                  <Link target="_blank" to={`//${place.webPage}`}>
                    {place.webPage}
                  </Link>
                </p>
              </div>
              <div className="place-addedby">
                <p>
                  <b>{t('PlacePage.8')}</b>
                  {place.addedBy}
                </p>
              </div>
              <div className="place-date">
                <p>
                  <b>{t('PlacePage.9')}</b>
                  {place.date}
                </p>
              </div>
              <div className="place-description">
                <p>
                  <b>{t('PlacePage.10')}</b>
                  {Parser(place.description)}
                </p>
              </div>
            </div>
          ))}
        <Comments placeId={placeId} />
      </div>
    </>
  );
}

export default PlacePage;
