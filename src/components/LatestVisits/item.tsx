import React from 'react';
import { IRecord } from '@types';

import PageIcon from '../ListItem/PageIcon';
import Time from '../ListItem/Time';
import Content from '../ListItem/Content';

interface PropsType {
  record: IRecord;
  onClick: () => void;
}

interface StateTypes {
  positionIndex: number;
}

export default class ListItem extends React.Component<PropsType, StateTypes> {
  render() {
    const { record } = this.props;

    return (
      <div
        className="root pv2 relative z-0"
        style={{ overflowWrap: 'break-word' }}
      >
        <div className="actions absolute fw4 absolute--fill white">
          <a
            className="h-100 db pointer"
            onClick={() => {
              chrome.tabs.create({
                active: true,
                url: record.link,
              });
            }}
          />
          <Time date={record.lastVisitedTime} />
        </div>
        <div className="fw4 flex">
          <PageIcon record={record} />
          <div className="pl2 fw4 __t1" style={{ fontSize: '15px' }}>
            {record.title}
          </div>
        </div>
        <div className="fw3" style={{ paddingTop: 4 }}>
          <div>{record.content.slice(0, 180)}...</div>
        </div>
        <style jsx>{`
          .root {
            transition: background 0.3s ease;
            border-top: 1px solid #eceef1;
          }
          .root .actions {
            display: none;
          }
          .root:hover {
            z-index: 1;
            box-shadow: 0 0 1px #010324b3;
            background: rgba(1, 3, 36, 0.07);
            margin: 0 -16px;
            padding-left: 16px;
            padding-right: 16px;
          }
          .root:hover .actions {
            display: block;
          }
          .actions {
            top: -2px;
            user-select: none;
          }
        `}</style>
      </div>
    );
  }
}
