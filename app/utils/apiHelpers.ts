import { createAsyncThunk, type AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import type { AxiosResponse, AxiosError } from "axios";

export const handleApiError = (error: AxiosError, defaultMessage?: string): never => {
  throw {
    response: error.response || defaultMessage,
  };
};

export const handleApiResponse = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};

export const createThunkHandler = <ReturnType, ArgType = void>(
  actionType: string,
  serviceCall: (args: ArgType) => Promise<ReturnType>
) => {
  return createAsyncThunk<ReturnType, ArgType>(
    actionType,
    async (args, { rejectWithValue }) => {
      try {
        return await serviceCall(args);
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
};
