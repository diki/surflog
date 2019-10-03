import React from 'react';

import { IRecord, IUIState } from '@types';
import Item from './item';

interface PropTypes {
  records: IRecord[];
  ui: IUIState;
}

export default ({ records, ui }: PropTypes) => {
  const resutsEl = records.map((record, idx) => {
    return (
      <Item
        record={record}
        key={`item_${idx}`}
        onClick={() => console.log('ásdsd')}
      />
    );
  });

  return (
    <div
      style={{
        overflowWrap: 'break-word',
        fontSize: 14,
        margin: '0 -16px',
      }}
    >
      <div className="pb2 f6 pt2 __t fw3">{`Last ${records.length} records ${
        ui.latestSource === 'all' ? '' : 'of ' + ui.latestSource
      }`}</div>
      {resutsEl}
    </div>
  );
};
