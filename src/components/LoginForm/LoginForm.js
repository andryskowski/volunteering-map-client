import React from 'react';
import { useTranslation } from 'react-i18next';
import { authLogin } from '../../actions/FetchData';
import '../../scss/base/_login-form.scss';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailUser: '',
      passwordUser: '',
      translation: '',
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
    const { emailUser, passwordUser } = this.state;
    authLogin(emailUser, passwordUser);
  }

  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit} className="form">
          <label>
            <h3>{this.translation('LoginForm.1')}</h3>
            <p>{this.translation('LoginForm.2')}</p>
          </label>
          <label htmlFor="email">
            {this.translation('LoginForm.3')}
            <input id="email" type="email" name="emailUser" onChange={this.handleChange} />
          </label>
          <label htmlFor="password">
            {this.translation('LoginForm.4')}
            <input id="password" type="password" name="passwordUser" onChange={this.handleChange} />
          </label>
          <input
            id="send"
            type="submit"
            value={this.translation('LoginForm.5')}
            className="submit"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}
