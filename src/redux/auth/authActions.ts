import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { urlUser } from 'src/end-points';
import { Credentials, SessionData } from 'src/models/user';
import Swal from 'sweetalert2';

const login = createAsyncThunk(
  'auth/login',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${urlUser}/login`, credentials);
      const response = data.data;

      const sessionData: SessionData = {
        userId: response._id,
        email: response.email,
        name: response.name,
        lastName: response.lastName,
        imageUrl: response.image ? response.image.url : null,
        role: response.role,
        state: response.state,
        token: response.token
      };

      localStorage.setItem('sessionData', JSON.stringify(sessionData));

      return sessionData;
    } catch (error: any) {
      const { response } = error;

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: response.data.message,
        timer: 4000
      });

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export default login;
