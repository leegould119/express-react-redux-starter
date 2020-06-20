export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const USER_ID = 'USER_ID';
export const ERROR_MESSAGES = 'ERROR_MESSAGES';
export const FORM_ERRORS = 'FORM_ERRORS';
export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const CLOSE_MESSAGES = ' CLOSE_MESSAGES';
export const loginUser = (data) => {
  return { type: LOG_IN, payload: data };
};

export const errorMessages = (data) => {
  return { type: ERROR_MESSAGES, payload: data };
};

export const _formErrors = (data) => {
  return { type: FORM_ERRORS, payload: data };
};
export const closeMessages = (data) => {
  return { type: CLOSE_MESSAGES, payload: data };
};

export const logoutUser = (data) => {
  return { type: LOG_OUT, payload: data };
};

export const userIsLoggedIn = (data) => {
  return { type: IS_LOGGED_IN, payload: data };
};
