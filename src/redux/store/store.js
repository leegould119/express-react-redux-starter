import {
  authReducer,
  alertsReducer,
  profileReducer,
  blogReducer
} from '../reducers';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage: sessionStorage, // SESSION STORAGE, CAN ALSO BE NORMAL LOCAL STORAGE ( IN BROWSER ) INSTEAD OF SESSION

  stateReconciler: autoMergeLevel2 // SEE "MERGE PROCESS" SECTION FOR DETAILS.
};

const allReducers = combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
  profile: profileReducer,
  blogs: blogReducer
});

const pReducer = persistReducer(persistConfig, allReducers);
export const store = createStore(
  pReducer,
  compose(
    //   window.devToolsExtension && window.devToolsExtension(),
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

export const persistor = persistStore(store);
