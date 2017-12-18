import { connect } from 'react-redux';
import { sessionActions as actions } from 'data/api/session';

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(actions.setUser(user)),
  resetUser: () => dispatch(actions.resetUser()),
  login: user => dispatch(actions.login(user)),
  logout: () => dispatch(actions.logout())
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  session: {
    state: stateProps.session,
    dispatch: dispatchProps
  }
});

const withViewport = Component => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);

export default withViewport;
