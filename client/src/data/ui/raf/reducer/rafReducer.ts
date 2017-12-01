import { RESET_RAF_LOOP } from './actions';
import RAFLoop from 'util/raf/loop';

interface StoreRAF {
  loop: RAFLoop;
}

const defaultState: StoreRAF = {
  loop: new RAFLoop()
};

const RAFReducer = (state = defaultState, action): StoreRAF => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RESET_RAF_LOOP:
      nextState.loop = new RAFLoop();
      return nextState;

    default:
      return nextState;
  }
};

export default RAFReducer;