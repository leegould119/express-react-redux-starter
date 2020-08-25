import {
  GET_BLOGS,
  GETTING_BLOGS,
  GETTING_BLOGS_FAILURE
} from '../actions/actions';

const initialState = {
  preloading: false,
  blogs: []
};
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        preloading: false,
        blogs: action.payload
      };
    case GETTING_BLOGS_FAILURE:
      return {
        ...state,
        preloading: false
      };
    case GETTING_BLOGS:
      return { ...state, preloading: true };
    default:
      return state;
  }
};

export default blogReducer;
