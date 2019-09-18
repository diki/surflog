import React from 'react';
import { IRecord } from '@types';

import { sources } from 'utils';

interface PropsType {
  record: IRecord;
}

const PageIcon = ({ record }: PropsType) => {
  const imgSource = sources[record.page].logo;

  return sources[record.page].font !== undefined ? (
    <i
      className={`${sources[record.page].font} f5`}
      style={{
        color: sources[record.page].color,
      }}
    />
  ) : (
    <img src={imgSource} style={{ width: 16, height: 16 }} />
  );
};

export default PageIcon;
