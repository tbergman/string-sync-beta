import React from 'react';
import { connect } from 'react-redux';

import Layout from 'comp/layout';
import Icon from 'comp/icon';
import Nav from 'comp/nav';

import { Device } from 'types/device';

import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US.js';

// styles
import 'antd/dist/antd.less';

const { Header, Content } = Layout;

interface AppProps {
  children: React.ReactChildren;
  params: any;
  device: Device;
}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  props: AppProps;
  state: AppState;

  render(): JSX.Element {
    const { params, children, device } = this.props;

    return (
      <LocaleProvider locale={enUS}>
        <div>
          <Nav device={device} params={params} />
          {children}
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
