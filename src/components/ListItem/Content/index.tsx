import React from 'react';
import { IRecord } from '@types';

interface PropsType {
  record: IRecord;
  occurence: { key: string; position: number[] };
  index: number;
}

const Content = ({ occurence, record, index }: PropsType) => {
  const { content } = record;
  if (occurence === undefined) {
    return <div>{content.slice(0, 180)}...</div>;
  }

  const { position } = occurence;

  let startIndex = position[0] - 96;
  if (startIndex < 0) {
    startIndex = 0;
  }

  const firstPiece = content.slice(startIndex, position[0]);
  const matched = (
    <span style={{ background: 'yellow' }}>
      {content.slice(position[0], position[0] + position[1])}
    </span>
  );
  const last = content.slice(
    position[0] + position[1],
    position[0] + position[1] + 84,
  );

  return (
    <div key={`match_${index}`}>
      {startIndex === 0 ? '' : '...'}
      {firstPiece}
      {matched}
      {last}
      ...
    </div>
  );
};

export default Content;
