import { MESSAGES, CLOSE_MESSAGES } from '../actions/actions';

const initialState = {
  Notifications: { Info: '', Warning: '', Success: '', Error: '', Message: '' }
};

const alertsReducer = (state = initialState, action) => {
  switch (action.type) {
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
        }
      };
    default:
      return state;
  }
};
export default alertsReducer;
