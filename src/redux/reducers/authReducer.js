import {
  LOG_IN,
  MESSAGES,
  FORM_ERRORS,
  CLOSE_MESSAGES,
  LOG_OUT,
  IS_AUTHENTICATED
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
    case MESSAGES:
      return {
        ...state,
        Notifications: action.payload.Notifications
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
      return { ...state, isLoggedIn: false };
    case IS_AUTHENTICATED:
      return { ...state, isLoggedIn: state.isLoggedIn };
    default:
      return state;
  }
};

export default authReducer;
