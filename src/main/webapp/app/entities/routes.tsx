import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Monster from './battle';

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        <Route path="items*" element={<Monster />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};
