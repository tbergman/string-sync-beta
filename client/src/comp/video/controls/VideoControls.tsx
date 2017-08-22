import React from 'react';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Slider from 'antd/lib/slider';

interface VideoControlsProps {
  videoPlayer: any;
}

interface VideoControlsState {}

class VideoControls extends React.Component<VideoControlsProps, VideoControlsState> {
  shouldComponentUpdate(nextProps: VideoControlsProps): boolean {
    return Boolean(nextProps.videoPlayer);
  }

  render(): JSX.Element {
    const { videoPlayer } = this.props;

    return (
      <div className="VideoControls">
        <Row type="flex" align="middle">
          <Col span={24}>
            <Slider range defaultValue={[0, 1, 100]} />
          </Col>
        </Row>
        <Row className="VideoControls__grannular" type="flex" align="middle" gutter={10}>
          <Col xs={2} sm={2} md={1} lg={1} xl={1}>
            <Icon type="caret-right" />
          </Col>
          <Col xs={2} sm={2} md={1} lg={1} xl={1}>
            0s
          </Col>
          <Col xs={4} sm={4} md={4} lg={2} xl={2}>
            <div>
              <Row type="flex" align="middle">
                <Icon type="clock-circle" style={{ marginRight: '4px' }}/>
                <span style={{ fontSize: '10px' }}>100%</span>
              </Row>
            </div>
          </Col>
          <Col xs={2} sm={2} md={1} lg={1} xl={1}>
            <Icon type="sound" />
          </Col>
          <Col xs={5} sm={5} md={4} lg={3} xl={3}>
            <Slider defaultValue={100} />
          </Col>
          <Col push={1} xs={2} sm={2} md={1} lg={1} xl={1}>
            <Icon type="retweet" />
          </Col>
          <Col push={1} xs={2} sm={2} md={1} lg={1} xl={1}>
            <Icon type="shrink" />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  videoPlayer: state.video.player
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoControls);
