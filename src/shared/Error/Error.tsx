import React from 'react';

import { Errors } from '../../errors';

import {ErrorStyled} from './Error.styles';


const Error = () => {
  return (
    <ErrorStyled>
      {Errors.UNEXPECTED_ERROR}
    </ErrorStyled>
  );
};

export default Error;