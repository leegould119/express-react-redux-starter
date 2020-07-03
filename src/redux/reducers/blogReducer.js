import { GET_BLOGS, BLOG_BANNER } from '../actions/actions';

const initialState = {
  blogs: [],
  blogBanner: ''
};
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload
      };
    case BLOG_BANNER:
      return {
        ...state,
        blogBanner: action.payload
      };
    default:
      return state;
  }
};

export default blogReducer;
