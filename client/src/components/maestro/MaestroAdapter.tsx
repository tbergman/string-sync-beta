import * as React from 'react';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import { withSync, withVideo, withNotation } from 'enhancers';

// The purpose of this component is to wrap the Maestro service
// in a react wrapper, so that it can respond to changes in redux
// store props naturally.
const enhance = compose(
  withSync,
  withVideo,
  withNotation,
  withHandlers({
    handleAnimationLoop: props => () => {
      const { maestro } = props.sync.state;
      const { player, isActive } = props.video.state;

      if (player) {
        maestro.currentTimeMs = player.getCurrentTime() * 1000;
      }

      // update will not do anything if maestro.isActive === false
      // see Maestro._shouldUpdate()
      maestro.isActive = isActive;
      maestro.update();
    }
  }),
  withProps(props => {
    const { rafLoop, maestro } = props.sync.state;
    const name = 'Maestro.handleAnimationLoop';

    return ({
      registerRaf: () => {
        rafLoop.register({
          name,
          precedence: 0,
          onAnimationLoop: props.handleAnimationLoop
        });
      },
      unregisterRaf: () => {
        rafLoop.unregister(name);
      },
      startRafLoop: () => {
        rafLoop.start();
      },
      stopRafLoop: () => {
        rafLoop.stop();
      }
    });
  }),
  lifecycle({
    componentDidMount(): void {
      this.props.registerRaf();
      this.props.startRafLoop();
    },
    componentWillReceiveProps(nextProps: any): void {
      const { maestro } = nextProps.sync.state;
      const { bpm, deadTimeMs } = nextProps.notation.state;
      maestro.bpm = bpm;
      maestro.deadTimeMs = deadTimeMs;
    },
    componentWillUnmount(): void {
      this.props.stopRafLoop();
      this.props.unregisterRaf();
      this.props.sync.state.maestro.reset();
      this.props.sync.state.rafLoop.reset();
    }
  })
);

const MaestroAdapter = () => null;

export default enhance(MaestroAdapter);
