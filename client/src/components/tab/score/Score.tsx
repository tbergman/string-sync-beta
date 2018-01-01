import * as React from 'react';
import { compose, shouldUpdate } from 'recompose';
import { withTab, textWhileLoading } from 'enhancers';
import ScoreLine from './ScoreLine';
import CaretManager from './CaretManager';
import ScrollManager from './ScrollManager';
import { Line } from 'services';
import { hash } from 'ssUtil';

const enhance = compose(
  withTab,
  textWhileLoading(({ tab }) => tab.state.instance === null),
  shouldUpdate((currProps, nextProps) => {
    const { instance } = nextProps.tab.state;
    return instance && !instance.error;
  })
);

const ScoreLines = ({ tab }) => {
  if (!tab) {
    return null;
  } else {
    return (
      tab.lines.map((line: Line, ndx) => (
        <ScoreLine
          key={`score-line-${line.number}-${hash(line.vextabString)}`}
          number={line.number}
        />
      ))
    );
  }
};

const Score = ({ tab }) => (
  <div id="Score" className="Score">
    <CaretManager />
    <ScrollManager />
    <ScoreLines tab={tab.state.instance} />
  </div>
);

export default enhance(Score);
