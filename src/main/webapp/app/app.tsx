import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs.ts';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from 'app/shared/layout/header/header';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const RouteTag = () => (
    <div>
      <ul>
        <li>Electronica</li>
        <li>Ipod</li>
        <li>Reproductores</li>
        <li>Ipoud touch</li>
        <li className="fw-bold">32 GB</li>
      </ul>
    </div>
  );

  const paddingTop = '60px';
  return (
    <BrowserRouter basename={baseHref}>
      <div className="app-container" style={{ paddingTop }}>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
        <div className="container-meli" id="app-view-container">
          <div className="tags mt-3">
            <RouteTag></RouteTag>
          </div>

          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
