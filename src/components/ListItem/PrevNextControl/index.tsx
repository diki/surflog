import React from 'react';

interface PropsType {
  current: number;
  total: number;
  onClickBack: () => void;
  onClickNext: () => void;
}

const PrevNextControl = ({
  current,
  total,
  onClickBack,
  onClickNext,
}: PropsType) => (
  <div
    className="control bottom-0 right-0 flex absolute h1 f7 justify-center"
    style={{
      background: '#01032480',
      minWidth: 136,
    }}
  >
    <div>
      {`(${current + 1} of ${total})`} |{' '}
      {current > 0 && (
        <a onClick={onClickBack}>
          {' <'} Prev <span>| </span>
        </a>
      )}
      {current < total - 1 && <a onClick={onClickNext}>Next > </a>}
    </div>
  </div>
);

export default PrevNextControl;
