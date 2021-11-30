import React from 'react';
import { Row, Col, Card, Button, Tabs, Tab, Modal } from 'react-bootstrap';
import Aux from '../../../hoc/_Aux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Loader from '../../../App/layout/Loader';
import { connect } from 'react-redux';
import axios from 'axios';
import config from '../../../config';
import './../../../assets/scss/style.scss';
import '../../../assets/scss/css/base.css';
import '../../../assets/scss/css/main.css';
import '../../../assets/scss/css/magnific-popup.css';
import '../../../assets/scss/css/style.css';
import StreamIndexItem from './StreamIndexItem';
import { receiveCurrentTrack, togglePlay } from '../../../store/actions/current_track_actions';


class Listen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
			deletedRowId: null,
			showModal: false,
			handleCloseModal: false,
            isValid: {
                value: false,
                text: ''
            },
            selectedTab: 'tracks',
            isMobile: false,
            data: []
        }
    }

    componentDidMount() {
        this.setState({ isMobile:  window.innerWidth < 768 });
        this.getTrackList();
        let that = this;
        window.addEventListener('resize', () => {
            that.setState({ isMobile: window.innerWidth < 768 });
        });

        const body = document.getElementsByTagName('body')[0]
        const script = document.createElement('script')
        script.src = 'js/listenScript.js';
        body.appendChild(script)
    }

    openDeleteModal(value) {
		this.setState({ name: `${value.track_display_anme}`, showModal: true, deletedRowId: value.id });
    }

    getTrackList() {
        this.setState({ isLoading: true });
		axios.get(`${config.prod}/api/track/list`)
			.then(response => {
				this.setState({ data: response.data.data, isLoading: false });
			})
			.catch(err => {
				this.setState({ isLoading: false });
				console.log('Error: getting data from db ', err.response);
                this.createNotification('error', 'Error while Getting data from db');
			});
    }

    createNotification = (type, value) => {
        switch (type) {
            case 'info':
                NotificationManager.info(value, '', 5000);
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

    render() {

        const tracks = this.state.data.map((track) => (
            <StreamIndexItem key={track.id}
                track={track}
                queue={ this.props.tracks }
                receiveCurrentTrack={ this.props.receiveCurrentTrack }
                togglePlay={ this.props.togglePlay }
                currentTrack={ this.props.currentTrack.track && this.props.currentTrack.track.id === track.id ? this.props.currentTrack : false } 
            />
        ));
        return (
            <Aux>
                {this.state.isLoading && <Loader />}
                <Row>
                    <NotificationContainer />
                </Row>
                <div className="bg-custom wrapper">
                    <div className="block-search-form">
                        <div className="block-content">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-10 col-lg-8">
                                        <form method="get"  >
                                            <div className="card  bg-red ">
                                                <div className="card-body  row no-gutters align-items-center">
                                                    <div className="col-auto">
                                                        <i className="feather icon-search"></i>
                                                    </div>
                                                    <div className="col">
                                                        <input className="form-controle form-control-lg form-control-border0" placeholder="Type a keywords..." type="search" />
                                                    </div>
                                                    <div className="col-auto">
                                                        <button type="submit" className="btn  btn-primary btn-primary2 uppercase border-3">
                                                            Search now</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="bg-custom">
                        <header className="header">
                            <div className=" left-part">
                                <a className="logo scroll" href="/">
                                    <h2 className="mb-0 uppercase" style={{ lineHeight: '3rem' }}>Culture Dapp.</h2>
                                </a>
                            </div>
                            <div className="right-part">
                                <nav className="main-nav">
                                    <div className="toggle-mobile-but">
                                        <a href="#" className="mobile-but" >
                                            <div className="lines"></div>
                                        </a>
                                    </div>
                                    <ul className="main-menu list-inline">
                                        <li><a className="scroll list-inline-item" href="/home">Home</a></li>
                                        <li><a className="scroll list-inline-item" href="/listen">Listen</a></li>
                                        { this.props.user && Object.keys(this.props.user).length ? <li><a className="scroll list-inline-item" href="/profile">My Account</a></li> : null }
                                        { !this.props.user ? <li><a className="scroll list-inline-item" href="/login">Sign In</a></li> : null }
                                        { !this.props.user ? <li><a className="scroll list-inline-item" href="/signup">Sign Up</a></li> : null }

                                        <li className="block-helper">
                                            <a href="#album" className="scroll"><span ><i className="icon-cd-2"></i></span></a>
                                        </li>
                                        <li className="block-helper">
                                            <span className="icon search-ico"><i className="feather icon-search"></i></span>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </header>
                    </section>
                    <section className="bg-custom latest main">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-9 ">
                                    <div className="block-content text-center gap-one-bottom-md">
                                        <div className="block-title ">
                                            <h1 className="uppercase">Latest Tracks</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-8 col-md-10">
                                    <div className="block-tracklist">
                                        <div className="row">
                                            <div className="col-12">
                                                { tracks }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userDetails.user,
        currentTrack: state.currentTrack
    }
}

const mapDispatchToProps = (dispatch) => ({
    // fetchScrollTracks: (pageId) => dispatch(fetchScrollTracks(pageId)),
    // fetchTracks: () => dispatch(fetchTracks()),
    receiveCurrentTrack: (track, queue) => dispatch(receiveCurrentTrack(track, queue)),
    togglePlay: () => dispatch(togglePlay())
});
export default connect(mapStateToProps, mapDispatchToProps)(Listen);
