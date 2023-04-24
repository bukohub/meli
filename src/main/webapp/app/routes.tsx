import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import PageNotFound from 'app/shared/error/page-not-found';
import Product from './entities/product/product';
import ProductDetail from './entities/product/product-detail';

const loading = <div>loading ...</div>;

const AppRoutes = () => {
  return (
    <div className="view-routes">
      <ErrorBoundaryRoutes>
        <Route index element={<Product />} />
        <Route path="items" element={<Product />} />
        <Route path="items/:id" element={<ProductDetail />} />
        <Route path="*" element={<PageNotFound />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
