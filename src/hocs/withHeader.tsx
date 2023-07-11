import React, { ComponentType } from 'react';
import Header from '@components/Header/Header';

export function withHeader<T>(Component: ComponentType<T>) {
  return (hocProps: T) => (
    <>
      <Header/>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      { /* @ts-ignore*/}
      <Component {...hocProps}/>
    </>
  );
}
