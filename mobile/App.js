import React, { Suspense } from 'react';
import { View, StatusBar } from 'react-native';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './src/environment';
import Routes from './src/routes';

export default function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={<View />}>
        <>
          <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
          <Routes />
        </>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
