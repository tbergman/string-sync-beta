import * as React from 'react';
import { compose, defaultProps, mapProps, withHandlers, lifecycle, shouldUpdate } from 'recompose';
import { withVideo, withNotation } from 'enhancers';
import Youtube from 'react-youtube';
import styled from 'styled-components';

const PLAYER_STATES = {
  [-1] : 'UNSTARTED',
  [0]  : 'ENDED',
  [1]  : 'PLAYING',
  [2]  : 'PAUSED',
  [3]  : 'BUFFERING',
  [5]  : 'VIDEO_CUED'
};

const DEFAULT_YOUTUBE_OPTIONS = {
  playerVars: {
    modestbranding: 1,
    playsinline: 1,
    rel: 0,
    showinfo: 0,
    disablekb: 1,
    fs: 0,
    start: 0,
    loop: 1,
  }
};

const enhance = compose(
  withVideo,
  withNotation,
  defaultProps({
    withInitializer: false
  }),
  mapProps(props => ({
    youtubeVideoId: props.notation.state.youtubeVideoId,
    video: props.video,
    withInitializer: props.withInitializer,
    onEnd: props.onEnd || (() => null)
  })),
  shouldUpdate((currProps, nextProps) => (
    currProps.youtubeVideoId !== nextProps.youtubeVideoId
  )),
  withHandlers({
    handleReady: props => event => {
      props.video.dispatch.setPlayer(event.target);
    },
    handleStateChange: props => event => {
      props.video.dispatch.setPlayerState(PLAYER_STATES[event.data]);
    }
  }),
  lifecycle({
    componentWillUnmount(): void {
      this.props.video.dispatch.resetVideo();
    }
  })
);

const Video = ({ video, withInitializer, youtubeVideoId, handleReady, handleStateChange, onEnd }) => (
  <div className="Video">
    <Youtube
      id="Video__youtubePlayer"
      className="Video__youtubePlayer"
      opts={DEFAULT_YOUTUBE_OPTIONS}
      videoId={youtubeVideoId}
      onReady={handleReady}
      onStateChange={handleStateChange}
      onEnd={onEnd}
    />
  </div>
);

export default enhance(Video);
