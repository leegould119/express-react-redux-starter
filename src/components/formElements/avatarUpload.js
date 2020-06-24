import React from 'react';

import maleProfile from '../../img/male-profile.svg';
import uploadIcon from '../../img/pen-solid.svg';

function avatarUpload(props) {
  return (
    <React.Fragment>
      <section
        style={{
          width: 'auto',
          height: '200px',
          padding: '40px',
          position: 'absolute'
        }}
      >
        <div
          //   src={props.imageSrc ? props.imageSrc : maleProfile}
          style={{
            backgroundImage: `url(${
              props.imageSrc ? props.imageSrc : maleProfile
            })`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
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
            onChange={props.getFile}
          />
        </form>
        {/* <h1 style={{ display: 'inline' }}>register</h1> */}
        {/* <a href="#" onClick={this.register}>
            register
          </a> */}
      </section>
    </React.Fragment>
  );
}

export default avatarUpload;
