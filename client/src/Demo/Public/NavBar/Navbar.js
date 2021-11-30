import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 
import * as actions from '../../../store/actions/userActions';
import i18next from 'i18next';

const NavBar = (props) => {

    const [countries, setCountries] = useState([
        { name: 'Arabic', alais: 'arb', flag: 'Arabic' },
        { name: 'English', alais: 'en', flag: 'English' },
        { name: 'French', alais: 'fr', flag: 'French' }
    ]);
    const [country, setCountry] = useState({ name: 'English', alais: 'en', flag: 'English' })

    const gotoRoute = (e, endpoint) => {
        e.preventDefault();
        props.history.push(endpoint);
    }

    useEffect(() => {
        let lang = localStorage.getItem('i18nextLng');
        if (lang) {
            let find = countries.find(x => x.alais == lang);
            i18next.changeLanguage(lang);
            setCountry(find);
        }
      }, [])

    const logout = async (e) => {
        e.preventDefault();
        await localStorage.removeItem('culture-dapp-token');
        await props.signOut(); 
    }

    const languageChange = (e, country) => {
        e.preventDefault();
        setCountry(country);
        i18next.changeLanguage(country.alais);
        localStorage.setItem("i18nextLng", country.alais);
        window.location.href = props.location.pathname;
    }

    return (
        <Navbar collapseOnSelect expand="lg" sticky='top' style={{ background: '#3f4d67', color: '#a9b7d0' }} variant="dark">
            <Navbar.Brand style={{ backgroundColor: 'transparent' }} href="/" onClick={(e) => gotoRoute(e, '/')}>{props.translation('header.navlinks.Brand.name')}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    { props.user && props.user.role ? <Nav.Link href={props.user && props.user.role == 'admin' ? '/admin/dashboard' : '/dashboard' }  onClick={(e) => gotoRoute(e, props.user && props.user.role == 'admin' ? '/admin/dashboard' : '/dashboard')}>{props.translation('header.navlinks.Dashboard.name')}</Nav.Link> : null }
                    <Nav.Link href="/courses" onClick={(e) => gotoRoute(e, '/')}>{props.translation('header.navlinks.Courses.name')}</Nav.Link>
                    <Nav.Link href="/contact" onClick={(e) => gotoRoute(e, '/contact')}>{props.translation('header.navlinks.Contact.name')}</Nav.Link>
                    <NavDropdown title={country.name} id="collasible-nav-dropdown">
                        {
                            countries.map((item, index) => (
                                <NavDropdown.Item key={index} active={country.name==item.name}  href={`#country${country.name}`} onClick={(e) => languageChange(e, item)}>
                                    {item.name}
                                </NavDropdown.Item>
                            ))
                        }
                    </NavDropdown>
                </Nav>
                { props.user && props.user.role ? 
                   <Nav><Nav.Link href="/logout" onClick={(e) => logout(e)}>{props.translation('header.navlinks.Logout.name')}</Nav.Link></Nav> :
                   <Nav>
                        <Nav.Link href="/login" onClick={(e) => gotoRoute(e, '/login')}>{props.translation('header.navlinks.Login.name')}</Nav.Link>
                        <Nav.Link href="/signup" onClick={(e) => gotoRoute(e, '/signup')}>{props.translation('header.navlinks.Signup.name')}</Nav.Link>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    );
};

const mapStateToProps = state => {
    return {
        user: state.userDetails.user
    }
}

export default connect(mapStateToProps, actions)(withRouter(NavBar));
