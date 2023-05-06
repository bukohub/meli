import { Monster } from './../../shared/model/Monster.model';
import { Battle } from './../../shared/model/Battle.model';
import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';

import { IQueryParams, createEntitySlice, EntityState } from 'app/shared/reducers/reducer.utils';

const initialState: EntityState<Battle> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: new Battle(),
  updating: false,
  updateSuccess: false,
};

const apiUrl = 'http://localhost:5000/battle/';
const apiItem = 'https://api.mercadolibre.com/items/';

// Actions

export const getStartBattle = createAsyncThunk('battle/fetch_entity_list', async (monsters: Array<Monster>) => {
  const requestUrl = `${apiUrl}start`;
  return axios.post<Battle[]>(requestUrl, monsters);
});

export const getEntity = createAsyncThunk('battle/fetch_entity', async (id: string | number) => {
  const requestUrl = `${apiItem}/${id}`;
  return axios.get<Battle>(requestUrl);
});

// slice

export const BattleSlice = createEntitySlice({
  name: 'battle',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addMatcher(isFulfilled(getStartBattle), (state, action) => {
        const { data } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
        };
      })
      .addMatcher(isPending(getStartBattle, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      });
  },
});

export const { reset } = BattleSlice.actions;

// Reducer
export default BattleSlice.reducer;
