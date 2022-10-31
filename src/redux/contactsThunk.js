import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from './service/axiosConfig'

export const fetchTasks = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosConfig.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axiosConfig.delete(`/contacts/${contact}`);
      window.location.reload(false);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axiosConfig.post(`/contacts`, contact);
      window.location.reload(false);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const findByName = createAsyncThunk(
  'contacts/findByName',
  async (name, thunkAPI) => {
    try {
      if (!name) {
        return '';
      }
      const response = await axiosConfig.get(`/contacts?name=${name}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
