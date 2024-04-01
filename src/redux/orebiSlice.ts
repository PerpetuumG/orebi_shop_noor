import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productData: [],
};

export const orebiSlice = createSlice({
  name: 'orebi',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      state.productData.push(action.payload);
    },
  },
});

export const { addToCart } = orebiSlice.actions;
export default orebiSlice.reducer;
