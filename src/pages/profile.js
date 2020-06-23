import React, { Component } from 'react';
import { connect } from 'react-redux';
import registerUser from '../api/postProfile';
import axios from 'axios';
import maleProfile from '../img/male-profile.svg';
import uploadIcon from '../img/pen-solid.svg';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: null,
      imageSrc: null
    };
  }

  // https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
  register = () => {
    let { userId } = this.props;
    registerUser(userId).then((resp) => {
      console.log(JSON.stringify(resp));
    });
  };

  getFile = (event) => {
    let { userId } = this.props;
    let fd = event.target.files[0];
    const formdata = new FormData();
    formdata.append('file', fd);

    let reader = new FileReader();
    let imageUrl = reader.readAsDataURL(fd);
    axios({
      method: 'post',
      url: 'http://localhost:3000/upload-profile-pic',
      data: formdata
      // headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
        //handle success
        console.log(response.data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    reader.onloadend = (e) => {
      this.setState({
        imageSrc: [reader.result]
      });
    };
    console.log(this.state.imageSrc);
  };
  render() {
    return (
      <React.Fragment>
        <div className="background" />
        <section
          style={{
            width: 'auto',
            height: '200px',
            padding: '40px',
            position: 'absolute'
          }}
        >
          <img
            src={this.state.imageSrc ? this.state.imageSrc : maleProfile}
            style={{
              border: '5px solid rgba(255,255,255,1)',
              boxShadow: '1px 1px 5px 1px rgba(55,55, 54, 0.3)',
              borderRadius: '50%',
              display: 'inline-block',
              width: '120px',
              height: '120px',
              verticalAlign: 'middle'
            }}
          />
          <form encType="multipart/form-data">
            <label
              htmlFor="file-input"
              style={{
                cursor: 'pointer',
                zIndex: '3'
              }}
            >
              <img
                style={{
                  // margin: '10px 10px 0px 0px',
                  // float: 'left',
                  position: 'absolute',
                  top: '50px',
                  left: '130px',
                  width: '30px',
                  height: '30px',
                  backgroundColor: 'rgba(255,255,255,1)',
                  boxShadow: '0.5px 0.5px 5px 0.5px rgba(0, 0, 0, 0.3)',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'inline-block'
                }}
                src={uploadIcon}
              />
            </label>

            <input
              style={{ display: 'none' }}
              type="file"
              id="file-input"
              name="profile_pic"
              onChange={this.getFile}
            />
          </form>
          <h1 style={{ display: 'inline' }}>register</h1>
          {/* <a href="#" onClick={this.register}>
            register
          </a> */}
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    auth: state.auth,
    Notifications: state.auth.Notifications,
    userId: state.auth.userId,
    isLoggedIn: state.auth.isLoggedIn,
    formErrors: state.auth.formErrors,
    formIsValid: state.auth.formIsValid
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // dispatch,
    sendMessage: (data) => {
      dispatch(messages(data));
    },
    login: (data) => {
      dispatch(loginUser(data));
    },
    handleErrors: (data) => {
      dispatch(_formErrors(data));
    },
    closeMessageBox: (data) => {
      dispatch(closeMessages(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
