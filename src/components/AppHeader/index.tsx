import React from 'react';
import ReactTooltip from 'react-tooltip';

import AppIcon from '../icons/AppIcon';
import AboutIcon from '../icons/AboutIcon';
import { IUIState } from '@types';

interface IProps {
  onClickInfo: () => void;
  ui: IUIState;
}

const AppHeader = (props: IProps) => (
  <div>
    <div className="header flex top-0 left-0 white w-100 fixed f3">
      <div className="bg-white w2 h2 br-100">
        <AppIcon
          width={32}
          height={32}
          style={{ marginTop: 3 }}
          fill="rgb(42, 186, 83)"
        />
      </div>
      <div className="fw9 pl3 lh-title">SURFLOG</div>
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 8,
          height: 20,
          cursor: 'pointer',
          marginTop: 3,
        }}
        className="__t"
        data-tip
        data-for="tooltip"
        onClick={props.onClickInfo}
      >
        <AboutIcon
          width={24}
          height={24}
          style={{ marginTop: 3 }}
          fill="white"
        />
      </div>
      <ReactTooltip id="tooltip" role="example" place="bottom" effect="solid">
        <div className="f7">About</div>
      </ReactTooltip>
    </div>
  </div>
);

export default AppHeader;
