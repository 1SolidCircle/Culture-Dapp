import React from 'react';
import { Row, Col, Card, Button, Tabs, Tab, Modal } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Loader from '../../App/layout/Loader';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import axios from 'axios';
import config from '../../config';

class Dashboard extends React.Component {
    
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
            posts: [],
            data: [],
            columns: [
				{
					Header: "Status",
					accessor: 'status',
                    Cell: row => <p className="cell-custom">{ row.value }</p>
                }, 
                {
					Header: 'Track Title',
					accessor: 'track_display_name',
                    Cell: row => <p className="cell-custom">{ row.value }</p>
                },
                {
					Header: 'Author',
					accessor: 'artist',
                    Cell: row => <p className="cell-custom">{ row.value }</p>
                },
                {
					Header: "Release Title",
					accessor: 'release_title',
                    Cell: row => <p className="cell-custom">{ row.value }</p>
                },
                {
					Header: "Track URL",
					accessor: 'track_url',
                    Cell: row => <p className="cell-custom">{ row.value }</p>
                },
				{
                    Header: 'Actions',
                    Cell: row => (
                        <div className="action-btn cell-custom">
                            <Button  variant="warning" href={`/user/track/${row.original.id}/edit`} onClick={(e) => {e.preventDefault(); this.props.history.push(`/user/track/${row.original.id}/edit`)}}>Edit</Button>
                            <Button  variant="danger" onClick={() => this.openDeleteModal(row.original)}>Delete</Button>
                        </div>
                    )
                }
			],
        }
    }

    componentDidMount() {
        this.setState({ isMobile:  window.innerWidth < 768 });
        this.getTrackList();
        let that = this;
        window.addEventListener('resize', () => {
            that.setState({ isMobile: window.innerWidth < 768 });
        });
    }

    openDeleteModal(value) {
		this.setState({ name: `${value.track_display_anme}`, showModal: true, deletedRowId: value.id });
    }

    getTrackList() {
        this.setState({ isLoading: true });
		axios.get(`${config.prod}/api/track/${this.props.user.id}/list`)
			.then(response => {
				this.setState({ data: response.data.data, isLoading: false });
			})
			.catch(err => {
				this.setState({ isLoading: false });
				console.log('Error: getting data from db ', err.response);
                this.createNotification('error', 'Error while Getting data from db');
			});
    }
    
    getPostsList() {
        this.setState({ isLoading: true });
		axios.get(`${config.prod}/api/post/${this.props.user.id}/list`)
			.then(response => {
				this.setState({ posts: response.data.data, isLoading: false });
			})
			.catch(err => {
				this.setState({ isLoading: false });
				console.log('Error: getting posts data from db ', err.response);
                this.createNotification('error', 'Error while Getting data from db');
			});
    }

    handleDelete() {
        this.setState({ showModal: false, isLoading: true });
		axios.delete(`${config.prod}/api/track/delete`, { data: { id: this.state.deletedRowId } })
			.then(response => {
				this.createNotification('success', 'Track Deleted Successfully');
				this.getTrackList();
			})
			.catch(err => {
				this.setState({ isLoading: false, name: '' });
				console.log('Error: deleting data from db ', err.response);
                this.createNotification('error', 'Error while deleting data from db');
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
        return (
            <Aux>
                {this.state.isLoading && <Loader />}
                <Row>
                    {this.state.showModal && 
                        <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                            <Modal.Header closeButton>
                                <Modal.Title as="h5">Confirm Delete</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete {`${this.state.name}`}</Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => this.handleDelete()}>
                                    OK
                                </Button>
                                <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
                                    Cancel
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    }
                    <NotificationContainer />
                    <Col md={{ span: 8, offset: 2 }}>
                        <div className='profileContainer'>
                            <Row>
                                <Col xs={5} md={4} lg={3}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div className="avatarContainer">
                                            <div className="avatarSubContainer">
                                                <img className="avatarImg" src={this.props.user.profile_pic ? this.props.user.profile_pic : "https://www.w3schools.com/howto/img_avatar.png"} alt="Avatar" />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={7} md={8} lg={9}>
                                    <Row className='mt-3'>
                                        <h3 className="username"> {this.props.user.username} </h3>
                                        <Button variant="light" size='sm' onClick={(e) => this.props.history.push('/profile/edit')} className='ml-3 editProfileBtn'>Edit Profile</Button>
                                    </Row>
                                    {   !this.state.isMobile && <Row className='mt-3'>
                                            <ul className='statsContainer'>
                                                <li>
                                                    <span>
                                                        <span className='num'>5</span>
                                                        posts
                                                    </span>
                                                </li>
                                                <li className='ml-4'>
                                                    <span>
                                                        <span className='num'>195</span>
                                                        followers
                                                    </span>
                                                </li>
                                                <li className='ml-4'>
                                                    <span>
                                                        <span className="num">252</span>
                                                        following
                                                    </span>
                                                </li>
                                            </ul>
                                        </Row> }
                                    { !this.state.isMobile && <Row className='userDetails'>
                                            <Col>
                                                <h4>{`${this.props.user.firstName} ${this.props.user.lastName}`}</h4>
                                                <span>{`${this.props.user.profile_bio}`}</span>
                                            </Col>
                                        </Row>
                                    }
                                </Col>
                            </Row>
                            { this.state.isMobile && <Row className='userDetails mt-3'>
                                    <Col>
                                        <h4>{`${this.props.user.firstName} ${this.props.user.lastName}`}</h4>
                                        <span>{`${this.props.user.profile_bio}`}</span>
                                    </Col>
                                </Row>
                            }
                            {   this.state.isMobile && <Row className={this.state.isMobile ? 'mt-5' : '' }>
                                <Col>
                                    <ul className='statsContainer'>
                                        <li>
                                            <span>
                                                <span className='num'>5</span>
                                                posts
                                            </span>
                                        </li>
                                        <li className='ml-4'>
                                            <span>
                                                <span className='num'>195</span>
                                                followers
                                            </span>
                                        </li>
                                        <li className='ml-4'>
                                            <span>
                                                <span className="num">252</span>
                                                following
                                            </span>
                                        </li>
                                    </ul>
                                </Col>
                            </Row> }
                            <Row className={this.state.isMobile ? '' : 'mt-5' }>
                                <Col className='customTabContainer'>
                                    <Tabs
                                        defaultActiveKey="profile"
                                        id="controlled-tab-example"
                                        activeKey={this.state.selectedTab}
                                        onSelect={(k) => { this.setState({ selectedTab: k }); if (k == "tracks") { this.getTrackList(); } else { this.getPostsList(); }} }
                                        className="mb-3 customTabs">
                                        <Tab tabClassName='customTab' eventKey="tracks" title={<span><i className="feather icon-aperture"></i>TRACKS</span>}>
                                            <Row>
                                                <Col>
                                                    <h3 style={{ fontWeight: 'bold' }}>My Tracks<span style={{ float: 'right' }}> <Button variant="primary" onClick={(e) => this.props.history.push('/user/track/add') } size='sm'>Add New</Button> </span></h3>
                                                    <ReactTable 
                                                        // style={{ background: '#3f4d67', color: '#d3d5db' }}
                                                        data={this.state.data}
                                                        columns={this.state.columns}
                                                        noDataText={"no Data Text"}
                                                        minRows={10}
                                                        minWidth={1500}
                                                        loading={this.state.isLoading || false }
                                                        loadingText={'Loading...'}
                                                        defaultSorted={this.props.defaultSorted || [{ id: null, desc: true}]}
                                                        showFilters={true}
                                                        className='react-table -striped -highlight'
                                                    />
                                                </Col>
                                            </Row>
                                        </Tab>
                                        <Tab tabClassName='customTab' eventKey="releases" title={<span><i className="feather icon-box" />POSTS</span>}>
                                            <Row>
                                                {
                                                    this.state.posts.map((item, index) => (
                                                        <Col key={`posts-${index}`} className="mb-3" md={4}>
                                                            <div className={'postPhotoContainer'}>
                                                                <div className="postPhotoSubContainer">
                                                                    <img className='postPhotoImg' src={item.pic_url}/>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Col>
                            </Row>
                        </div>
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

export default connect(mapStateToProps, null)(Dashboard);
