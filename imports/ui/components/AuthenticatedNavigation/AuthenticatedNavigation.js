import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const AuthenticatedNavigation = ({ name, history }) => (
  <div>
    <Nav>
      <LinkContainer to="/documents">
        <NavItem eventKey={1} href="/documents">documents</NavItem>
      </LinkContainer>
    </Nav>
    {/*//adding groups and ideas bars
      what does eventKey mean?
      */}
    <Nav>
      <LinkContainer to="/ideas">
        <NavItem eventKey={1} href="/ideas">ideas</NavItem>
      </LinkContainer>
    </Nav>

    {/*/
      there isn't a groups page yet...
      */}
    <Nav>
      <LinkContainer to="/groups">
        <NavItem eventKey={1} href="/groups">groups</NavItem>
      </LinkContainer>
    </Nav>


    <Nav pullRight>
      <NavDropdown eventKey={2} title={name} id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavItem eventKey={2.1} href="/profile">Profile</NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={2.2} onClick={() => history.push('/logout')}>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(AuthenticatedNavigation);
