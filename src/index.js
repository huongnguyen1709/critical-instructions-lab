import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true }) // attachAuthIsReady make sure that authentication on firebase is ready before rendering a DOM
  )
)

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <React.Fragment>
      <Provider store={store}>
        <App />
      </Provider>
    </React.Fragment>,
    document.getElementById('root')
  );
  serviceWorker.unregister();
})