import { QueryParams } from '../global.typings';

export const generateQueryParams = (obj: QueryParams) => {
  return {
    params: {...obj}
  };
};
