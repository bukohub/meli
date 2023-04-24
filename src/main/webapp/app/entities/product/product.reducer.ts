import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';

import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IProduct, defaultValue } from 'app/shared/model/product.model';

const initialState: EntityState<IProduct> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

const apiUrl = 'https://api.mercadolibre.com/sites/MLA/search?q=';
const apiItem = 'https://api.mercadolibre.com/items/';

// Actions

export const getEntities = createAsyncThunk('product/fetch_entity_list', async ({ page, size, sort, query }: IQueryParams) => {
  const requestUrl = `${apiUrl}${query}`;
  return axios.get<IProduct[]>(requestUrl);
});

export const getEntity = createAsyncThunk('product/fetch_entity', async (id: string | number) => {
  const requestUrl = `${apiItem}/${id}`;
  return axios.get<IProduct>(requestUrl);
});

// slice

export const ProductSlice = createEntitySlice({
  name: 'product',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
        };
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      });
  },
});

export const { reset } = ProductSlice.actions;

// Reducer
export default ProductSlice.reducer;
