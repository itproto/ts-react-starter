import * as React from 'react';
export const Wrapper = ({ title, children }: any) => (
  <div>
    <h1>{title}</h1>
    {children}
  </div>
);
