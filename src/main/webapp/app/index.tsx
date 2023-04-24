import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import getStore from 'app/config/store';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppComponent from 'app/app';

const store = getStore();

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

const render = Component =>
  root.render(
    <ErrorBoundary>
      <Provider store={store}>
        <div>
          <Component />
        </div>
      </Provider>
    </ErrorBoundary>
  );

render(AppComponent);
