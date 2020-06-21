export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const USER_ID = 'USER_ID';
export const MESSAGES = 'MESSAGES';
export const FORM_VALIDATION = 'FORM_VALIDATION';
export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const CLOSE_MESSAGES = ' CLOSE_MESSAGES';

export const loginUser = (data) => {
  return { type: LOG_IN, payload: data };
};

export const messages = (data) => {
  return { type: MESSAGES, payload: data };
};

export const formValidation = (data) => {
  return { type: FORM_VALIDATION, payload: data };
};
export const closeMessages = (data) => {
  return { type: CLOSE_MESSAGES, payload: data };
};

export const logoutUser = (data) => {
  return { type: LOG_OUT, payload: data };
};

export const isAuthenticated = (data) => {
  return { type: IS_AUTHENTICATED, payload: data };
};
