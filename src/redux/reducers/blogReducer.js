import {
  GET_BLOGS,
  GETTING_BLOGS,
  GETTING_BLOGS_FAILURE
} from '../actions/actions';

const initialState = {
  blogs: []
};
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload
      };
    case GETTING_BLOGS_FAILURE:
      return {
        ...state
      };
    case GETTING_BLOGS:
      return { ...state };
    default:
      return state;
  }
};

export default blogReducer;
