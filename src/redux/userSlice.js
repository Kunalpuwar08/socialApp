import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
   data:{}
  },
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    }
  },
});

export const { updateData } = userSlice.actions;
export default userSlice.reducer;
