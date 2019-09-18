import React from 'react';
import { IStorage } from '@types';

interface PropTypes {
  totalResultsFound: number;
  onClickManage: () => void;
}

const SmallInfoBar = ({ totalResultsFound, onClickManage }: PropTypes) => {
  return (
    <div className="flex justify-between fw2">
      <div className="pb2 f7 pt2 __t" style={{ marginLeft: -16 }}>
        {totalResultsFound > 0 && `Found: ${totalResultsFound}`}
      </div>
      <a
        className="db pv2 pointer fw5"
        style={{
          textIndent: 6,
          marginRight: -16,
          color: '#373232',
          textDecoration: 'underline',
        }}
        onClick={onClickManage}
      >
        Manage records
      </a>
    </div>
  );
};

export default SmallInfoBar;
