import * as React from 'react';
import { compose, withHandlers } from 'recompose';
import { InputNumber } from 'antd';
import { withNotation } from 'enhancers';

const enhance = compose(
  withNotation,
  withHandlers({
    handleChange: props => bpm => {
      const notation = Object.assign(props.notation.state, { bpm });
      props.notation.dispatch.setNotation(notation);
    }
  })
);

const Bpm = ({ notation, handleChange }) => (
  <div className="Bpm">
    <h3>Bpm</h3>
    <InputNumber
      step={0.01}
      value={notation.state.bpm}
      precision={2}
      onChange={handleChange}
    />
  </div>
);

export default enhance(Bpm);
