import React from 'react';
import { connect } from 'react-redux';

import Collapse from 'antd/lib/collapse';
import Fretboard from 'comp/fretboard';
import Icon from 'antd/lib/icon';
import Tab from 'comp/tab';
import TabVideoControls from 'comp/tabVideoControls';
import Video from 'comp/video';

import { Notation } from 'types/notation';
import { Device } from 'types/device';

const { Panel } = Collapse;

interface NotationShowProps {
  device: Device;
  params: any;
  showFretboard: boolean;
  showFretboardControls: boolean;
  fetchNotation(id: number): void;
  resetNotation(): void;
}

interface NotationShowState {}

class NotationShow extends React.Component<NotationShowProps, NotationShowState> {
  componentDidMount(): void {
    this.props.fetchNotation(this.props.params.id);
  }

  componentWillUnmount(): void {
    this.props.resetNotation();
  }

  render(): JSX.Element {
    const { showFretboard, showFretboardControls } = this.props;

    return (
      <div className="NotationShow">
        <Video />
        <Collapse
          activeKey={showFretboard ? 'fretboard' : null}
          bordered={false}
        >
          <Panel className="NotationShow__panel" key="fretboard" header="">
            <Fretboard />
          </Panel>
        </Collapse>
        <Tab />
        <TabVideoControls />
      </div>
    );
  }
}

import { fetchNotation, resetNotation } from 'data/notation/actions';

const mapStateToProps = state => ({
  showFretboard: state.panels.fretboard,
  showFretboardControls: state.panels.fretboardControls
});

const mapDispatchToProps = dispatch => ({
  fetchNotation: id => dispatch(fetchNotation(id)),
  resetNotation: () => dispatch(resetNotation())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotationShow);
