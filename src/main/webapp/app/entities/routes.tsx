import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Product from './product';

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        <Route path="items*" element={<Product />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};
