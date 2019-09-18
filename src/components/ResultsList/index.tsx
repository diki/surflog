import React from 'react';
import ListItem from '../ListItem';

import { IMatch } from '@types';

interface PropTypes {
  items: IMatch[];
  isFirstSearchDone: boolean;
  query: string;
}

export default ({ items, isFirstSearchDone }: PropTypes) => {
  if (items.length === 0) {
    return isFirstSearchDone ? (
      <div className="fw3 tc f3 mt5">No result found</div>
    ) : (
      <div />
    );
  }

  const resutsEl = items.map((result, idx) => {
    const { record, matchData } = result;
    const occurences: Array<{ key: string; position: number[] }> = [];
    Object.keys(matchData).forEach((key: string) => {
      const val = matchData[key];
      if (val === undefined) {
        return;
      }
      const { position } = val;
      position.forEach((pos: number[]) => {
        occurences.push({
          key,
          position: pos,
        });
      });
    });

    return (
      <ListItem
        occurences={occurences}
        record={record}
        key={`${idx}_item`}
        onClick={() => {
          chrome.tabs.create({
            active: true,
            url: record.link,
          });
        }}
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
      {resutsEl}
    </div>
  );
};
