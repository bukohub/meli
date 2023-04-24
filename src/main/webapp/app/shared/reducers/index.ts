import { ReducersMapObject } from '@reduxjs/toolkit';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import entitiesReducers from 'app/entities/reducers';

const rootReducer: ReducersMapObject = {
  loadingBar,
  ...entitiesReducers,
};

export default rootReducer;
