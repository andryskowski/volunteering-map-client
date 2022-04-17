import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../scss/base/_legend.scss';
import pin1 from '../../assets/gps1.svg';
import pin2 from '../../assets/gps2.svg';
import pin3 from '../../assets/gps3.svg';
import pin4 from '../../assets/gps4.svg';
import pin5 from '../../assets/gps5.svg';
import pin6 from '../../assets/gps6.svg';

function Legend() {
  const { t } = useTranslation();

  return (
    <div className="legend">
      <h2 className="legend-header">{t('Legend.1')}</h2>
      <div className="pins">
        <div>
          <div className="pin-container">
            <img className="pin-img" alt="no ping img" src={pin5} />
            <p className="category-text">
              {' '}
              -
              {' '}
              {t('Legend.2')}
            </p>
          </div>
          <div className="pin-container">
            <img className="pin-img" alt="no ping img" src={pin1} />
            <p className="category-text">
              {' '}
              -
              {' '}
              {t('Legend.3')}
            </p>
          </div>
          <div className="pin-container">
            <img className="pin-img" alt="no ping img" src={pin3} />
            <p className="category-text">
              {' '}
              -
              {' '}
              {t('Legend.4')}
              {' '}
            </p>
          </div>
        </div>
        <div>
          <div className="pin-container">
            <img className="pin-img" alt="no ping img" src={pin4} />
            <p className="category-text">
              {' '}
              -
              {' '}
              {t('Legend.5')}
            </p>
          </div>
          <div className="pin-container">
            <img className="pin-img" alt="no ping img" src={pin6} />
            <p className="category-text">
              {' '}
              -
              {' '}
              {t('Legend.6')}
            </p>
          </div>
          <div className="pin-container">
            <img className="pin-img" alt="no ping img" src={pin2} />
            <p className="category-text">
              {' '}
              -
              {' '}
              {t('Legend.7')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Legend;
