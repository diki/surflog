import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import capitalize from 'lodash/capitalize';

interface PropsType {
  date: number;
}

const Time = (props: PropsType) => (
  <div
    className="time top-0 right-0 ph2 flex absolute f7 justify-center h1"
    style={{
      boxShadow: 'grey 0px 0px 1px;',
      background: '#f0230880',
      minWidth: 136,
    }}
  >
    <div>{`${capitalize(distanceInWordsToNow(props.date))} ago`}</div>
  </div>
);

export default Time;
