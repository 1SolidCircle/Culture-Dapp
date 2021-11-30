import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Loader from './App/layout/Loader';
import * as actions from './store/actions/userActions';
import config from './config';

export default function (ComposedComponent) {

  class Refresh extends Component {
    state = {
      valid: false
    }
    
    componentDidMount = async () => {
      const { history } = this.props;
      let local = localStorage.getItem('culture-dapp-token');
      if (local) {
        axios.post(`${config.prod}/api/validate/token`, { token: local })
          .then(async ({ data }) => {
            await this.props.setRoute(true);
            await this.props.signIn(data.data);
            this.setState({ valid: true });
          })
          .catch(async error => {
            localStorage.removeItem('culture-dapp-token');
            await this.props.setRoute(false);
            history.push('/');
          });
      } else {
        this.setState({ valid: true });
      }
    }

    render() {
      let local = localStorage.getItem('culture-dapp-token');
      if (local) {
        if (this.state.valid) {
          return <ComposedComponent {...this.props} />;
        } else {
          return <Loader />
        }
      }
      else {
        return <ComposedComponent {...this.props} />;
      }
    }
  }
  
  return connect(null, actions)(Refresh);
}
