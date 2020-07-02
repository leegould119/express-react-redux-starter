import React, { Component } from 'react';
import { UserAvatar, LogoutButton } from '../formElements/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      path: ''
    };
  }
  animateMenu = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    let { isLoggedIn } = this.props;
    let { open, path } = this.state;
    return (
      <React.Fragment>
        <section
          style={{
            width: '100%',
            padding: '5px',
            backgroundColor: 'rgba(54, 54, 55, 1)',
            display: 'block',
            marginBottom: '10px',
            zIndex: 1,
            position: 'fixed',
            top: '0px',
            left: '0px'
          }}
        >
          <div className="container" style={{ postition: 'relative' }}>
            <div className="logo-header" />
            <div
              id="nav-icon"
              className={open ? 'open' : 'closed'}
              onClick={this.animateMenu}
            >
              <span></span>
              <span></span>
              <span></span>

              <nav
                onClick={this.animateMenu}
                className={open ? 'visible' : 'hidden'}
              >
                <Link to="/profile">Profile</Link>
                <Link to="/blogs">Blogs</Link>
              </nav>
            </div>
            <div
              style={{
                float: 'right',
                marginRight: '20px',
                marginTop: '2px'
              }}
            >
              <UserAvatar />
              <LogoutButton />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps = {}) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};
// export default Header;

export default connect(mapStateToProps)(Header);
