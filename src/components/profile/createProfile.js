import React from 'react';
import Select from 'react-select';
import { AvatarUpload, Input, RadioButton, Button } from '../formElements';

import customStyles from '../../utils/customStyles';
const createProfile = (props) => {
  let genderOptions = ['Male', 'Female'];
  return (
    <React.Fragment>
      <div className="background" />
      <div className="container ">
        <div className="row">
          <div className="col-12">
            <form className="form" method="POST" onSubmit={props.handleSubmit}>
              <div className="dark-orange">
                <AvatarUpload
                  imageLink={props.imageLink}
                  imageSrc={props.imageSrc}
                  getFile={props.getFile}
                />
              </div>
              <div className="col-6">
                <label className="label">Personal info</label>

                <Input
                  type="text"
                  autoComplete="first-name"
                  name="firstName"
                  placeholder="First name"
                  onChange={props.handleChange}
                  value={props.formVals.firstName}
                />

                <label className={props.formIsValid ? '' : 'errorMessages'}>
                  {props.formErrors['firstName'] ? (
                    <span> {props.formErrors['firstName']}</span>
                  ) : (
                    ''
                  )}
                </label>
                <Input
                  type="text"
                  autoComplete="last-name"
                  name="lastName"
                  placeholder="Last name"
                  onChange={props.handleChange}
                  value={props.formVals.lastName}
                />
                <label className={props.formIsValid ? '' : 'errorMessages'}>
                  {props.formErrors['lastName'] ? (
                    <span> {props.formErrors['lastName']}</span>
                  ) : (
                    ''
                  )}
                </label>
                <input
                  type="tel"
                  autoComplete="phone-number"
                  name="phoneNumber"
                  placeholder="Phone number"
                  onChange={props.handleChange}
                  value={props.formVals.phoneNumber}
                />
                <label className={props.formIsValid ? '' : 'errorMessages'}>
                  {props.formErrors['phoneNumber'] ? (
                    <span> {props.formErrors['phoneNumber']}</span>
                  ) : (
                    ''
                  )}
                </label>
              </div>
              <div className="col-6">
                <label className="label">Address</label>
                <div
                  style={{
                    borderBottom: '1px solid rgba(240,240,240,1)',
                    display: 'block',
                    position: 'relative',
                    margin: '0px 0px 0 10px',
                    width: 'calc(100% - 20px)',
                    marginTop: '7px'
                  }}
                >
                  <Select
                    id="state"
                    options={props.States}
                    styles={customStyles}
                    value={props.selectedState}
                    label={props.selectedState}
                    isSearchable={true}
                    onChange={props.handleStateSelectChange}
                    placeholder={'State'}
                  />
                </div>
                <label
                  style={{ marginTop: '0px' }}
                  className={props.formIsValid ? '' : 'errorMessages'}
                >
                  {props.formErrors['state'] ? (
                    <span> {props.formErrors['state']}</span>
                  ) : (
                    ''
                  )}
                </label>
                <div
                  style={{
                    borderBottom: '1px solid rgba(240,240,240,1)',
                    display: 'block',
                    position: 'relative',
                    margin: '0px 0px 0 10px',
                    width: 'calc(100% - 20px)',
                    marginTop: '5px'
                  }}
                >
                  <Select
                    id="city"
                    options={props.Cities}
                    styles={customStyles}
                    value={props.selectedCity}
                    label={props.selectedCity}
                    isSearchable={true}
                    onChange={props.handleCitySelectChange}
                    placeholder={'City'}
                  />
                </div>
                <label
                  style={{ marginTop: '0px' }}
                  className={props.formIsValid ? '' : 'errorMessages'}
                >
                  {props.formErrors['city'] ? (
                    <span> {props.formErrors['city']}</span>
                  ) : (
                    ''
                  )}
                </label>
                <Input
                  type="text"
                  autoComplete="street-address"
                  name="streetAddress"
                  placeholder="Street address"
                  onChange={props.handleChange}
                  value={props.formVals.streetAddress}
                />
                <label className={props.formIsValid ? '' : 'errorMessages'}>
                  {props.formErrors['streetAddress'] ? (
                    <span> {props.formErrors['streetAddress']}</span>
                  ) : (
                    ''
                  )}
                </label>
                <Input
                  type="text"
                  autoComplete="postal-code"
                  name="postalCode"
                  placeholder="Postal code"
                  onChange={props.handleChange}
                  value={props.formVals.postalCode}
                />
                <label className={props.formIsValid ? '' : 'errorMessages'}>
                  {props.formErrors['postalCode'] ? (
                    <span> {props.formErrors['postalCode']}</span>
                  ) : (
                    ''
                  )}
                </label>
              </div>

              <div className="col-6">
                <label className="label">Social links</label>
                <Input
                  type="link"
                  autoComplete="facebook-link"
                  name="facebookLink"
                  placeholder="Facebook"
                  onChange={props.handleChange}
                  value={props.formVals.facebookLink}
                />
                <Input
                  type="link"
                  autoComplete="twitter-link"
                  name="twitterLink"
                  placeholder="Twitter"
                  onChange={props.handleChange}
                  value={props.formVals.twitterLink}
                />
                <Input
                  type="link"
                  autoComplete="pinterest-link"
                  name="pinterestLink"
                  placeholder="Pinterest"
                  onChange={props.handleChange}
                  value={props.formVals.pinterestLink}
                />
                <Input
                  type="link"
                  autoComplete="linkedin-link"
                  name="linkedinLink"
                  placeholder="Linkedin"
                  onChange={props.handleChange}
                  value={props.formVals.linkedinLink}
                />
              </div>
              <div className="col-6">
                <label className="label">Gender</label>
                <div style={{ marginTop: '15px' }}>
                  <RadioButton
                    id="gender"
                    options={genderOptions}
                    handleChange={props.handleRadioButtonChange}
                    data={props.formVals.gender}
                  />
                </div>
              </div>
              <div className="col-12">
                <div style={{ width: '180px' }}>
                  <Button value="Create profile" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default createProfile;
