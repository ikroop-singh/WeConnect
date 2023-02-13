import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducers, compose(applyMiddleware(thunk)))
root.render(
   <React.StrictMode>
      <GoogleOAuthProvider clientId="718522335592-s4kft6dh53kopdff9231obrf26ln83a1.apps.googleusercontent.com">
         <Provider store={store}>
            <App />
         </Provider>
      </GoogleOAuthProvider>
   </React.StrictMode>
);

