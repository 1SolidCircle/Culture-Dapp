import React from 'react';
import { Row, Col, Card, Button, Tabs, Tab, Form } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Loader from '../../App/layout/Loader';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import countries from './countries';
import axios from 'axios';
import configs from '../../config';
import * as actions from '../../store/actions/userActions';

class EditProfile extends React.Component {
    
    constructor(props) {
        super(props);
        this.onDropPhoto2 = (files) => {
            this.uploadImage(files)
        };
        this.onDropPhoto2Rejected = (val) => {
            val.forEach(elem => {
                if (elem.errors.some(x => x.code == 'file-too-large')) {
                    this.setState({ profile_pic_size: true });
                }
            });
        }
        this.onDropPhotoProfileBanner = (files) => {
            this.uploadProfileBanner(files)
        };
        this.onDropPhotoProfileBannerReject = (val) => {
            val.forEach(elem => {
                if (elem.errors.some(x => x.code == 'file-too-large')) {
                    this.setState({ profile_banner_size: true });
                }
            });
        }
        this.onDropPhotoMobileBanner = (files) => {
            this.uploadMobileBanner(files);
        };
        this.onDropPhotoMobileBannerReject = (val) => {
            val.forEach(elem => {
                if (elem.errors.some(x => x.code == 'file-too-large')) {
                    this.setState({ mobile_banner_size: true });
                }
            });
        }
        this.state = {
            isLoading: false,
            isValid: {
                value: false,
                text: ''
            },
            isMobile: false,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            countryId: 0,
            files2: [],
            filesMobileBanner: [],
            filesProfileBanner: [],
            filesProgress: 0,
            profileURL: '',
            profileBio: '',
            isProfilePublic: false,
            profile_pic: '',
            profile_banner: '',
            mobile_banner: '',
            profile_pic_progress: 0,
            profile_pic_uploading: false,
            profile_pic_size: false,
            profile_banner_progress: 0,
            profile_banner_uploading: false,
            profile_banner_size: false,
            mobile_banner_progress: 0,
            mobile_banner_uploading: 0,
            mobile_banner_size: false,
            instagramLink: '',
            facebookLink: '',
            twitterLink: '',
            discordLink: '',
            youtubeLink: '',
            websiteLink: ''
        }
    }

    componentDidMount() {
        this.setState({ isMobile:  window.innerWidth < 768, username: this.props.user.username, profileURL: this.props.user.profile_url || this.props.user.username, email: this.props.user.email, firstName: this.props.user.firstName, lastName: this.props.user.lastName });
        this.getProfileById();
        let that = this;
        window.addEventListener('resize', () => {
            that.setState({ isMobile: window.innerWidth < 768 });
        });
    }

    uploadImage = (files) => {
        let that = this;
        const config = {
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                that.setState({ profile_pic_progress: percentCompleted });
            }
        }
        this.setState({ profile_pic_uploading: true, profile_pic_size: false });
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "solidcirclepreset");
        data.append("cloud_name","solidcircle1");
        axios.post(`${configs.cloudinary_image}`, data, config)
            .then(response => {
                this.setState({ profile_pic: response.data.url, profile_pic_uploading: false });
            })
            .catch(err => {
                this.setState({ profile_pic_uploading: false });
                console.log(err)
            })
    }       

    uploadProfileBanner = (files) => {
        let that = this;
        const config = {
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                that.setState({ profile_banner_progress: percentCompleted });
            }
        }
        this.setState({ profile_banner_uploading: true, profile_banner_size: false });
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "solidcirclepreset");
        data.append("cloud_name","solidcircle1");
        axios.post(`${configs.cloudinary_image}`, data, config)
            .then(response => {
                this.setState({ profile_banner: response.data.url, profile_banner_uploading: false });
            })
            .catch(err => {
                this.setState({ profile_banner_uploading: false });
                console.log(err)
            })
    }  

    uploadMobileBanner = (files) => {
        let that = this;
        const config = {
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                that.setState({ mobile_banner_progress: percentCompleted });
            }
        }
        this.setState({ mobile_banner_uploading: true, mobile_banner_size: false });
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "solidcirclepreset");
        data.append("cloud_name","solidcircle1");
        axios.post(`${configs.cloudinary_image}`, data, config)
            .then(response => {
                this.setState({ mobile_banner: response.data.url, mobile_banner_uploading: false });
            })
            .catch(err => {
                this.setState({ mobile_banner_uploading: false });
                console.log(err)
            })
    }  

    async getProfileById() {
        try {
            this.setState({ isLoading: true });
            const response = await axios.get(`${configs.prod}/api/user/${this.props.user.id}`);
            let { data } = response.data;
            this.setState({ 
                isLoading: false, username: data.username, profileURL: data.username || data.profile_url, profileBio: data.profile_bio || '', firstName: data.first_name, lastName: data.last_name, 
                instagramLink: data.instagram_link || '', facebookLink: data.facebook_link || '', twitterLink: data.twitter_link || '', discordLink: data.discord_link || '', youtubeLink: data.youtube_link || '',
                websiteLink: data.website_link || '', isProfilePublic: data.isProfilePublic, profile_banner: data.profile_banner, profile_pic: data.profile_pic, mobile_banner: data.mobile_banner, countryId: data.country
            })
        } catch (err) {
                console.log('Error: ', err.response);
                if (err.response && err.response.status && (err.response.status === 401 || err.response.status === 400 || err.response.status === 500)) {
                    this.setState({ isLoading: false, isValid: { value: true, text: err.response.data.msg } });
                    this.createNotification('error', err.response.data.msg);
                } else {
                    this.setState({ isLoading: false, isValid: { value: true, text: 'Unknown Error' } });
                    this.createNotification('error', 'Unknown Error');
                }
        }
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

    handleSelectChange(value, name) {
        this.setState({ [name]: value });
    }
    
    handleTextChange(event) {
        this.setState({ [event.name]: event.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let { firstName, lastName, countryId, profileBio, isProfilePublic, profile_pic, profile_banner, mobile_banner, instagramLink, facebookLink, twitterLink, discordLink, websiteLink, youtubeLink } = this.state;
    
        this.setState({ isLoading: true });
        axios.post(`${configs.prod}/api/user/update`, { 
                firstName: firstName.trim(), lastName: lastName.trim(), country: countryId, profile_pic, profile_banner, mobile_banner, youtube_link: youtubeLink,
                instagram_link: instagramLink, facebook_link: facebookLink, twitter_link: twitterLink, discord_link: discordLink, website_link: websiteLink,
                profile_bio: profileBio, isProfilePublic, id: this.props.user.id
            })
            .then(async response => {
                await localStorage.setItem('culture-dapp-token', response.data.token);
                await this.props.signIn(response.data.user);
                this.getProfileById();
                this.createNotification('success', 'Profile Updated Successfully');
            })
            .catch(err => {
                console.log('Error: ', err.response);
                if (err.response && err.response.status && (err.response.status === 401 || err.response.status === 400 || err.response.status === 500)) {
                    this.setState({ isLoading: false, isValid: { value: true, text: err.response.data.msg } });
                    this.createNotification('error', err.response.data.msg);
                } else {
                    this.setState({ isLoading: false, isValid: { value: true, text: 'Unknown Error' } });
                    this.createNotification('error', 'Unknown Error');
                }
            });
    }
    
    deleteFromImages() {
        this.setState({ files2: [], profile_pic: '' });
    }

    render() {
        
        const maxSize = 2242880;
        const maxSizeBanner = 3242880;

        return (
            <Aux>
                {this.state.isLoading && <Loader />}
                <Row>
                    <NotificationContainer />
                    <Col md={{ span: 8, offset: 2 }}>
                        <Form onSubmit={(e) => this.handleSubmit(e)}>
                            <fieldset disabled={this.state.isLoading} className={this.state.isLoading ? 'opacity-5' : ''}>
                                <Form.Row>
                                    <Col md={6} lg={6}>
                                        <h4>User Details</h4>
                                        <Form.Group className="mb-2" controlId="formBasicEmail">
                                            <Form.Label>Username* (Your artist display name)</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="username"
                                                placeholder={'Your artist display name'} 
                                                value={this.state.username}
                                                readOnly
                                                className={this.state.isValid.value && this.state.isValid.name === 'username' ? 'in-valid-input' : ''}
                                                onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                onChange={(e) => this.handleTextChange(e.target) }
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-2" controlId="formBasicEmail">
                                            <Form.Label>First Name (Optional)</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="firstName"
                                                placeholder={'First Name'} 
                                                value={this.state.firstName}
                                                className={this.state.isValid.value && this.state.isValid.name === 'firstName' ? 'in-valid-input' : ''}
                                                onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                onChange={(e) => this.handleTextChange(e.target) }
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-2" controlId="formBasicEmail">
                                            <Form.Label>Last Name (Optional)</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="lastName"
                                                placeholder={'Last Name'} 
                                                value={this.state.lastName}
                                                className={this.state.isValid.value && this.state.isValid.name === 'lastName' ? 'in-valid-input' : ''}
                                                onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                onChange={(e) => this.handleTextChange(e.target) }
                                            />
                                        </Form.Group>
                                        <Form.Row>
                                            <Col>
                                                <h4>Profile</h4>
                                                <Dropzone 
                                                    onDropAccepted={this.onDropPhoto2} 
                                                    onDropRejected={this.onDropPhoto2Rejected}
                                                    accept="image/*" 
                                                    minSize={0}
                                                    maxSize={maxSize}
                                                    multiple={false}
                                                >
                                                    {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
                                                        return (
                                                            <section>
                                                                <Row>
                                                                    <Col md={6} lg={6}>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', cursor:'pointer', alignItems: 'center', justifyContent:'center', borderWidth: 2, height: '15em', borderRadius: 2, textAlign: 'center', borderColor: '#eeeeee', borderStyle: 'dashed', backgroundColor: '#fafafa', color: '#bdbdbd' }} 
                                                                            {...getRootProps({className: 'dropzone',
                                                                                // onClick: event => event.stopPropagation()
                                                                            })}
                                                                        >
                                                                            <input {...getInputProps()} />
                                                                            {!isDragActive && !this.state.profile_pic && <p>Upload Profile picture</p>}
                                                                            {!isDragActive && !this.state.profile_pic && <p>(500x500 : Max 2mb)</p>}
                                                                            {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                                                            {isDragReject && "File type not accepted, sorry!"}
                                                                            { this.state.profile_pic_size && 
                                                                                <div className="text-danger mt-2">
                                                                                    File is too large. Max Size 2MB
                                                                                </div>
                                                                            }
                                                                            { !this.state.profile_pic_uploading && this.state.profile_pic &&  <div style={{ padding: 0, maxHeight: '15em', overflow: 'hidden' }}>
                                                                                    <div  className='wrap-p-image'>
                                                                                        <img 
                                                                                            alt='cover' 
                                                                                            style={{ width: '100%', height: '100%' }} 
                                                                                            src={this.state.profile_pic} 
                                                                                        />
                                                                                    </div>
                                                                                </div> 
                                                                            }
                                                                            { this.state.profile_pic_uploading ? <div style={{ width: '30%', position: 'absolute', padding: 14, backgroundColor: 'whitesmoke', borderRadius: 20 }}>
                                                                                <CircularProgressbar value={this.state.profile_pic_progress} text={`${this.state.profile_pic_progress}%`} /> 
                                                                                </div> : null 
                                                                            }
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={6} lg={6}>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', height: '15em', textAlign: 'center' }}>
                                                                            <h6>Upload 500 x 500 JPEG</h6>
                                                                            <p style={{ marginBottom: 0 }}>Please provide a high quality, high resolution image</p>
                                                                        
                                                                            <Form.Group className="mt-3" controlId="formBasicEmail" >
                                                                                <Button 
                                                                                    {...getRootProps({className: 'dropzone'})} 
                                                                                    className="submitTrack" 
                                                                                    variant="outline-primary"
                                                                                >Choose Image</Button>
                                                                            </Form.Group>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                {
                                                                    this.state.isValid.value && this.state.isValid.name === 'files2' ?
                                                                    <Form.Text style={{ color: 'red' }}>
                                                                        { this.state.isValid.text }
                                                                    </Form.Text> : ''
                                                                }
                                                            </section>
                                                        )}
                                                    }
                                                </Dropzone>
                                            </Col>
                                        </Form.Row>
                                   </Col>
                                    <Col md={6} lg={6}>
                                        <Form.Group className="mb-2" style={{ marginTop: '2rem' }} controlId="formBasicEmail">
                                            <Form.Label>Email Address*</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="email"
                                                readOnly
                                                placeholder={'email adress e.g, example@example.com'} 
                                                value={this.state.email}
                                                className={this.state.isValid.value && this.state.isValid.name === 'email' ? 'in-valid-input' : ''}
                                                onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                onChange={(e) => this.handleTextChange(e.target) }
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-2" controlId="formBasicEmail">
                                            <Form.Label>Country (Optional)</Form.Label>
                                            <Form.Control as="select" value={this.state.countryId} onChange={(e) => this.handleSelectChange(e.target.value,'countryId')}>
                                            {
                                                countries.countries.map(elem => <option value={elem.name} key={elem.code}>{elem.name}</option>)
                                            }
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col md={6} lg={6}>
                                        <Dropzone 
                                            onDropAccepted={this.onDropPhotoProfileBanner} 
                                            onDropRejected={this.onDropPhotoProfileBannerReject}
                                            accept="image/*" 
                                            minSize={0}
                                            maxSize={maxSizeBanner}
                                            multiple={false}
                                        >
                                            {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
                                                return (
                                                    <section>
                                                        <Row>
                                                            <Col className="mb-2 mt-2">
                                                                <div style={{ display: 'flex', flexDirection: 'column', cursor:'pointer', alignItems: 'center', justifyContent:'center', borderWidth: 2, height: '15em', borderRadius: 2, textAlign: 'center', borderColor: '#eeeeee', borderStyle: 'dashed', backgroundColor: '#fafafa', color: '#bdbdbd' }} 
                                                                    {...getRootProps({className: 'dropzone',
                                                                        // onClick: event => event.stopPropagation()
                                                                    })}
                                                                >
                                                                    <input {...getInputProps()} />
                                                                    {!isDragActive && !this.state.profile_banner && <p>Upload Profile Banner (1280x300 : Max 3mb)</p>}
                                                                    {!isDragActive && <Form.Group className="mt-3" controlId="formBasicEmail" >
                                                                        { !this.state.profile_banner && <Button 
                                                                                // {...getRootProps({className: 'dropzone'})} 
                                                                                className="submitTrack" 
                                                                                variant="outline-primary"
                                                                            >Choose Image</Button>
                                                                        }
                                                                    </Form.Group>}
                                                                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                                                    {isDragReject && "File type not accepted, sorry!"}
                                                                    {  this.state.profile_banner_size && (
                                                                        <div className="text-danger mt-2">
                                                                            File is too large. Max Size 2MB
                                                                        </div>
                                                                    )}
                                                                    { !this.state.profile_banner_uploading && this.state.profile_banner &&  <div style={{ padding: 0, maxHeight: '15em', overflow: 'hidden' }}>
                                                                            <div  className='wrap-p-image'>
                                                                                <img 
                                                                                    alt='cover' 
                                                                                    style={{ width: '100%', height: '100%' }} 
                                                                                    src={this.state.profile_banner} 
                                                                                />
                                                                                <Button 
                                                                                    size='sm'
                                                                                    style={{ width: 'fit-content'}} 
                                                                                    variant="primary"
                                                                                >Replace Image</Button>
                                                                            </div>
                                                                        </div> 
                                                                    }
                                                                    { this.state.profile_banner_uploading ? <div style={{ width: '30%', position: 'absolute', padding: 14, backgroundColor: 'whitesmoke', borderRadius: 20 }}>
                                                                        <CircularProgressbar value={this.state.profile_banner_progress} text={`${this.state.profile_banner_progress}%`} /> 
                                                                        </div> : null 
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        {
                                                            this.state.isValid.value && this.state.isValid.name === 'files2' ?
                                                            <Form.Text style={{ color: 'red' }}>
                                                                { this.state.isValid.text }
                                                            </Form.Text> : ''
                                                        }
                                                    </section>
                                                )}
                                            }
                                        </Dropzone>
                                    </Col>
                                    <Col md={6} lg={6}>
                                        <Dropzone 
                                            onDropAccepted={this.onDropPhotoMobileBanner} 
                                            onDropRejected={this.onDropPhotoMobileBannerReject}
                                            accept="image/*" 
                                            minSize={0}
                                            maxSize={maxSizeBanner}
                                            multiple={false}
                                        >
                                            {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
                                                return (
                                                    <section>
                                                        <Row>
                                                            <Col className="mb-2 mt-2">
                                                                <div style={{ display: 'flex', flexDirection: 'column', cursor:'pointer', alignItems: 'center', justifyContent:'center', borderWidth: 2, height: '15em', borderRadius: 2, textAlign: 'center', borderColor: '#eeeeee', borderStyle: 'dashed', backgroundColor: '#fafafa', color: '#bdbdbd' }} 
                                                                    {...getRootProps({className: 'dropzone',
                                                                        // onClick: event => event.stopPropagation()
                                                                    })}
                                                                >
                                                                    <input {...getInputProps()} />
                                                                    {!isDragActive && !this.state.mobile_banner && <p>Upload Mobile Banner (600x270 : Max 3mb)</p>}
                                                                    {!isDragActive && <Form.Group className="mt-3" controlId="formBasicEmail" >
                                                                        {   !this.state.mobile_banner && <Button 
                                                                                className="submitTrack" 
                                                                                variant="outline-primary"
                                                                            >Choose Image</Button>
                                                                        }
                                                                    </Form.Group>}
                                                                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                                                    {isDragReject && "File type not accepted, sorry!"}
                                                                    {this.state.mobile_banner_size && (
                                                                        <div className="text-danger mt-2">
                                                                            File is too large. Max Size 3MB
                                                                        </div>
                                                                    )}
                                                                    { !this.state.mobile_banner_uploading && this.state.mobile_banner &&  <div style={{ padding: 0, maxHeight: '15em', overflow: 'hidden' }}>
                                                                            <div  className='wrap-p-image'>
                                                                                <img 
                                                                                    alt='cover' 
                                                                                    style={{ width: '100%', height: '100%' }} 
                                                                                    src={this.state.mobile_banner} 
                                                                                />
                                                                                <Button 
                                                                                    size='sm'
                                                                                    style={{ width: 'fit-content'}} 
                                                                                    variant="primary"
                                                                                >Replace Image</Button>
                                                                            </div>
                                                                        </div> 
                                                                    }
                                                                    { this.state.mobile_banner_uploading ? <div style={{ width: '30%', position: 'absolute', padding: 14, backgroundColor: 'whitesmoke', borderRadius: 20 }}>
                                                                        <CircularProgressbar value={this.state.mobile_banner_progress} text={`${this.state.mobile_banner_progress}%`} /> 
                                                                        </div> : null 
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        {
                                                            this.state.isValid.value && this.state.isValid.name === 'filesMobileBanner' ?
                                                            <Form.Text style={{ color: 'red' }}>
                                                                { this.state.isValid.text }
                                                            </Form.Text> : ''
                                                        }
                                                    </section>
                                                )}
                                            }
                                        </Dropzone>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col md={6} lg={6}>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>Profile URL</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        name="profileURL"
                                                        readOnly
                                                        placeholder={'Profile URL'} 
                                                        value={this.state.profileURL}
                                                        className={this.state.isValid.value && this.state.isValid.name === 'profileURL' ? 'in-valid-input' : ''}
                                                        onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                        onChange={(e) => this.handleTextChange(e.target) }
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                    <Form.Check id={'isProfilePublic'} type="checkbox" checked={this.state.isProfilePublic} onChange={() => this.setState({ isProfilePublic: !this.state.isProfilePublic })}  label="Do you want your profile to be public?" />
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                    </Col>
                                    <Col md={6} lg={6}>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Profile Bio (Optional - 2048 characters max)</Form.Label>
                                                    <Form.Control 
                                                        as="textarea" 
                                                        rows="3" 
                                                        name="profileBio" 
                                                        placeholder="Profile Bio"
                                                        value={this.state.profileBio}
                                                        onChange={(e) => this.handleTextChange(e.target) }
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col md={6} lg={6}>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>Instagram Link</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        name="instagramLink"
                                                        placeholder={'Instagram Link'} 
                                                        value={this.state.instagramLink}
                                                        className={this.state.isValid.value && this.state.isValid.name === 'instagramLink' ? 'in-valid-input' : ''}
                                                        onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                        onChange={(e) => this.handleTextChange(e.target) }
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                    </Col>
                                    <Col md={6} lg={6}>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>Facebook Link</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        name="facebookLink"
                                                        placeholder={'Facebook Link'} 
                                                        value={this.state.facebookLink}
                                                        className={this.state.isValid.value && this.state.isValid.name === 'facebookLink' ? 'in-valid-input' : ''}
                                                        onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                        onChange={(e) => this.handleTextChange(e.target) }
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col md={6} lg={6}>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>Twitter Link</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        name="twitterLink"
                                                        placeholder={'Twitter Link'} 
                                                        value={this.state.twitterLink}
                                                        className={this.state.isValid.value && this.state.isValid.name === 'twitterLink' ? 'in-valid-input' : ''}
                                                        onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                        onChange={(e) => this.handleTextChange(e.target) }
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                    </Col>
                                    <Col md={6} lg={6}>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>Discord Link</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        name="discordLink"
                                                        placeholder={'Discord Link'} 
                                                        value={this.state.discordLink}
                                                        className={this.state.isValid.value && this.state.isValid.name === 'discordLink' ? 'in-valid-input' : ''}
                                                        onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                        onChange={(e) => this.handleTextChange(e.target) }
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col md={6} lg={6}>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>Youtube Link</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        name="youtubeLink"
                                                        placeholder={'Youtube Link'} 
                                                        value={this.state.youtubeLink}
                                                        className={this.state.isValid.value && this.state.isValid.name === 'youtubeLink' ? 'in-valid-input' : ''}
                                                        onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                        onChange={(e) => this.handleTextChange(e.target) }
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                    </Col>
                                    <Col md={6} lg={6}>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>Website Link</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        name="websiteLink"
                                                        placeholder={'Website Link'} 
                                                        value={this.state.websiteLink}
                                                        className={this.state.isValid.value && this.state.isValid.name === 'websiteLink' ? 'in-valid-input' : ''}
                                                        onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                        onChange={(e) => this.handleTextChange(e.target) }
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Button className="submitTrack" variant="primary" onClick={(e) => this.handleSubmit(e)}>Update Profile</Button>
                                    </Col>
                                </Form.Row>
                            </fieldset>
                        </Form>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userDetails.user
    }
}

export default connect(mapStateToProps, actions)(EditProfile);
