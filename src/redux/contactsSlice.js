import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, deleteContact, addContact, findByName } from './operation';

const pendingHandler = (state, action) => {
  state.contacts.isLoading = true;
  state.contacts.error = null;
};
const rejectedHandler = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: { items: [], isLoading: false, error: null },
    filter: '',
  },
  extraReducers: {
    [fetchTasks.pending]: pendingHandler,
    [fetchTasks.rejected]: rejectedHandler,
    [deleteContact.pending]: pendingHandler,
    [deleteContact.rejected]: rejectedHandler,
    [addContact.pending]: pendingHandler,
    [addContact.rejected]: rejectedHandler,
    [findByName.pending]: pendingHandler,
    [findByName.rejected]: rejectedHandler,
    [findByName.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.filter = action.payload;
    },
    [addContact.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items.push(action.payload);
    },
    [fetchTasks.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = action.payload;
    },
    [deleteContact.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      const i = state.contacts.items.findIndex(
        el => el.id === action.payload.id
      );
      state.contacts.items.splice(i, 1);
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
