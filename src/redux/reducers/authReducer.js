import {
  LOG_IN,
  ERROR_SUCESS_MESSAGES,
  CLOSE_MESSAGES,
  LOG_OUT,
  IS_LOGGED_IN
} from '../actions/actions';

// get the initial state
const initialState = {
  Notifications: { Info: '', Warning: '', Success: '', Error: '', Message: '' },
  userId: null,
  isLoggedIn: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case ERROR_SUCESS_MESSAGES:
      return action.payload;
    case CLOSE_MESSAGES:
      return action.payload;
    case LOG_OUT:
      return action.payload;
    case IS_LOGGED_IN:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
