/**
 * @format
 */

import React from 'react'
import { AppRegistry, Text, View } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import configureStore from './configureStore';
import { persistStore } from 'redux-persist';

import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))

const store = configureStore();
export const persistor = persistStore(store);

const AppRedux = () => (
    <App store={store} persistor={persistor} />
)

AppRegistry.registerComponent(appName, () => AppRedux);
