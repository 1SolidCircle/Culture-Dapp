import React from 'react';
import { Row, Col, Card, Button, Tabs, Tab, Form } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Loader from '../../App/layout/Loader';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import configs from '../../config';

class EditTrack extends React.Component {
    
    constructor(props) {
        super(props);
        this.onDropPhoto = (files) => {
            this.uploadTrack(files)
        };
        this.onDropPhoto2 = (files) => {
            this.uploadImage(files)
        };
        this.onDropPhoto2Rejected = (val) => {
            val.forEach(elem => {
                if (elem.errors.some(x => x.code == 'file-too-large')) {
                    this.setState({ track_pic_size: true });
                }
            });
        }
        this.state = {
            isLoading: false,
            isValid: {
                value: false,
                text: '',
                name: ''
            },
            selectedTab: 'tracks',
            isMobile: false,
            search: '',
            artist: '',
            artistOwnership: 100,
            artistRoleId: 1,
            artistRoles: [
                { id: 1, role: 'original collaborator' },
                { id: 2, role: 'remixer' },
                { id: 3, role: 'feature' },
                { id: 4, role: 'silent collaborator/rights holder' }
            ],
            agreement: '100% Sole Ownership',
            trackDisplayName: '',
            trackURL: '',
            trackDiscription: '',
            isrc: '',
            files: [],
            files2: [],
            track_pic: '',
            track_pic_progress: 0,
            track_pic_size: false,
            track_pic_uploading: false,

            track: '',
            track_progress: 0,
            track_uploading: false,

            filesProgress: 0,
            chill: false,
            focus: false,
            justListen: false,
            hyped: false,
            heavy: false,
            soulful: false,
            eclectic: false,
            electronic: false,
            ambient: false,
            pop: false,
            hipHop: false,
            punk: false,
            rock: false,
            soundDesign: false,
            film: false,
            legal: false,
            monetise: true,
            listOnProfile: false,
            track_id: ''
        }
    }

    componentDidMount() {
        this.setState({ isMobile:  window.innerWidth < 768, artist: this.props.user.username });
        let that = this;
        if (this.props && this.props.match && this.props.match.params && this.props.match.params.id) {
            this.setState({ track_id: this.props.match.params.id });
            this.getTrackById(this.props.match.params.id);
        } else {
            this.props.history.push('/profile');
        }
        window.addEventListener('resize', () => {
            that.setState({ isMobile: window.innerWidth < 768 });
        });
    }
    
    getTrackById(id) {
        this.setState({ isLoading: true });
		axios.get(`${configs.prod}/api/track/${id}/specific`)
			.then(response => {
                let data = response.data.data;
                if (data.user_id != this.props.user.id) {
                    this.props.history.push('/profile');
                } else {
                    let objToUpdate = {
                        artist: data.artist, artistOwnership: data.artist_ownership, artistRoleId: data.artist_role, agreement: data.agreement, 
                        legal: data.legal, trackDiscription: data.track_discription, trackURL: data.track_url, isrc: data.isrc, monetise: data.monetise, 
                        listOnProfile: data.list_on_profile, track: data.track, track_pic: data.track_pic, trackDisplayName: data.track_display_name,
                        isLoading: false
                    };
                    JSON.parse(data.vibes).forEach(elem => {
                        objToUpdate[elem] = true;
                    });
                    JSON.parse(data.tags).forEach(elem => {
                        objToUpdate[elem] = true
                    });
                    this.setState(objToUpdate);
                }
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

    handleSelectChange(value, name) {
        this.setState({ [name]: value });
    }
    
    handleTextChange(event) {
        this.setState({ [event.name]: event.value });
    }
   
    uploadImage = (files) => {
        let that = this;
        const config = {
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                that.setState({ track_pic_progress: percentCompleted });
            }
        }
        this.setState({ track_pic_uploading: true, track_pic_size: false });
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "solidcirclepreset");
        data.append("cloud_name","solidcircle1");
        axios.post(`${configs.cloudinary_image}`, data, config)
            .then(response => {
                this.setState({ track_pic: response.data.url, track_pic_uploading: false });
            })
            .catch(err => {
                this.setState({ track_pic_uploading: false });
                console.log(err)
            })
    }

    uploadTrack = (files) => {
        let that = this;
        const config = {
            onUploadProgress: function(progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                that.setState({ track_progress: percentCompleted });
            }
        }
        this.setState({ track_uploading: true });
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "solidcirclepreset");
        data.append("cloud_name","solidcircle1");
        axios.post(`${configs.cloudinary_file}`, data, config)
            .then(response => {
                this.setState({ track: response.data.url, track_uploading: false });
            })
            .catch(err => {
                this.setState({ track_uploading: false });
                console.log(err)
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        let { artist, artistOwnership, artistRoleId, agreement, chill, focus, justListen, hyped, heavy, soulful, eclectic, electronic, track_id,
            ambient, pop, hipHop, punk, rock, soundDesign, film, legal, trackDisplayName, trackDiscription, trackURL, isrc, monetise, listOnProfile, track, track_pic
        } = this.state;
        
        if (!track) {
            this.setState({ isValid: { value: true, text: 'This is required', name:'track' } });
            return;
        }

        if (!track_pic) {
            this.setState({ isValid: { value: true, text: 'This is required', name:'track_pic' } });
            return;
        }
 
        if (!artist && artist.trim().length === 0) {
            this.setState({ isValid: { value: true, text: 'Artist Name is required', name:'artist' } });
            return;
        }

        if (!artistOwnership && (artistOwnership < 0 || artistOwnership > 100)) {
            this.setState({ isValid: { value: true, text: 'Artist Ownership is required', name:'artistOwnership' } });
            return;
        }

        if (!artistRoleId && artistRoleId.trim().length === 0) {
            this.setState({ isValid: { value: true, text: 'Artist Role is reqquired', name:'artistRole' } });
            return;
        }

        if (!agreement && agreement.trim().length === 0) {
            this.setState({ isValid: { value: true, text: 'Agreement is required', name:'agreement' } });
            return;
        }
        
        if (!trackDisplayName && trackDisplayName.trim().length === 0) {
            this.setState({ isValid: { value: true, text: 'Track Name is required.', name:'trackDisplayName' } });
            return;
        }

        if (!trackURL && trackURL.trim().length === 0) {
            this.setState({ isValid: { value: true, text: 'Track URL is required.', name:'trackURL' } });
            return;
        }

        if (!legal) {
            this.setState({ isValid: { value: true, text: 'You must agree to the terms & conditions before proceeding.', name:'legal' } });
            return;
        }
        
        let vibes = [];
        if (chill) { vibes.push('chill') }
        if (focus) { vibes.push('focus') }
        if (justListen) { vibes.push('justListen') }
        if (hyped) { vibes.push('hyped') }
        if (heavy) { vibes.push('heavy') }

        let tags = [];
        if (soulful) { tags.push('soulful') }
        if (eclectic) { tags.push('eclectic') }
        if (electronic) { tags.push('electronic') }
        if (ambient) { tags.push('ambient') }
        if (pop) { tags.push('pop') }
        if (hipHop) { tags.push('hipHop') }
        if (punk) { tags.push('punk') }
        if (rock) { tags.push('rock') }
        if (soundDesign) { tags.push('soundDesign') }
        if (film) { tags.push('film') }
        this.setState({ isLoading: true });
        axios.post(`${configs.prod}/api/track/update`, { 
            vibes: vibes, tags: tags, artist: artist.trim(), artist_ownership: artistOwnership, artist_role: artistRoleId, isrc: isrc, monetise: monetise, 
            agreement: agreement.trim(), legal: legal, track_display_name: trackDisplayName, track_url: trackURL, track_discription: trackDiscription,
            list_on_profile: listOnProfile, track: track, track_pic: track_pic, user_id: this.props.user.id, track_id: track_id 
        })
            .then(response => {
                this.setState({ name: '', isLoading: false });
                this.createNotification('success', 'TracK Created Successfully');
                this.props.history.push('/profile');
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
    
    deleteFromImages(val) {
        let images = [...this.state.files2];
        images.splice(val, 1);
        this.setState({ files2: images });
    }

    render() {
    
        const maxSize = 2242880;

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
                                        <Dropzone 
                                            onDropAccepted={this.onDropPhoto} 
                                            accept="audio/mpeg"
                                            minSize={0}
                                            multiple={false}
                                        >
                                            {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
                                                // const isFileTooLarge = rejectedFiles && rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                                                return (
                                                    <section>
                                                        <div style={{ display: 'flex', cursor:'pointer', alignItems: 'center', justifyContent:'center', borderWidth: 2, height: '5em', borderRadius: 2, textAlign: 'center', borderColor: '#eeeeee', borderStyle: 'dashed', backgroundColor: '#fafafa', color: '#bdbdbd' }} 
                                                        {...getRootProps({className: 'dropzone',
                                                            // onClick: event => event.stopPropagation()
                                                        })}
                                                        >
                                                            <input {...getInputProps()} />
                                                            {!isDragActive && !this.state.track && 'Drag & Drop your Track or Browse'}
                                                            {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                                            {isDragReject && "File type not accepted, sorry!"}
                                                            {/* {isFileTooLarge && (
                                                                <div className="text-danger mt-2">
                                                                    File is too large. Max Size 1GB
                                                                </div>
                                                            )} */}
                                                            { !this.state.track_uploading && this.state.track && 'Upload complete, click to replace track' }
                                                            { this.state.track_uploading ? <div style={{ width: '15%', position: 'absolute', padding: 14, backgroundColor: 'whitesmoke', borderRadius: 20 }}>
                                                                <CircularProgressbar value={this.state.track_progress} text={`${this.state.track_progress}%`} /> 
                                                                </div> : null 
                                                            }
                                                        </div>
                                                        {
                                                            this.state.isValid.value && this.state.isValid.name === 'track' ?
                                                            <Form.Text style={{ color: 'red' }}>
                                                                { this.state.isValid.text }
                                                            </Form.Text> : ''
                                                        }
                                                    
                                                        <Form.Group className="mb-2 mt-2" controlId="formBasicEmail" >
                                                            <Button 
                                                                {...getRootProps({className: 'dropzone'})} 
                                                                className="submitTrack" 
                                                                variant="outline-primary"
                                                            > Upload Audio</Button>
                                                        </Form.Group>
                                                    </section>
                                                )}
                                            }
                                        </Dropzone>
                                        <h4>Artist Detail</h4>
                                        <Form.Group className="mb-2" controlId="formBasicEmail">
                                            <Form.Label>Add any affiliated artists</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="search" 
                                                placeholder={'Search for an artist...'} 
                                                value={this.state.search}
                                                className={this.state.isValid.value && this.state.isValid.name === 'search' ? 'in-valid-input' : ''}
                                                onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                onChange={(e) => this.handleTextChange(e.target) }
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-2" controlId="formBasicEmail">
                                            <Form.Label>Artist #1: {this.props.user.username}</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="artist" 
                                                readOnly
                                                value={this.state.artist}
                                                className={this.state.isValid.value && this.state.isValid.name === 'artist' ? 'in-valid-input' : ''}
                                                onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                onChange={(e) => this.handleTextChange(e.target) }
                                            />
                                            {
                                                this.state.isValid.value && this.state.isValid.name === 'artist' ?
                                                <Form.Text style={{ color: 'red' }}>
                                                    { this.state.isValid.text }
                                                </Form.Text> : ''
                                            }
                                        </Form.Group>
                                        <Form.Row>
                                            <Col md={6} lg={6}>
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>{`${this.props.user.username}'s Ownership %*`}</Form.Label>
                                                    <Form.Control 
                                                        type="number" 
                                                        name="artistOwnership"
                                                        min={1}
                                                        max={100}
                                                        value={this.state.artistOwnership}
                                                        className={this.state.isValid.value && this.state.isValid.name === 'artistOwnership' ? 'in-valid-input' : ''}
                                                        onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                        onChange={(e) => this.handleTextChange(e.target) }
                                                    />
                                                    {
                                                        this.state.isValid.value && this.state.isValid.name === 'artistOwnership' ?
                                                        <Form.Text style={{ color: 'red' }}>
                                                            { this.state.isValid.text }
                                                        </Form.Text> : ''
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} lg={6}>
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>{`${this.props.user.username}'s Role*`}</Form.Label>
                                                    <Form.Control as="select" value={this.state.artistRoleId} onChange={(e) => this.handleSelectChange(e.target.value,'artistRoleId')}>
                                                    {
                                                        this.state.artistRoles.map(elem => <option value={elem.id} key={elem.id}>{elem.role}</option>)
                                                    }
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <h4>Artist Terms</h4>
                                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                                    <Form.Label>Agreement*</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        name="agreement" 
                                                        value={this.state.agreement}
                                                        placeholder={'Breifly explain the agreement'}
                                                        className={this.state.isValid.value && this.state.isValid.name === 'agreement' ? 'in-valid-input' : ''}
                                                        onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                        onChange={(e) => this.handleTextChange(e.target) }
                                                    />
                                                    {
                                                        this.state.isValid.value && this.state.isValid.name === 'agreement' ?
                                                        <Form.Text style={{ color: 'red' }}>
                                                            { this.state.isValid.text }
                                                        </Form.Text> : ''
                                                    }
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <h4>Track Categories</h4>
                                                <p>This will help listeners discover your music...</p>
                                                <h4>Vibe</h4>
                                                <Form.Group className="mb-3">
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Check id={'chill'} inline type="checkbox" checked={this.state.chill} onChange={() => this.setState({ chill: !this.state.chill })}  label="Chill" />                                                            
                                                        </Col>
                                                        <Col>
                                                            <Form.Check id={'focus'} inline type="checkbox" checked={this.state.focus} onChange={() => this.setState({ focus: !this.state.focus })}  label="Focus" />                                                            
                                                        </Col>
                                                        <Col>
                                                            <Form.Check id={'justListen'} inline type="checkbox" checked={this.state.justListen} onChange={() => this.setState({ justListen: !this.state.justListen })}  label="Just Listen" />                                                            
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Check id={'hyped'} inline type="checkbox" checked={this.state.hyped} onChange={() => this.setState({ hyped: !this.state.hyped })}  label="Hyped" />                                                            
                                                        </Col>
                                                        <Col>
                                                            <Form.Check id={'heavy'} inline type="checkbox" checked={this.state.heavy} onChange={() => this.setState({ heavy: !this.state.heavy })}  label="Heavy" />                                                            
                                                        </Col>
                                                        <Col></Col>
                                                    </Form.Row>
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <h4>Tags</h4>
                                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Check id={'soulful'} inline type="checkbox" checked={this.state.soulful} onChange={() => this.setState({ soulful: !this.state.soulful })} label="Soulful" />                                                            
                                                        </Col>
                                                        <Col>
                                                            <Form.Check id={'eclectic'} inline type="checkbox" checked={this.state.eclectic} onChange={() => this.setState({ eclectic: !this.state.eclectic })}  label="Eclectic" />                                                            
                                                        </Col>
                                                        <Col>
                                                            <Form.Check id={'electronic'} inline type="checkbox" checked={this.state.electronic} onChange={() => this.setState({ electronic: !this.state.electronic })}  label="Electronic" />                                                            
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Check id={'ambient'} inline type="checkbox" checked={this.state.ambient} onChange={() => this.setState({ ambient: !this.state.ambient })}  label="Ambient" />                                                            
                                                        </Col>
                                                        <Col>
                                                            <Form.Check id={'pop'} inline type="checkbox" checked={this.state.pop} onChange={() => this.setState({ pop: !this.state.pop })}  label="Pop" />                                                            
                                                        </Col>
                                                        <Col>
                                                            <Form.Check id={'hiphop'} inline type="checkbox" checked={this.state.hipHop} onChange={() => this.setState({ hipHop: !this.state.hipHop })}  label="Hip Hop/Rnb" />                                                            
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Check id={'punk'} inline type="checkbox" checked={this.state.punk} onChange={() => this.setState({ punk: !this.state.punk })}  label="Punk/Metal" />                                                            
                                                        </Col>
                                                        <Col>
                                                            <Form.Check id={'rock'} inline type="checkbox" checked={this.state.rock} onChange={() => this.setState({ rock: !this.state.rock })}  label="Rock" />                                                            
                                                        </Col>
                                                        <Col>
                                                            <Form.Check id={'soundDesign'} inline type="checkbox" checked={this.state.soundDesign} onChange={() => this.setState({ soundDesign: !this.state.soundDesign })}  label="Sound Design" />                                                            
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Check id={'film'} inline type="checkbox" checked={this.state.film} onChange={() => this.setState({ film: !this.state.film })}  label="Film" />
                                                        </Col>
                                                    </Form.Row>
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                    </Col>
                                    <Col md={6} lg={6}>
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
                                                            <Col md={6} lg={6}>
                                                                <div style={{ display: 'flex', cursor:'pointer', alignItems: 'center', justifyContent:'center', borderWidth: 2, height: '15em', borderRadius: 2, textAlign: 'center', borderColor: '#eeeeee', borderStyle: 'dashed', backgroundColor: '#fafafa', color: '#bdbdbd' }} 
                                                                    {...getRootProps({className: 'dropzone',
                                                                        // onClick: event => event.stopPropagation()
                                                                    })}
                                                                >
                                                                    <input {...getInputProps()} />
                                                                    {!isDragActive && !this.state.track_pic && 'Drag & Drop your image or Browse'}
                                                                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                                                    {isDragReject && "File type not accepted, sorry!"}
                                                                    { this.state.track_pic_size && (
                                                                        <div className="text-danger mt-2">
                                                                            File is too large. Max Size 2MB
                                                                        </div>
                                                                    )}
                                                                    { !this.state.track_pic_uploading && this.state.track_pic &&  <div style={{ padding: 0, maxHeight: '15em', overflow: 'hidden' }}>
                                                                            <div  className='wrap-p-image'>
                                                                                <img 
                                                                                    alt='cover' 
                                                                                    style={{ width: '100%', height: '100%' }} 
                                                                                    src={this.state.track_pic} 
                                                                                />
                                                                            </div>
                                                                        </div> 
                                                                    }
                                                                    { this.state.track_pic_uploading ? <div style={{ width: '30%', position: 'absolute', padding: 14, backgroundColor: 'whitesmoke', borderRadius: 20 }}>
                                                                        <CircularProgressbar value={this.state.track_pic_progress} text={`${this.state.track_pic_progress}%`} /> 
                                                                        </div> : null 
                                                                    }
                                                                </div>
                                                            </Col>
                                                            <Col md={6} lg={6}>
                                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', height: '15em', textAlign: 'center' }}>
                                                                    <h6>Upload Track/Release Artwork</h6>
                                                                    <p style={{ marginBottom: 0 }}>Please provide a high quality image</p>
                                                                    <p>(Recommended 500x500 : Max 2mb)</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        {
                                                            this.state.isValid.value && this.state.isValid.name === 'track_pic' ?
                                                            <Form.Text style={{ color: 'red' }}>
                                                                { this.state.isValid.text }
                                                            </Form.Text> : ''
                                                        }
                                                        <Form.Group className="mb-2 mt-2" controlId="formBasicEmail" >
                                                            <Button 
                                                                {...getRootProps({className: 'dropzone'})} 
                                                                className="submitTrack" 
                                                                variant="outline-primary"
                                                            > Upload Artwork</Button>
                                                        </Form.Group>
                                                    </section>
                                                )}
                                            }
                                        </Dropzone>
                                       <Form.Group className="mb-2" controlId="formBasicEmail">
                                            <Form.Label>Track Display Name*</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="trackDisplayName" 
                                                placeholder={'Track Display Name'} 
                                                value={this.state.trackDisplayName}
                                                className={this.state.isValid.value && this.state.isValid.name === 'trackDisplayName' ? 'in-valid-input' : ''}
                                                onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                onChange={(e) => this.handleTextChange(e.target) }
                                            />
                                            {
                                                this.state.isValid.value && this.state.isValid.name === 'trackDisplayName' ?
                                                <Form.Text style={{ color: 'red' }}>
                                                    { this.state.isValid.text }
                                                </Form.Text> : ''
                                            }
                                        </Form.Group>
                                        <Form.Group className="mb-2" controlId="formBasicEmail">
                                            <Form.Label>Track URL*</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="trackURL" 
                                                placeholder={'custom-track-url'} 
                                                value={this.state.trackURL}
                                                className={this.state.isValid.value && this.state.isValid.name === 'trackURL' ? 'in-valid-input' : ''}
                                                onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                onChange={(e) => this.handleTextChange(e.target) }
                                            />
                                            {
                                                this.state.isValid.value && this.state.isValid.name === 'trackURL' ?
                                                <Form.Text style={{ color: 'red' }}>
                                                    { this.state.isValid.text }
                                                </Form.Text> : ''
                                            }
                                        </Form.Group>
                                        <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Track Discription</Form.Label>
                                            <Form.Control 
                                                as="textarea" 
                                                rows="3" 
                                                name="trackDiscription" 
                                                placeholder="Track Discription (Optional)"
                                                value={this.state.trackDiscription}
                                                onChange={(e) => this.handleTextChange(e.target) }
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-2" controlId="formBasicEmail">
                                            <Form.Label>International Standard Recording Code (ISRC) (Optional)</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="isrc" 
                                                placeholder={'E.g. US-XX1-20-00001, AU-XX2-18-00004'} 
                                                value={this.state.isrc}
                                                className={this.state.isValid.value && this.state.isValid.name === 'isrc' ? 'in-valid-input' : ''}
                                                onFocus={() => this.setState({ isValid: { value: false, text: ''}})}
                                                onChange={(e) => this.handleTextChange(e.target) }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col md={6} lg={6}>
                                        <Form.Row>
                                            <Col>
                                                <h4>Legal</h4>
                                                <p>I understand that all audio submissions are reviewed both manually and by 3rd party systems. By uploading audio you accept the Culture Dapp terms of service and also accept responsibility for the outcome of any fraudulent attempts to monetise audio that is not yours. Only proceed if you own all rights to the music or have been given authorisation to upload on behalf of another artist.</p>
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                    <Form.Check id={'legal'} type="checkbox" checked={this.state.legal} onChange={() => this.setState({ legal: !this.state.legal, isValid: { value: false, text: '', name: '' } })}  label="I understand and accept that any fraudulent upload and any form of play manipulation may result in a payment freeze, blacklisting at the cash out stage or complete platform ban." />
                                                </Form.Group>
                                                {
                                                    this.state.isValid.value && this.state.isValid.name === 'legal' ?
                                                    <Form.Text style={{ color: 'red' }}>
                                                        { this.state.isValid.text }
                                                    </Form.Text> : ''
                                                }
                                            </Col>
                                        </Form.Row>
                                    </Col>
                                    <Col md={6} lg={6}>
                                        <Form.Row>
                                            <Col>
                                                <h4>Monetisation</h4>
                                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                    <Form.Check id={'monetise'} type="checkbox" checked={this.state.monetise} onChange={() => this.setState({ monetise: !this.state.monetise })}  label="I would like to monetise this track." />
                                                </Form.Group>
                                                <p>Note: There may be a 1-2 day review period before your track is monetised.</p>
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                    <Form.Check id={'listOnProfile'} type="checkbox" checked={this.state.listOnProfile} onChange={() => this.setState({ listOnProfile: !this.state.listOnProfile })}  label="Do not list this track on my profile for now" />
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Button className="submitTrack" variant="primary" onClick={(e) => this.handleSubmit(e)}>Update Track</Button>
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

export default connect(mapStateToProps, null)(EditTrack);
