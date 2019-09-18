import React from 'react';
import { IStorage } from '@types';

interface PropTypes {
  storage: IStorage;
  onClickManage: () => void;
}

const Statistics = ({ storage, onClickManage }: PropTypes) => {
  if (storage.count === 0) {
    return <div className="fw3 tc f3 mt5 __t">You have no records yet</div>;
  }
  return (
    <div className="tc f4 fw3 ph3 flex pv3 justify-center">
      <div className="total">{`${storage.count} records in total`}</div>
      {',   '}
      <a
        className="fw2 bg-animate black bb"
        style={{
          padding: '0 4px',
          cursor: 'pointer',
        }}
        onClick={onClickManage}
      >
        {'  '}
        manage records
      </a>
    </div>
  );
};

export default Statistics;
