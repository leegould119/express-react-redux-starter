import React from 'react';
import { Input, Button } from '../formElements';
function register({
  handleFormChange,
  handleSubmit,
  handleChange,
  formErrors,
  formIsValid
}) {
  return (
    <div className="form">
      <div className="form-header">
        <div className="logo-large" />
        <h2>Register</h2>
      </div>

      <form method="POST" onSubmit={handleSubmit}>
        <Input
          type="text"
          autoComplete="current-username"
          name="username"
          placeholder="Email"
          onChange={handleChange}
        />
        <label className={formIsValid ? '' : 'errorMessages'}>
          {formErrors['username'] ? <span> {formErrors['username']}</span> : ''}
        </label>

        <Input
          type="password"
          autoComplete="current-password"
          name="userpassword"
          placeholder="Password"
          onChange={handleChange}
        />
        <label className={formIsValid ? '' : 'errorMessages'}>
          {formErrors['userpassword'] ? (
            <span> {formErrors['userpassword']}</span>
          ) : (
            ''
          )}
        </label>
        <Input
          type="password"
          autoComplete="verify-password"
          name="userpasswordverify"
          placeholder="Password"
          onChange={handleChange}
        />
        <label className={formIsValid ? '' : 'errorMessages'}>
          {formErrors['userpasswordverify'] ? (
            <span> {formErrors['userpasswordverify']}</span>
          ) : (
            ''
          )}
        </label>
        <div style={{ width: '120px', margin: 'auto' }}>
          <input type="submit" value="Register" />
        </div>
      </form>
      <a name="Login" onClick={handleFormChange}>
        Login
      </a>
    </div>
  );
}
export default register;
