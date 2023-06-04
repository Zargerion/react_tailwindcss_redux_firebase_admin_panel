import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail} from "firebase/auth"
import { setUser } from '../store/slices/userSlice'
import { connect } from 'react-redux';


class ValidationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  validate = () => {
    let errors = {};
    if (!this.state.email) {
      errors.email = 'Необходимо ввести email.';
    }
    if (!this.state.password) {
      errors.password = 'Необходимо ввести пароль.';
    } else if (this.state.password.length < 6) {
      errors.password = 'Пароль должен состоянить как мининмум 6 символов.';
    }
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    const { dispatch } = this.props;

    if (this.validate()) {
      fetchSignInMethodsForEmail(auth, this.state.email)
      .then((signInMethods) => {
        if (signInMethods.length > 0) {
          signInWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then((userCredentials) => {

              // redux
              dispatch(setUser({
                email: userCredentials.user.email,
                id: userCredentials.user.uid,
                token: userCredentials.user.accessToken
              }));
              
              const link = document.querySelector('#toAdmin');
              if (link) {
                  link.click();
              }
            })
            .catch((error) => {
              this.setState({ errors: { ...this.state.errors, password: 'Неверный email или пароль.' } });
            });
        } else {
          this.setState({ errors: { ...this.state.errors, password: 'Неверный email или пароль.' } })
        }
      })
      .catch((error) => {
        this.setState({ errors: { ...this.state.errors, password: 'Ошибка при проверке адреса электронной почты.' } })
      }); 
    }
  }

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="p-4 bg-gray-50 flex flex-wrap items-center justify-center">
        <div className="flex flex-col mr-4">
          <input
            className="border rounded-md py-2 px-4 mb-2"
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(event) => this.setState({ email: event.target.value })}
          />
          <input
            className="border rounded-md py-2 px-4 mb-4"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => this.setState({ password: event.target.value })}
          />
          {(errors.password || errors.email) && <div className="text-red-500 mb-4">{errors.password} {errors.email}</div>}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-1 rounded"
            onClick={this.handleSubmit}
          >
            Войти
          </button>
          <Link className="hidden" id="toAdmin" to="/admin">В админку</Link>
        </div>
      </div>
    );
  }
}

export default connect()(ValidationPage);
