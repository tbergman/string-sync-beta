import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Frets from './frets';
import Strings from './strings';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import { VexPlayer, Fretman } from 'services/vexflow';
import { isVideoActive } from 'util/videoStateCategory';
import { withRAFLoop } from 'enhancers';
import RAFLoop from 'util/raf/loop';

interface FretboardProps {
  shouldRAF: boolean;
  RAFLoop: any;
  tabPlayer: VexPlayer;
  fretman: Fretman;
}

interface FretboardState {}

const fretIndicators = Object.assign([], Frets.DOTS).map((dots, fret) => (
  dots > 0 || fret === 0 ? fret.toString() : null
));

class Fretboard extends React.Component<FretboardProps, FretboardState> {
  static FRET_INDICATORS: Array<string> = fretIndicators;

  componentWillReceiveProps(nextProps: FretboardProps): void {
    if (nextProps.shouldRAF) {
      this.registerRAFLoop();
    } else {
      this.unregisterRAFLoop();
    }
  }

  updateFretman = (): void => {
    const { fretman, tabPlayer } = this.props;

    try {
      fretman.updateWithPlayer(tabPlayer);
    } catch (e) {
      // noop
    }
  }

  registerRAFLoop = (): void => {
    this.props.RAFLoop.register({
      name: 'Fretboard.updateFretman',
      precedence: 0,
      onAnimationLoop: this.updateFretman
    });
  }

  unregisterRAFLoop = (): void => {
    this.props.RAFLoop.unregister('Fretboard.updateFretman');
  }

  render(): JSX.Element {
    return (
      <div className="FretboardContainer">
        <Row type="flex" justify="center" className="Fret__indicator">
          {
            Fretboard.FRET_INDICATORS.map((indicator, fret) => (
              <Col key={`fret-indicator-${fret}`} span={fret === 0 ? 2 : 1}>
                <Row type="flex" justify="center">
                  {indicator}
                </Row>
              </Col>
            ))
          }
        </Row>
        <div className="Fretboard">
          <Frets />
          <Strings />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shouldRAF: (
    state.video.player &&
    state.tab.player.isReady &&
    state.tab.fretman &&
    isVideoActive(state.video.state)
  ),
  tabPlayer: state.tab.player,
  fretman: state.tab.fretman,
  scaleVisualizer: state.tab.scaleVisualizer,
});

const mapDispatchToProps = dispatch => ({

});

export default compose(
  withRAFLoop,
  connect(mapStateToProps, mapDispatchToProps)
)(Fretboard);
