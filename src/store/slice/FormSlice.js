/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
import { createSlice } from '@reduxjs/toolkit';

/**
 * Gestione etichetta autoanamnesi con etichetta
 */
const FormSlice = createSlice({
  name: 'Form',
  initialState:
  {
    size: {},

  },
  reducers: {
    setSize(state, { payload }) {
      const { id, wh } = payload;
      state.size[id] = wh;
    },

  },
});

export const initForm = () => ({
  type: 'INIT_FORM',

});

export const size = (state) => state.Form.size;

export const {
  setSize,
} = FormSlice.actions;
export default FormSlice.reducer;
