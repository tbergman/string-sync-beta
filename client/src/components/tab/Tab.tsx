import * as React from 'react';
import { compose } from 'recompose';
import TabService from './TabService';
import Score from './score';

const enhance = compose(

);

const Tab = () => (
  <div className="Tab">
    <TabService />
    <Score />
  </div>
);

export default enhance(Tab);
