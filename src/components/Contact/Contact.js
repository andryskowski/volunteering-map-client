import React, { useContext, useState } from 'react';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import '../../scss/base/_common.scss';
import '../../scss/base/_contact.scss';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { validation } from './validationContact';

function Contact() {
  const CURRENT_USER = useContext(CurrentUserContext);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  function sendEmail(e) {
    e.preventDefault();
    const isValidated = validation(subject, message);
    if (isValidated === true) {
      emailjs.sendForm('service_ht9ycji', 'template_s3vzm0j', e.target, 'user_sUt0KQRlhNXDQuf9BzGLr');
      alert('Wiadomosc zostala wyslana do administratora.');
      e.target.reset();
    }
  }

  return (
    <div className="page-container contact-page">
      <div>
        <h1 className="page-header">{t('Contact.1')}</h1>
        <h4 className="contact-header-2"><b>{t('Contact.2')}</b></h4>
        <form onSubmit={sendEmail} className="form form-contact">
          <label htmlFor="name">
            {t('Contact.3')}
            <input id="name" defaultValue={CURRENT_USER.userInfo.name} type="text" name="name" />
          </label>
          <label htmlFor="email">
            {t('Contact.4')}
            <input id="email" defaultValue={CURRENT_USER.userInfo.email} type="text" name="email" />
          </label>
          <label htmlFor="subject">
            {t('Contact.5')}
            <input id="subject" onChange={(e) => setSubject(e.target.value)} type="text" name="subject" />
          </label>
          <label htmlFor="message">
            {t('Contact.6')}
            <textarea onChange={(e) => setMessage(e.target.value)} id="message" type="text" name="message" className="message-input" />
          </label>
          <input type="submit" value={t('Contact.7')} />
        </form>
      </div>
    </div>
  );
}

export default Contact;
