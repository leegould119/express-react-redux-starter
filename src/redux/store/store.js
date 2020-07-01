import { authReducer, alertsReducer, profileReducer } from '../reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
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
  profile: profileReducer
});

const pReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(
  pReducer,
  window.devToolsExtension && window.devToolsExtension()
);

export const persistor = persistStore(store);
