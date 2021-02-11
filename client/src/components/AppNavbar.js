import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

import { GlobalProvider } from '../contexts/GlobalState';
import NavbarNLR from './NavbarNLR';

import ReleaseContextProvider from '../contexts/ReleaseContext';
import { RecordCrateProvider } from '../contexts/RecordCrateState';
import ReleaseList from './ReleaseList';
import CrateList from './CrateList';

// import NewReleaseForm from './NewReleaseForm';
// import NewCrateItemForm from './NewCrateItemForm';
import SearchReleaseForm from './SearchReleasesForm';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authFilmLinks = (
      <Fragment>
        <GlobalProvider>
        <RecordCrateProvider>
        <ReleaseContextProvider>
          <NavbarNLR />
          <ReleaseList />
          <SearchReleaseForm/>
          {/* <NewReleaseForm /> */}
          <CrateList />
          {/* <NewCrateItemForm /> */}
        </ReleaseContextProvider>
        </RecordCrateProvider>
        </GlobalProvider>
      </Fragment>
    );


    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
        <div className="container">
      </div>
      </Fragment>

    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color='dark' dark expand='sm' className='mb-5'>
          <Container>
            <NavbarBrand href='/'>New Label Releases</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Container>
        {isAuthenticated ? authFilmLinks : 'Login to view your releases!'}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
