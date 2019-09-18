import React from 'react';
import { IRecord } from '@types';

interface PropsType {
  record: IRecord;
  occurences: Array<{ key: string; position: number[] }>;
}

const Title = ({ occurences, record }: PropsType) => {
  const { title } = record;

  const titleMatch = occurences.find(o => o.key === 'title');

  if (titleMatch === undefined) {
    return (
      <div className="pl2 fw4 __t1" style={{ fontSize: '15px' }}>
        {title}
      </div>
    );
  }

  const { position } = titleMatch;
  return (
    <div key={`match_title`} className="pl2 fw4" style={{ fontSize: '15px' }}>
      {title.slice(0, position[0])}
      <span style={{ background: 'yellow' }}>
        {title.slice(position[0], position[0] + position[1])}
      </span>
      {title.slice(position[0] + position[1])}
    </div>
  );
};

export default Title;
