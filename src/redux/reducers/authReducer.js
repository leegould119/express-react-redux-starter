import { LOG_IN, LOG_OUT, IS_LOGGED_IN } from '../actions/actions';

// get the initial state
const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
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
