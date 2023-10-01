import React from 'react';
import 'react-native-reanimated';
import {Provider} from 'react-redux';
import Navigation from '../src/navigation';
import store, {persistor} from '../src/store/store';
import {Localization} from 'src/providers/Localization';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Localization />
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
