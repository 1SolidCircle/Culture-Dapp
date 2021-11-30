import React, { Component } from 'react';
import { Dropdown, Button, Modal, Row, Col, Form } from 'react-bootstrap';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/userActions';
import configs from '../../../../../config';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class NavRight extends Component {
    
    constructor(props) {
        super(props);
        this.onDropPhoto2 = (files) => {
            this.uploadImage(files)
        };
        this.onDropPhoto2Rejected = (val) => {
            val.forEach(elem => {
                if (elem.errors.some(x => x.code == 'file-too-large')) {
                    this.setState({ pic_size: true });
                }
            });
        }
        this.state = {
            listOpen: false,
            showModal: false,
            isLoading: false,
            pic_progress: 0,
            pic_uploading: false,
            pic_url: '',
            pic_size: false,
            isValid: {
                value: false,
                text: '',
                name: ''
            },
            postDiscription: ''
        };
    }
    
    handleTextChange(event) {
        this.setState({ [event.name]: event.value });
    }

    uploadImage = (files) => {
        let that = this;
        const config = {
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                that.setState({ pic_progress: percentCompleted });
            }
        }
        this.setState({ pic_uploading: true, pic_size: false });
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "solidcirclepreset");
        data.append("cloud_name", "solidcircle1");
        axios.post(`${configs.cloudinary_image}`, data, config)
            .then(response => {
                this.setState({ pic_url: response.data.url, pic_uploading: false, isValid: { value: false, text: '', name: '' } });
            })
            .catch(err => {
                this.setState({ pic_uploading: false, isValid: { value: false, text: '', name: '' } });
                console.log(err)
            });
    }

    async logout(e) {
        e.preventDefault();
        await localStorage.removeItem('culture-dapp-token');
        await this.props.signOut();
        this.props.history.push('/login');
    }

    handlePost() {

        let { postDiscription, pic_url } = this.state;
       
        if (!pic_url) {
            this.setState({ isValid: { value: true, text: 'This is required', name: 'pic_url' }});
            return; 
        }
        
        this.setState({ isLoading: true, isValid: { value: false, text: '', name: '' } });
		axios.post(`${configs.prod}/api/post/create`, { user_id: this.props.user.id, post_discription: postDiscription, pic_url: pic_url  })
			.then(response => {
				// this.createNotification('success', 'Post Created Successfully');
				// this.getTrackList();
                this.setState({ isLoading: false, showModal: false })
			})
			.catch(err => {
                if (err.response && err.response.status && (err.response.status === 404 || err.response.status === 400 || err.response.status === 401 || err.response.status === 500)) {
                    this.setState({ isLoading: false, isValid: { value: true, text: err.response.data.msg, name: 'common' } });
                    // this.createNotification('error', err.response.data.msg);
                } else {
                    this.setState({ isLoading: false, isValid: { value: true, text: 'Unknown Error', name: 'common' } });
                    // this.createNotification('error', 'Unknown Error');
                }
				// this.setState({ isLoading: false, isValid });
				console.log('Error: creating post db ', err.response);
                // this.createNotification('error', 'Error while deleting data from db');
			});
    }

    render() {
        const maxSize = 10242880;
        return (
            <Aux>
                { this.state.showModal && 
                    <Modal show={this.state.showModal} size="lg" onHide={() => this.setState({ showModal: false })}>
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">Create New Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(e) => this.handlePost(e)}>
                                <fieldset disabled={this.state.isLoading} className={this.state.isLoading ? 'opacity-5' : ''}>
                                    <Row>
                                        <Col md={7}>
                                            <Dropzone 
                                                onDropAccepted={this.onDropPhoto2}
                                                onDropRejected={this.onDropPhoto2Reject} 
                                                accept="image/*" 
                                                minSize={0}
                                                maxSize={maxSize}
                                                multiple={false}
                                            >
                                                {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
                                                    return (
                                                        <section>
                                                            <Row>
                                                                <Col md={12} lg={12}>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', cursor:'pointer', alignItems: 'center', justifyContent:'center', borderWidth: 2, height: '25em', borderRadius: 2, textAlign: 'center', borderColor: this.state.isValid.value && this.state.isValid.name == 'pic_url' ? 'red' : '#eeeeee', borderStyle: 'dashed', backgroundColor: '#fafafa', color: '#bdbdbd' }} 
                                                                        {...getRootProps({className: 'dropzone',
                                                                            // onClick: event => event.stopPropagation()
                                                                        })}
                                                                    >
                                                                        <input {...getInputProps()} />
                                                                        {!isDragActive && !this.state.pic_url && 
                                                                            <div>
                                                                                <h6>Upload Photos</h6>
                                                                                <p>Drag & Drop your image or Browse</p>
                                                                                <p>(Recommended Max 10mb)</p>
                                                                            </div>
                                                                        }

                                                                        {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                                                        {isDragReject && "File type not accepted, sorry!"}
                                                                        { this.state.pic_size && (
                                                                            <div className="text-danger mt-2">
                                                                                File is too large. Max Size 10MB
                                                                            </div>
                                                                        )}
                                                                        { !this.state.pic_uploading && this.state.pic_url &&  <div style={{ padding: 0, maxHeight: '25em', overflow: 'hidden' }}>
                                                                                <div  className='wrap-p-image'>
                                                                                    <img 
                                                                                        alt='cover' 
                                                                                        style={{ width: '100%', height: '100%' }} 
                                                                                        src={this.state.pic_url} 
                                                                                    />
                                                                                </div>
                                                                            </div> 
                                                                        }
                                                                        { this.state.pic_uploading ? <div style={{ width: '30%', position: 'absolute', padding: 14, backgroundColor: 'whitesmoke', borderRadius: 20 }}>
                                                                            <CircularProgressbar value={this.state.pic_progress} text={`${this.state.pic_progress}%`} /> 
                                                                            </div> : null 
                                                                        }
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            {
                                                                this.state.isValid.value && this.state.isValid.name === 'pic_url' ?
                                                                <Form.Text style={{ color: 'red' }}>
                                                                    { this.state.isValid.text }
                                                                </Form.Text> : ''
                                                            }
                                                        </section>
                                                    )}
                                                }
                                            </Dropzone>
                                        </Col>
                                        <Col md={5}>
                                            <Form.Group className="mb-2 mt-2" controlId="exampleForm.ControlTextarea1">
                                                <div className="avatarPostContainer">
                                                    <div className="avatarPostSubContainer">
                                                        <img className="avatarImg" src={this.props.user.profile_pic ? this.props.user.profile_pic : "https://www.w3schools.com/howto/img_avatar.png"} alt="Avatar" />
                                                    </div>
                                                </div>
                                                <span style={{ left: 50, fontWeight: 'bold', fontSize: 16, position: 'absolute' }}>{this.props.user.username}</span>
                                            </Form.Group>
                                            <Form.Group style={{ height: '100%' }} className="mb-2" controlId="exampleForm.ControlTextarea1">
                                                <Form.Control 
                                                    as="textarea" 
                                                    className='postArea'
                                                    maxLength={2200}
                                                    name="trackDiscription" 
                                                    placeholder="Write a caption..."
                                                    value={this.state.trackDiscription}
                                                    onChange={(e) => this.handleTextChange(e.target) }
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className='mt-2'>
                                        <Col>
                                            {
                                                this.state.isValid.value && this.state.isValid.name === 'common' ?
                                                <Form.Text style={{ color: 'red' }}>
                                                    { this.state.isValid.text }
                                                </Form.Text> : ''
                                            }
                                        </Col>
                                    </Row>
                                </fieldset>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <fieldset disabled={this.state.isLoading} className={this.state.isLoading ? 'opacity-5' : ''}>
                                <Button variant="primary" onClick={() => this.handlePost()}>
                                    Post Now
                                </Button>
                                <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
                                    Cancel
                                </Button>
                            </fieldset>
                        </Modal.Footer>
                    </Modal>
                }
                <ul className="navbar-nav ml-auto">
                    <li>
                        <a href="/home" onClick={(e) => { e.preventDefault(); this.props.history.push('/home')}}>
                            <svg aria-label="Home" class="_8-yf5 " color="#262626" fill="#262626" height="22" role="img" viewBox="0 0 48 48" width="22">
                                <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
                            </svg>
                        </a>
                    </li>                
                    <li>
                        <a href="/post" onClick={(e) => { e.preventDefault();  this.setState({ showModal: true }) }}>
                            <svg aria-label="New Post" className="_8-yf5 " color="#262626" fill="#262626" height="22" role="img" viewBox="0 0 48 48" width="22">
                                <path d="M31.8 48H16.2c-6.6 0-9.6-1.6-12.1-4C1.6 41.4 0 38.4 0 31.8V16.2C0 9.6 1.6 6.6 4 4.1 6.6 1.6 9.6 0 16.2 0h15.6c6.6 0 9.6 1.6 12.1 4C46.4 6.6 48 9.6 48 16.2v15.6c0 6.6-1.6 9.6-4 12.1-2.6 2.5-5.6 4.1-12.2 4.1zM16.2 3C10 3 7.8 4.6 6.1 6.2 4.6 7.8 3 10 3 16.2v15.6c0 6.2 1.6 8.4 3.2 10.1 1.6 1.6 3.8 3.1 10 3.1h15.6c6.2 0 8.4-1.6 10.1-3.2 1.6-1.6 3.1-3.8 3.1-10V16.2c0-6.2-1.6-8.4-3.2-10.1C40.2 4.6 38 3 31.8 3H16.2z"></path>
                                <path d="M36.3 25.5H11.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h24.6c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path>
                                <path d="M24 37.8c-.8 0-1.5-.7-1.5-1.5V11.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v24.6c0 .8-.7 1.5-1.5 1.5z"></path>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="/listen" className="customLinkBtn" onClick={(e) => { e.preventDefault();  this.props.history.push('/listen') }}>Listen</a>
                    </li>
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon-settings_applications"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                    <span>{this.props.user ? `${this.props.user.firstName}` : null }</span>
                                    <a href={DEMO.BLANK_LINK} onClick={(e) => this.logout(e) } className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"/>
                                    </a>
                                </div>
                                <ul className="pro-body">
                                    {/* <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-settings"/> Settings</a></li> */}
                                    <li><a href={DEMO.BLANK_LINK} onClick={(e) => { e.preventDefault(); this.props.history.push('/me')}} className="dropdown-item"><i className="feather icon-user"/>My Music</a></li>
                                    <li><a href={DEMO.BLANK_LINK} onClick={(e) => { e.preventDefault(); this.props.history.push('/profile')}} className="dropdown-item"><i className="feather icon-mail"/> My Account</a></li>
                                    {/* <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-lock"/> Lock Screen</a></li> */}
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userDetails.user
    }
}
export default connect(mapStateToProps, actions)(withRouter(NavRight));
