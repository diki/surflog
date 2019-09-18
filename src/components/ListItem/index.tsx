import React from 'react';
import Time from './Time';
import BackNextControl from './PrevNextControl';
import { IRecord } from '@types';

import Title from './Title';
import Content from './Content';
import PageIcon from './PageIcon';

interface PropsType {
  record: IRecord;
  occurences: Array<{ key: string; position: number[] }>;
  onClick: () => void;
}

interface StateTypes {
  positionIndex: number;
}

export default class ListItem extends React.Component<PropsType, StateTypes> {
  contentOccurences = this.props.occurences.filter(o => o.key === 'content');

  constructor(props: PropsType) {
    super(props);
    this.state = {
      positionIndex: 0,
    };
  }

  render() {
    const { record } = this.props;

    return (
      <div
        className="root pv2 relative z-0"
        style={{ overflowWrap: 'break-word' }}
      >
        <div className="actions absolute fw4 absolute--fill white">
          <a className="h-100 db pointer" onClick={this.props.onClick} />
          {this.contentOccurences.length > 1 && (
            <BackNextControl
              total={this.contentOccurences.length}
              current={this.state.positionIndex}
              onClickBack={this.handleGoToPrevOccurence}
              onClickNext={this.handleGoToNextOccurence}
            />
          )}
          <Time date={record.lastVisitedTime} />
        </div>
        <div className="fw4 flex">
          <PageIcon record={record} />
          <Title
            record={this.props.record}
            occurences={this.props.occurences}
          />
        </div>
        <div className="fw3" style={{ paddingTop: 4 }}>
          <Content
            record={record}
            occurence={this.contentOccurences[this.state.positionIndex]}
            index={this.state.positionIndex}
          />
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

  handleGoToNextOccurence = () => {
    const current = this.state.positionIndex;
    if (current < this.props.occurences.length - 1) {
      this.setState({
        positionIndex: current + 1,
      });
    }
  };

  handleGoToPrevOccurence = () => {
    const current = this.state.positionIndex;
    if (current > 0) {
      this.setState({
        positionIndex: current - 1,
      });
    }
  };
}
