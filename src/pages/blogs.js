import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateProfile, Toast, Header } from '../components';
import beach from '../img/banner6.jpg';
import maleProfile from '../img/male-profile.svg';
import uploadIcon from '../img/pen-solid.svg';
import uploadBanner from '../api/uploadBlogBannerImages';
import { SocialLinks, Input, Button } from '../components/formElements';

function mapStateToProps(state) {
  return {
    ...state,
    avatarUrl: state.profile.userAvatar.avatarUrl,
    firstName: state.profile.userAvatar.firstName,
    lastName: state.profile.userAvatar.lastName,
    facebookLink: state.profile.userAvatar.socialLinks.facebookLink,
    pinterestLink: state.profile.userAvatar.socialLinks.pinterestLink,
    twitterLink: state.profile.userAvatar.socialLinks.twitterLink,
    linkedinLink: state.profile.userAvatar.socialLinks.linkedinLink,
    city: state.profile.userAvatar.location.city,
    state: state.profile.userAvatar.location.state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

class blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: '',
      blogData: { bannerUrl: '', blogTitle: '', blogDescription: '' }
    };
  }
  // gets the file from the fileInput
  getFile = (event) => {
    //the input
    let fd = event.target.files[0];
    const formdata = new FormData();
    formdata.append('file', fd);

    // upload avatar image
    uploadBanner(formdata).then((response) => {
      if (response != null) {
        let origLink = response;
        let link = origLink.substring(8);
        this.setState((prevstate) => ({
          ...prevstate.blogData,
          blogData: { bannerUrl: link }
        }));
      }
    });

    // render the uploaded file here
    // let reader = new FileReader();
    // let imageUrl = reader.readAsDataURL(fd);
    // reader.onloadend = (e) => {
    //   this.setState({
    //     imageSrc: [reader.result]
    //   });
    // };
  };

  submitForm = (e) => {
    e.preventDefault();
    let { blogData } = this.state;
    console.log(blogData);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevstate) => ({
      blogData: { ...prevstate.blogData, [name]: value }
    }));
  };

  render() {
    let {
      avatarUrl,
      firstName,
      lastName,
      facebookLink,
      linkedinLink,
      twitterLink,
      pinterestLink,
      city,
      state
    } = this.props;
    let { bannerUrl, blogData } = this.state;
    console.log(bannerUrl);
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-7"></div>
            <div className="col-5">
              <section className="social-links">
                <div
                  className="header"
                  style={{
                    backgroundImage: `url(${beach})`
                  }}
                >
                  <div
                    className="avatar"
                    style={{
                      backgroundImage: `url(${
                        avatarUrl
                          ? 'http://localhost:8080/uploads/' + avatarUrl
                          : maleProfile
                      })`
                    }}
                  />
                </div>

                <label className="label" style={{ padding: '0px' }}>
                  {firstName + ' ' + lastName}
                </label>
                <p style={{ fontSize: '0.8em' }}>{city + ', ' + state}</p>
                <SocialLinks
                  facebookLink={facebookLink}
                  twitterLink={twitterLink}
                  linkedinLink={linkedinLink}
                  pinterestLink={pinterestLink}
                />
              </section>
              <section
                style={{
                  width: '100%',
                  height: '150px',
                  position: 'relative',
                  marginTop: '40px'
                }}
              >
                <div
                  style={{
                    backgroundImage: `url(${
                      blogData.bannerUrl
                        ? 'http://localhost:8080/uploads/' + blogData.bannerUrl
                        : beach
                    })`,
                    backgroundColor: 'rgba(120,120,120,1)',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    display: 'inline-block',
                    width: '100%',
                    height: '150px',
                    verticalAlign: 'middle',
                    overflow: 'hidden'
                  }}
                ></div>

                <label
                  htmlFor="file-input"
                  style={{
                    cursor: 'pointer',
                    zIndex: '3'
                  }}
                >
                  <img
                    style={{
                      position: 'absolute',
                      bottom: '-15px',
                      left: '30px',
                      width: '30px',
                      height: '30px',
                      backgroundColor: 'rgba(255,255,255,1)',
                      border: '1px solid rgba(230,230,230,1)',
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
              </section>

              <form
                className="create-blog-form"
                method="POST"
                onSubmit={this.submitForm}
              >
                <label className="label">Create a new blog</label>
                <Input
                  type="text"
                  autoComplete="blog-title"
                  name="blogTitle"
                  placeholder="Blog title"
                  onChange={this.handleChange}
                />
                <textarea
                  name="blogDescription"
                  placeholder="Blog description"
                  onChange={this.handleChange}
                />
                <div style={{ width: '150px' }}>
                  <Button value="Create blog" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(blogs);
