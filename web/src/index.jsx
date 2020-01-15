import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './environment';

import App from './App';

ReactDOM.render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <Suspense fallback={<div>Loading... </div>}>
      <App />
    </Suspense>
  </RelayEnvironmentProvider>,
  document.getElementById('root'),
);
