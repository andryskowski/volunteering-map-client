import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../scss/base/_register-form.scss';
import { authRegister } from '../../actions/FetchData';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameUser: '',
      emailUser: '',
      passwordUser: '',
      translation: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.translation = this.props.translation;
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { nameUser, emailUser, passwordUser } = this.state;
    authRegister(nameUser, emailUser, passwordUser);
  }

  render() {
    return (
      <div className="register-form">
        <form onSubmit={this.handleSubmit} className="form">
          <label>
            <h3>{this.translation('RegisterForm.1')}</h3>
            <p>{this.translation('RegisterForm.2')}</p>
          </label>
          <label htmlFor="name">
            {this.translation('RegisterForm.3')}
            <input id="name" type="text" name="nameUser" onChange={this.handleChange} />
          </label>
          <label htmlFor="email">
            {this.translation('RegisterForm.4')}
            <input id="email" type="email" name="emailUser" onChange={this.handleChange} />
          </label>
          <label htmlFor="password">
            {this.translation('RegisterForm.5')}
            <input id="password" type="password" name="passwordUser" onChange={this.handleChange} />
          </label>
          <input
            id="send"
            type="submit"
            value={this.translation('RegisterForm.6')}
            className="submit"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}
