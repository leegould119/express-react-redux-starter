import React from 'react';

import maleProfile from '../../img/male-profile.svg';
import uploadIcon from '../../img/pen-solid.svg';

function avatarUpload(props) {
  let link = null;

  // set the link src

  if (props.imageSrc.length == 0) {
    link =
      'http://' +
      window.location.hostname +
      ':' +
      window.location.port +
      '/uploads/' +
      props.imageLink;
  } else {
    link = props.imageSrc;
  }
  // if links are null, then display the default profile image
  if (props.imageLink === null && props.imageSrc.length == 0) {
    link = null;
  }

  return (
    <React.Fragment>
      <section
        style={{
          width: '100px',
          margin: '0 auto',
          height: '200px',
          padding: '40px 0px 40px 0px',
          position: 'relative'
        }}
      >
        <div
          style={{
            backgroundImage: `url(${link ? link : maleProfile})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            border: '5px solid rgba(255,255,255,1)',
            // boxShadow: '1px 1px 5px 1px rgba(55,55, 54, 0.3)',
            borderRadius: '50%',
            display: 'inline-block',
            width: '120px',
            height: '120px',
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
              top: '50px',
              left: '95px',
              width: '30px',
              height: '30px',
              backgroundColor: 'rgba(255,255,255,1)',
              // boxShadow: '0.5px 0.5px 5px 0.5px rgba(0, 0, 0, 0.3)',
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
          onChange={props.getFile}
        />

        {/* <h1 style={{ display: 'inline' }}>register</h1> */}
        {/* <a href="#" onClick={this.register}>
            register
          </a> */}
      </section>
    </React.Fragment>
  );
}

export default avatarUpload;
