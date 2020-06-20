import {
  LOG_IN,
  ERROR_MESSAGES,
  FORM_ERRORS,
  CLOSE_MESSAGES,
  LOG_OUT,
  IS_LOGGED_IN
} from '../actions/actions';

// get the initial state
const initialState = {
  Notifications: { Info: '', Warning: '', Success: '', Error: '', Message: '' },
  userId: null,
  isLoggedIn: null,
  formErrors: {},
  formIsValid: true
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        Notifications: {
          Info: '',
          Warning: '',
          Success: 'Success',
          Error: '',
          Message: 'successfuly logged in'
        },
        userId: action.payload.userId,
        isLoggedIn: action.payload.isLoggedIn
      };
    case FORM_ERRORS:
      return {
        ...state,
        isLoggedIn: false,
        formIsValid: true,
        formErrors: action.payload.formErrors,
        formIsValid: action.payload.formIsValid
      };
    case ERROR_MESSAGES:
      return {
        ...state,
        formErrors: {},
        Notifications: {
          Error: 'Error',
          Message: 'Username or password is incorrect'
        }
      };
    case CLOSE_MESSAGES:
      return {
        ...state,
        Notifications: {
          Info: '',
          Warning: '',
          Success: '',
          Error: '',
          Message: ''
        },
        userId: action.payload.userId,
        isLoggedIn: action.payload.isLoggedIn,
        formErrors: {},
        formIsValid: true
      };
    case LOG_OUT:
      return action.payload;
    case IS_LOGGED_IN:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
