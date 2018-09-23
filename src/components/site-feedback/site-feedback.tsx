import * as React from 'react';

import { FrameTest } from '@src/components/frame-test/frame-test';
import { FeedbackDrawer } from '@src/components/feedback-drawer/feedback-drawer';

interface IState {
  selectedElement?: any;
}

export class SiteFeedback extends React.Component<{}, IState> {
  state = {
    component: undefined,
    selectedElement: undefined
  };

  elementSelectHandler = (selectedElement: any) => {
    this.setState({
      selectedElement
    });
  };

  render() {
    const { selectedElement } = this.state;
    return (
      <>
        <FeedbackDrawer selectedElement={selectedElement} />
        <FrameTest onElementSelect={this.elementSelectHandler} />
      </>
    );
  }
}
