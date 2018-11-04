import * as React from 'react';
export const Wrapper = ({ title, children }: any) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      {children}
    </div>
  </div>
);
