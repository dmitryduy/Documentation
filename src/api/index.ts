import { AxiosResponse } from 'axios';

import axios from '../axios';
import { QueryParams } from '../global.typings';

type Method = 'post' | 'put' | 'delete';

export type QueryConfig = {
  params: QueryParams;
};

export const apiFunctionQuery = <TRes>(pathName: string) => {
  return (config?: QueryConfig): Promise<AxiosResponse<TRes>> => axios.get<TRes>(pathName, config);
};

export const apiFunctionMutation = <TReq, TRes>(method: Method, pathName: string,) => {
  return (data: TReq): Promise<AxiosResponse<TRes>> => axios(pathName, {data, method});
};