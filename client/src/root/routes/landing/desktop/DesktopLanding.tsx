import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose, lifecycle, branch, renderNothing } from 'recompose';

import Youtube from 'react-youtube';
import Logo from 'comp/logo';
import { Row, Col, Button } from 'antd';
import { enableFeatures, disableFeatures } from 'data/feature/actions';
import { identity } from 'enhancers';

const youtubeOptions = {
  playerVars: {
    modestbranding: 1,
    playsinline: 1,
    rel: 0,
    showinfo: 0,
    disablekb: 1,
    fs: 1,
    autoplay: 0,
    start: 0,
    loop: 1,
  }
};

const mapIsLoggedInToProps = state => ({
  isLoggedIn: Boolean(state.session.currentUser.id)
});

const showIfLoggedOut = (Component: any) => (
  compose(
    connect(mapIsLoggedInToProps, null),
    branch(({ isLoggedIn }) => !isLoggedIn, identity, renderNothing),
  )(Component)
);

const LoginLink = showIfLoggedOut(() => (
  <li>
    <Link to="/login">
      login
    </Link>
  </li>
));

const SignupButton = showIfLoggedOut(() => (
  <span>
    <Button size="large">
      <Link to="/signup">
        Join StringSync!
      </Link>
    </Button>
  </span>
));

const DesktopLanding = ({ isLoggedIn }) => (
  <div className="Landing--desktop">
    <div className="Landing--desktop__altActionBar">
      <ul className="AltActionBar__links">
        <li>
          <Link to="/about">
            about
          </Link>
        </li>
        <li>
          <a href="http://instagram.com/stringsynced">
            social
          </a>
        </li>
        <li>
          <Link to="/library">
            library
          </Link>
        </li>
        <LoginLink />
      </ul>
    </div>
    <section>
      <h1 className="Landing--desktop__title">
        Learn more. Think less.
      </h1>
      <div className="Landing--desktop__actionBar">
        <span>
          <Button size="large" type="primary">
            <Link to="/library">
              Discover new music!
            </Link>
          </Button>
        </span>
        <SignupButton />
      </div>
    </section>
    <section>
      <div className="Landing--desktop__concept">
        <Youtube
          opts={youtubeOptions}
          videoId="8Rz287ddt2E"
          onPlay={() => window.scrollTo(null, 92)}
        />
        <div className="Landing--desktop__concept__link">
          <Link to="/n/1">
            Learn <em>The Cool Side of the Pillow</em>
          </Link>
        </div>
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
          or
        </div>
        <div>
          <Button type="primary">
            <Link to="/library">
              Learn music like this!
            </Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

const mapDispatchToProps = dispatch => ({
  showNavbar: () => dispatch(enableFeatures(['navbar'])),
  hideNavbar: () => dispatch(disableFeatures(['navbar']))
});

export default compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount(): void {
      this.props.hideNavbar();
    },
    componentWillUnmount(): void {
      this.props.showNavbar();
    }
  })
)(DesktopLanding);