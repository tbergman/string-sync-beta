import React from 'react';
import { connect } from 'react-redux';

import Video from 'comp/video';
import Fretboard from 'comp/fretboard';
import Tab from 'comp/tab';
import Collapse from 'antd/lib/collapse';
import Icon from 'antd/lib/icon';

import { Notation } from 'types/notation';
import { Device } from 'types/device';

const { Panel } = Collapse;

interface NotationShowProps {
  notation: Notation;
  device: Device;
  params: any;
  fetchNotation(id: number): void;
}

interface NotationShowState {
  activePanels: Array<string>;
}

class NotationShow extends React.Component<NotationShowProps, NotationShowState> {
  state: NotationShowState = {
    activePanels: ['fretboard']
  };

  componentDidMount(): void {
    this.props.fetchNotation(this.props.params.id);
  }

  togglePanel = (key: string): Function => {
    return (e: React.SyntheticEvent<HTMLAllCollection>): void => {
      const activePanels = Object.assign([], this.state.activePanels);
      const index = this.state.activePanels.indexOf(key);
      const isKeyActive = index >= 0;

      if (isKeyActive) {
        activePanels.splice(index, 1);
      } else {
        activePanels.push(key);
      }

      this.setState(Object.assign({}, this.state, { activePanels }));
    };
  }

  render(): JSX.Element {
    const { notation } = this.props;
    const { activePanels } = this.state;

    return (
      <div className="NotationShow">
        <Video
          youtubeVideoId={notation.youtubeVideoId}
        />
        <Collapse
          activeKey={activePanels}
          bordered={false}
        >
          <Panel className="NotationShow__panel" key="fretboard" header="">
            <Fretboard />
          </Panel>
        </Collapse>
        <Tab />
      </div>
    );
  }
}

import { fetchNotation } from 'data/notation/actions';

const mapStateToProps = state => ({
  notation: state.notation,
});

const mapDispatchToProps = dispatch => ({
  fetchNotation: id => dispatch(fetchNotation(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotationShow);
