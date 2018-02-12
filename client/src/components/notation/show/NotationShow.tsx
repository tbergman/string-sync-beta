import * as React from 'react';
import { compose, withState, withProps, lifecycle } from 'recompose';
import { Link } from 'react-router-dom';
import { withNotation } from 'enhancers';
import { Gradient, Video, Tab, Fretboard, MaestroController, Piano } from 'components';
import { NotationShowBanner, NotationShowVideo } from './';
import { NotationControls } from 'components';
import { toTick, toTimeMs } from 'ssUtil';
import styled from 'styled-components';

const enhance = compose(
  withNotation,
  withState('isFetching', 'setIsFetching', false),
  withProps(props => ({
    fetchNotation: async () => {
      const notationId = props.match.params.id;
      props.setIsFetching(true);
      await props.notation.dispatch.fetchNotation(notationId);
      props.setIsFetching(false);
    }
  })),
  withProps(props => ({
    setBodyColor: color => {
      window.$('body').css({ background: color })
    }
  })),
  lifecycle({
    componentWillMount(): void {
      this.props.setBodyColor('black');
      window.ss.loader.add('initializeVideo');
      window.setTimeout(window.ss.loader.clear, 6000);
    },
    componentDidMount(): void {
      this.props.fetchNotation();
    },
    componentWillUnmount(): void {
      this.props.setBodyColor('white');
      this.props.notation.dispatch.resetNotation();
      window.ss.loader.clear();
    }
  })
);

const NotationShowOuter = styled.div`
  .NotationShow {
    color: white;
    overflow-x: hidden;
  }
`;
const NotationShowInner = styled.div``;
const Spacer = styled.div`
  height: 150px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
const Back = styled.span`
  margin-top: 10px;
`;

const NotationShow = ({ isFetching, notation }) => (
  <NotationShowOuter>
    <NotationShowInner className="NotationShow">
      <Gradient />
      <MaestroController />
      <NotationShowBanner
        isFetching={isFetching}
        songName={notation.state.songName}
        artistName={notation.state.artistName}
      />
      <NotationShowVideo />
      <Fretboard />
      <Piano />
      <Tab withCaret />
      <Spacer>
        <Back>
          <Link to="/library">
            back
          </Link>
        </Back>
      </Spacer>
      <NotationControls />
    </NotationShowInner>
  </NotationShowOuter>
);

export default enhance(NotationShow);
