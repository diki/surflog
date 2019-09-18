import React from 'react';
import capitalize from 'lodash/capitalize';
import DeleteRecordPane from '../DeleteRecords';
import { Actions, IStatistics } from '@types';

interface PropsType {
  actions: Actions;
  statistics: IStatistics;
}

interface StateType {
  showClear: boolean;
}

class ManageRecords extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);

    this.state = {
      showClear: false,
    };
  }

  componentDidMount() {
    this.props.actions.getSummary();
  }

  render() {
    const { statistics, actions } = this.props;
    return (
      <main>
        <a
          className="bg-black-60 f5 fw5 db pointer white ph3 pv3 fixed w-100"
          onClick={() => actions.setUI({ key: 'mode', value: 'search' })}
          style={{
            // margin: '0 -16px',
            // marginTop: -63,
            background: 'rgb(74, 149, 96)',
            top: 0,
            left: 0,
            paddingLeft: 24,
            zIndex: 11,
          }}
        >
          <i className="fas fa-arrow-left f6 mr1" />
          {'Back to search'}
        </a>
        <div className="f3 fw4 mt4 mb3 black-70">
          {`${statistics.storage.count} records in total`} <br />
          <span className="db f5 fw3">{`${(
            statistics.storage.usage / statistics.storage.quota
          ).toFixed(1)}% of storage`}</span>
        </div>
        <div className="flex justify-between bb pb3 b--silver">
          <a className="red f5 fw3 db pointer" onClick={this.handleClickClear}>
            <i
              className="far fa-trash-alt"
              style={{ paddingRight: 4, fontSize: 14 }}
            />
            Clear
          </a>
          <a
            className="f5 fw3 db pointer black-60"
            onClick={this.handleDownload}
            style={{}}
          >
            <i
              className="fas fa-file-import"
              style={{ paddingRight: 4, fontSize: 14 }}
            />
            Download records
          </a>
          <a
            className="f5 fw3 db pointer black-60"
            style={{ position: 'relative' }}
          >
            <i
              className="fas fa-file-export"
              style={{ paddingRight: 4, fontSize: 14 }}
            />
            Import records
            <input
              id="the_real_file_input"
              type="file"
              style={{ opacity: 0, position: 'absolute', left: 0, width: 120 }}
              onChange={this.handleFileExport}
            />
          </a>
        </div>
        {this.state.showClear && (
          <div className="flex justify-center mt3">
            <DeleteRecordPane
              onCancel={() => this.setState({ showClear: false })}
              onClear={e => {
                this.props.actions.deleteRecords(e);
              }}
            />
          </div>
        )}
        <div className="flew f4 justify-center black-70">
          <ul
            className="mt3 list"
            style={{
              padding: 0,
            }}
          >
            <li className="flex justify-between mb1">
              <div className="fw4 f3" style={{ flex: 1 }}>
                Summary
              </div>
              <div style={{ fontWeight: 300, flex: 1 }}>{/* {s[1]} */}</div>
            </li>
            {this.props.statistics.usage.map(s => (
              <li className="flex justify-between fw3 f4 black-90 pv1">
                <div style={{ flex: 1 }}>{capitalize(s[0])}</div>
                <div style={{ flex: 1 }}>{s[1]}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  }

  handleDownload = () => {
    this.props.actions.download();
  };

  handleFileExport = () => {
    const fileEl: any = document.getElementById('the_real_file_input');
    if (fileEl !== null) {
      const file = fileEl.files[0];
      this.props.actions.upload({ fileInput: file });
    }
  };

  handleClickClear = () => {
    this.setState({
      showClear: true,
    });
  };

  handleClickBack = () => {
    this.props.actions.setUI({ key: 'mode', value: 'search' });
  };
}

export default ManageRecords;
