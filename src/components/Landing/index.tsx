import React from 'react';

import RecordedPagesSlide from '../RecordedPagesSlide';

interface PropsType {
  onConfirmed: () => void;
  onClickInfo: () => void;
}

export default (props: PropsType) => (
  <div>
    <div className="f4 fw2 lh-title pt3">
      <div className="f2 tc">
        <span className="fw3">Browser history with content, works for</span>{' '}
        <RecordedPagesSlide />
      </div>
      <div className="pt3 f5">
        <label className="fw5">How does it work?</label>
        <div>
          A new record is created for new visits or for the interactions on
          supported websites. A record consists of metadata (time, link, ..) and
          the required content extracted from website.{' '}
          <div className="pt2">
            All records are kept <b>in your browser's storage</b>, so that you
            can search your records pretty effectively
          </div>
        </div>
      </div>
      <div className="pt3 f5">
        <label className="fw5">Is it safe?</label>
        <div>
          All data is stored in your device, nothing is sent or shared. All the
          code can be inspected and you can learn more on{' '}
          <a href="#" className="black fw4" onClick={props.onClickInfo}>
            Github
          </a>
          .
        </div>
      </div>
    </div>
    <a
      // tslint:disable-next-line: max-line-length
      className="mt3 f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4 justify-center w-100"
      href="#0"
      onClick={props.onConfirmed}
    >
      SOUNDS GOOD
    </a>
  </div>
);
