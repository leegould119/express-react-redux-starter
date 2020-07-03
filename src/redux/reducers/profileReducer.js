import { USER_AVATAR, IS_PROFILE_COMPLETE } from '../actions/actions';

const initialState = {
  isProfileComplete: false,
  userAvatar: {
    avatarUrl: null,
    firstName: null,
    lastName: null,
    socialLinks: {
      pinterestLink: null,
      facebookLink: null,
      twitterLink: null,
      linkedInLink: null
    },
    location: {
      city: null,
      state: null
    }
  }
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AVATAR:
      return {
        ...state,
        userAvatar: action.payload
      };

    case IS_PROFILE_COMPLETE:
      return {
        ...state,
        isProfileComplete: action.payload
      };

    default:
      return state;
  }
};

export default profileReducer;
