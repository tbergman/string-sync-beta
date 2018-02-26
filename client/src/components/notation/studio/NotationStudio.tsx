import * as React from 'react';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import { Link } from 'react-router-dom';
import { withNotation, withVideo, withRaf } from 'enhancers';
import {
  DesktopNav, Gradient, Score, Video, Fretboard,
  MaestroController, RecordingZone, NotationStudioControls
} from 'components';
import styled from 'styled-components';
import { Row, Col, InputNumber, Checkbox, Button, Input } from 'antd';
import { isBetween } from 'ssUtil';

const enhance = compose(
  withNotation,
  withVideo,
  withState('top', 'setTop', 0),
  withState('left', 'setLeft', 0),
  withState('height', 'setHeight', 448),
  withState('width', 'setWidth', 794),
  withState('font', 'setFont', `'Roboto', sans-serif`),
  withState('fontHref', 'setFontHref', 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700'),
  withState('recording', 'setRecording', false),
  withState('isMaskActive', 'setIsMaskActive', false),
  withProps(props => {
    const { durationMs } = props.notation.state;

    return {
      maskActiveRangesMs: [
        { start: -1000, stop: 1250 },
        { start: durationMs - 3500, stop: durationMs + 1000}
      ]
    }
  }),
  withHandlers({
    handleGenericChange: props => setterName => value => {
      props[setterName](value);
    },
    handleFontHrefChange: props => event => {
      const { value } = event.target;
      const match = value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
      props.setFontHref(match ? match[0] : value);
    },
    handleFontChange: props => event => {
      const { value } = event.target;
      const sanitized = value.replace('font-family', '').replace(':', '').replace(';', '').trim();
      props.setFont(sanitized);
    },
    handleCheckedChange: props => setterName => event => {
      props[setterName](event.target.checked);
    },
    handleRecordClick: props => event => {
      props.setIsMaskActive(true);
      props.setRecording(true);

      window.setTimeout(() => {
        const { player } = props.video.state;
        player.seekTo(0);
        player.playVideo();
      }, 1000);
    },
    handleStopClick: props => event => {
      const { player } = props.video.state;
      player.pauseVideo();
      player.seekTo(0);
      props.setRecording(false);

      window.ss.maestro.enqueue(maestro => maestro.currentTimeMs = 0).update();
    },
    handleAnimationLoop: props => dt => {
      if (!props.recording) {
        return;
      }

      const { currentTimeMs } = window.ss.maestro;
      const withinMaskActiveRange = props.maskActiveRangesMs.some(range => (
        isBetween(currentTimeMs, range.start, range.stop))
      );

      if (withinMaskActiveRange && !props.isMaskActive) {
        props.setIsMaskActive(true);
      } else if (!withinMaskActiveRange && props.isMaskActive) {
        props.setIsMaskActive(false);
      }
    },
    handleVideoEnd: props => dt => {
      const { player } = props.video.state;
      player.pauseVideo();
      player.seekTo(0);
      props.setRecording(false);

      window.ss.maestro.enqueue(maestro => maestro.currentTimeMs = 0).update();
    }
  }),
  withRaf(
    () => window.ss.rafLoop,
    props => ({
      name: 'NotationStudio.handleAnimationLoop',
      precedence: 1000,
      onAnimationLoop: props.handleAnimationLoop
    })
  ),
  withProps(props => ({
    fetchNotation: async () => {
      const notationId = props.match.params.id;
      await props.notation.dispatch.fetchNotation(notationId);
    }
  })),
  lifecycle({
    componentDidMount(): void {
      this.props.fetchNotation();
    },
    componentWillReceiveProps(nextProps): void {
      if (this.props.video.state.isActive && !nextProps.video.state.isActive) {
        const { player } = nextProps.video.state;
        player.seekTo(0);
        player.pauseVideo();
      }
    },
    componentWillUmount(): void {
      this.props.notation.dispatch.resetNotation();
    }
  })
);

const Inner = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  width: 1280px;
`;
const LeftCol = styled(Col)`
  padding: 20px;

  > * {
    margin-top: 20px;
  }

  h1 {
    font-weight: 100;
  }
`;
const RightCol = styled(Col)`
  padding: 20px;
`;
const Label = styled.div`
  margin-bottom: 6px;
  margin-top: 10px;
`;
const CheckboxLabel = styled.span`
  margin-right: 5px;
`;
const RecordButton = styled(Button)`
  width: 100%;
`;

const NotationStudio = props => (
  <div>
    <Gradient />
    <DesktopNav />
    <link href={props.fontHref} rel="stylesheet" />
    <Inner>
      <MaestroController />
      <Row>
        <LeftCol span={8}>
          <h1>studio</h1>
          <Link to={`/n/${props.match.params.id}`}>
            back
          </Link>
          <NotationStudioControls {...props} />
        </LeftCol>
        <RightCol span={16}>
          <RecordingZone {...props} />
        </RightCol>
      </Row>
    </Inner>
  </div>
);

export default enhance(NotationStudio);