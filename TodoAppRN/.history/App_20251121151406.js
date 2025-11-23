{/* App.js */}

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import HomeScreen from './screens/HomeScreen'; 

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};
