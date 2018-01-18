import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'app';
import { store } from 'data';
import { maestro, rafLoop, loader } from 'services';

declare global {
  interface Window {
    notification: any;
    currentUser: any;
    $: any;
    store: any;
    assets: any;
    ss: {
      maestro: any;
      rafLoop: any;
      loader: any;
    }
  }
}

window.ss = {
  maestro,
  rafLoop,
  loader
};

document.addEventListener('DOMContentLoaded', (): void => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
});
