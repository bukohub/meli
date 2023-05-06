import { Monster } from '../../shared/model/Monster.model';
import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';

import { IQueryParams, createEntitySlice, EntityState } from 'app/shared/reducers/reducer.utils';

const initialState: EntityState<Monster> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: new Monster(),
  updating: false,
  updateSuccess: false,
};

const apiUrl = 'http://localhost:5000/';
const apiItem = 'https://api.mercadolibre.com/items/';

// Actions

export const getEntities = createAsyncThunk('monster/fetch_entity_list', async () => {
  const requestUrl = `${apiUrl}monsters`;
  return axios.get<Monster[]>(requestUrl);
});

export const getEntity = createAsyncThunk('monster/fetch_entity', async (id: string | number) => {
  const requestUrl = `${apiItem}/${id}`;
  return axios.get<Monster>(requestUrl);
});

// slice

export const MonsterSlice = createEntitySlice({
  name: 'monster',
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

export const { reset } = MonsterSlice.actions;

// Reducer
export default MonsterSlice.reducer;
