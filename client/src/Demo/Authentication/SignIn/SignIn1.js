import React from 'react';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import * as actions from '../../../store/actions/userActions';
import { NavLink } from 'react-router-dom';
import Loader from '../../../App/layout/Loader';

class SignUp1 extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        isValid: {
            value: false,
            text: ''   
        },
        isLoading: false,
        redirectTo: '',
      }
    }

    componentDidMount() {
        let local = localStorage.getItem('culture-dapp-token');
        if (local) {
            this.props.history.push('/profile');
        } else {
            const { state } = this.props.location;
            if (state && state.redirectTo) {
                this.setState({ redirectTo: state.redirectTo });
            }
        }
    }

    handleTextChange(event) {
        this.setState({ [event.name]: event.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
       
        if (!email && email.trim().length <= 0) {
            this.setState({ isValid: { value: true, text: 'Please enter valid Email', name: 'email' }});
            return;
        }

        if (!password && password.length <= 0) {
            this.setState({ isValid: { value: true, text: 'Please enter valid Password', name: 'password' }});
            return;
        }
        this.setState({ isLoading: true });
        axios.post(`${config.prod}/api/user/login`, { email: email.trim(), password: password })
            .then(async result => {
                this.setState({ isLoading: false });
                await localStorage.setItem('culture-dapp-token', result.data.token);
                await this.props.signIn(result.data.user);
                if (this.state.redirectTo) {
                    this.props.history.push(this.state.redirectTo);
                } else {
                    result.data.user.role === 'admin' ? this.props.history.push('/admin/dashboard') : this.props.history.push('/profile');
                } 
            })
            .catch(err => {
                console.log('Error: ', err.response);
                if (err.response && err.response.status && (err.response.status === 404 || err.response.status === 400 || err.response.status === 401 || err.response.status === 500)) {
                    this.setState({ isLoading: false, isValid: { value: true, text: err.response.data.msg } });
                    this.createNotification('error', err.response.data.msg);
                } else {
                    this.setState({ isLoading: false, isValid: { value: true, text: 'Unknown Error' } });
                    this.createNotification('error', 'Unknown Error');
                }
            });
    }

    createNotification = (type, value) => {
        switch (type) {
            case 'info':
                NotificationManager.info(value,'', 5000);
                break;
            case 'success':
                NotificationManager.success(value, '', 5000);
                break;
            case 'warning':
                NotificationManager.warning(value, '', 5000);
                break;
            case 'error':
                NotificationManager.error(value, '', 5000);
                break;
            default: break;
        }
    };

    render () {
        const { translation } = this.props;
        return(
            <Aux>
                { this.state.isLoading && <Loader /> }
                <NotificationContainer/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <fieldset disabled={this.state.isLoading} className={this.state.isLoading ? 'opacity-5' : ''}>
                                    <div className="mb-4">
                                        <i className="feather icon-unlock auth-icon"/>
                                    </div>
                                    <h3 className="mb-4">{translation("LoginPage.login")}</h3>
                                    <div className="input-group mb-3">
                                        <input 
                                            type="email" 
                                            className={this.state.isValid.value && this.state.isValid.name === 'email' ? 'form-control in-valid-input' : 'form-control'} 
                                            placeholder={translation("LoginPage.emailPlaceholder")}
                                            name="email"
                                            onFocus={() => this.setState({ isValid: { value: false, text: '', name: '' }})}
                                            onChange={(e) => this.handleTextChange(e.target) }
                                        />
                                    </div>
                                    <div className="input-group mb-4">
                                        <input 
                                            type="password" 
                                            className={this.state.isValid.value && this.state.isValid.name === 'password' ? 'form-control in-valid-input' : 'form-control'} 
                                            placeholder={translation("LoginPage.passwordPlaceholder")}
                                            name="password"
                                            onFocus={() => this.setState({ isValid: { value: false, text: '', name: '' }})}
                                            onChange={(e) => this.handleTextChange(e.target) }
                                        />
                                    </div>
                                    <div className="form-group text-left">
                                        {
                                            this.state.isValid.value ?
                                            <Form.Text style={{ color: 'red' }}>
                                                { this.state.isValid.text }
                                            </Form.Text> : ''
                                        }
                                    </div>
                                    <div>
                                        <button style={{ width: '100%' }} className="btn btn-primary shadow-2 mb-4" onClick={(e)=> this.handleSubmit(e)}>{translation("LoginPage.loginButton")}</button>
                                    </div>
                                    <p className="mb-0 text-muted"><NavLink to="/forgot/password">Forgot Password?</NavLink></p>
                                    <p className="mb-0 text-muted">{translation("LoginPage.createAccountText")} <NavLink to="/signup">{translation("LoginPage.signupLink")}</NavLink></p>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userDetails
    }
};

export default connect(mapStateToProps, actions)(SignUp1);