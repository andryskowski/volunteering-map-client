import React, { useContext, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Parser from 'html-react-parser';
import { postPlaces } from '../../../actions/FetchData';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import '../../../scss/base/_view-place-form.scss';

function ViewPlaceForm(props) {
  const popup = useRef(null); 
  const popupBackground = useRef(null); 
  const CURRENT_USER = useContext(CurrentUserContext);
  const { t } = useTranslation();

  async function sendPlaceToDB(event) {
    event.preventDefault();
    const NEW_PLACE = props.info;
    postPlaces(NEW_PLACE, CURRENT_USER.userInfo._id);
  }

  useEffect(() => {
    if (props.showPopUp === true) {
      popup.current.style.display = 'block';
      popupBackground.current.style.display = 'block';
    }
  });

  const onButtonClick = () => {
    popup.current.style.display = 'none';
    popupBackground.current.style.display = 'none';
    props.setShowPopUp('false');
  };
  
  return (
    <>
      <div className="popup-background" ref={popupBackground} />
      <div className="popup" ref={popup}>
        <div className="button-container"><button onClick={onButtonClick}>X</button></div>
        <h2>
          {t('ViewPlaceform.1')}
          {' '}
        </h2>
        <h5>
          {t('ViewPlaceform.2')}
          {props.info.placeName}
        </h5>
        <h5>
          {t('ViewPlaceform.3')}
          {props.info.phone}
        </h5>
        <h5>
          {t('ViewPlaceform.4')}
          {props.info.webPage}
        </h5>
        <h5>
          {t('ViewPlaceform.5')}
          {props.info.email}
        </h5>
        <h5>
          {t('ViewPlaceform.6')}
          {props.info.city}
          , 
          {props.info.street}
          , 
          {props.info.houseNo}
          , 
          {props.info.postalCode}
        </h5>
        <h5>
          {t('ViewPlaceform.7')}
          <img src={props.info.smallMapOfPlace} alt="Podano nieprawidłowy adres" />
        </h5>
        <img src={props.info.logo} alt="Błędny link do zdjęcia logo miesca pomocy." />
        <h5>
          {t('ViewPlaceform.8')}
          {props.info.category}
        </h5>
        <div>
          {t('ViewPlaceform.9')}
          {Parser(props.info.description)}
        </div>
        <input type="submit" onClick={sendPlaceToDB} value={t('ViewPlaceform.10')} />
        <p>
          <b>
            {t('ViewPlaceform.11')}
            {' '}
          </b>
          {t('ViewPlaceform.12')}
        </p>
      </div>
    </>
  );
}

export default ViewPlaceForm;
