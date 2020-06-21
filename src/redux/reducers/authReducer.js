import {
  LOG_IN,
  FORM_VALIDATION,
  LOG_OUT,
  CLOSE_MESSAGES,
  IS_AUTHENTICATED
} from '../actions/actions';

// get the initial state
const initialState = {
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
        userId: action.payload.userId,
        isLoggedIn: action.payload.isLoggedIn
      };
    case FORM_VALIDATION:
      return {
        ...state,
        isLoggedIn: false,
        formIsValid: true,
        formErrors: action.payload.formErrors,
        formIsValid: action.payload.formIsValid
      };
    case CLOSE_MESSAGES:
      return {
        ...state,

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
