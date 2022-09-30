import { AxiosResponse } from 'axios';

import axios from '../axios';

type Method = 'post' | 'put' | 'delete';

export type QueryConfig = {
  params: { [key in string]: string };
};

export const apiFunctionQuery = <Response>(pathName: string) => {
  return (config?: QueryConfig): Promise<AxiosResponse<Response>> => axios.get<Response>(pathName, config);
};

export const apiFunctionMutation = <Request, Response>(method: Method, pathName: string,) => {
  return (data: Request): Promise<AxiosResponse<Response>> => axios(pathName, {data, method});
};