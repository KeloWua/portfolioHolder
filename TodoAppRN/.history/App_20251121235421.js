{/* App.js */}

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import HomeScreen from './src/screens/HomeScreen'; 
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
      <HomeScreen />
    </Provider>
    </SafeAreaProvider>
  );
};
