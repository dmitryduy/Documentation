import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { Errors } from '../errors';
import { apiFunctionMutation, apiFunctionQuery, QueryConfig } from '../api';

type IMutationFunction<Request, Response> = ReturnType<typeof apiFunctionMutation<Request, Response>>;
type IQueryFunction<Response> = ReturnType<typeof apiFunctionQuery<Response>>;

interface AsyncThunkConfig {
  rejectValue: string;
}

export const getAsyncActionQuery = <Response>(name: string, func: IQueryFunction<Response>) =>
  createAsyncThunk<Response, QueryConfig | undefined, AsyncThunkConfig>(name, async (config, thunkApi) => {
    try {
      const response = await func(config);
      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const response = e as AxiosError<{ error: string }>;
        return thunkApi.rejectWithValue(response.response?.data?.error || Errors.UNEXPECTED_ERROR);
      }
      return thunkApi.rejectWithValue(Errors.UNEXPECTED_ERROR);
    }
  });

export const getAsyncActionMutation = <Request, Response>(name: string, func: IMutationFunction<Request, Response>) =>
  createAsyncThunk<Response, Request, AsyncThunkConfig>(name, async (data, thunkApi) => {
    try {
      const response = await func(data);
      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const response = e as AxiosError<{ error: string }>;
        return thunkApi.rejectWithValue(response.response?.data?.error || Errors.UNEXPECTED_ERROR);
      }
      return thunkApi.rejectWithValue(Errors.UNEXPECTED_ERROR);
    }
  });