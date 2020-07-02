import React, { Component } from 'react';
import { connect } from 'react-redux';
import maleProfile from '../../img/male-profile.svg';
class UserAvatar extends Component {
  render() {
    let { avatarUrl, firstName, lastName } = this.props;
    return (
      <section
        style={{
          display: 'inline-block',
          zIndex: '3000',
          marginLeft: '20px',
          backgroundColor: 'rgba(204, 87, 74, 1)',
          padding: '5px',
          borderRadius: '30px 0px 0px 30px'
        }}
      >
        <div
          style={{
            backgroundImage: `url(${
              avatarUrl
                ? 'http://localhost:8080/uploads/' + avatarUrl
                : maleProfile
            })`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            boxShadow: '1px 1px 5px 1px rgba(55,55, 54, 0.3)',
            borderRadius: '50%',
            display: 'inline-flex',
            width: '25px',
            height: '25px',
            verticalAlign: 'middle',
            overflow: 'hidden',
            marginLeft: '3px'
          }}
        ></div>
        <span
          style={{
            color: 'white',
            marginLeft: '10px',
            fontSize: '0.8em',
            fontWeight: '100'
          }}
        >
          User: {firstName + ' ' + lastName}
        </span>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    avatarUrl: state.profile.userAvatar.avatarUrl,
    firstName: state.profile.userAvatar.firstName,
    lastName: state.profile.userAvatar.lastName
  };
};

const mapDispatchToProps = (dispatch) => {
  dispatch;
};

export default connect(mapStateToProps)(UserAvatar);
