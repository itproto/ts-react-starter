import * as React from 'react';
const { default: Drawer } = require('rc-drawer');
import 'rc-drawer/assets/index.css';
import './styles.css';
import { ScreenshotSketch } from '@src/components/feedback-drawer/screenshot-sketch/screenshot-sketch';

interface IFeedbackDrawerProps {
  selectedElement?: HTMLElement;
}

type IState = {
  open: boolean;
};

export class FeedbackDrawer extends React.Component<
  IFeedbackDrawerProps,
  IState
> {
  state: IState = {
    open: false
  };

  // TODO: use only selectedElement instead of both
  render() {
    const { selectedElement } = this.props;
    if (!selectedElement) {
      return null;
    }

    const { dataset } = selectedElement;

    return (
      <Drawer
        onChange={this.onChange}
        open={this.state.open}
        onMaskClick={this.onTouchEnd}
        onHandleClick={this.onSwitch}
        width="30vw"
      >
        <h3>Selected component {dataset.tip} </h3>
        <textarea
          placeholder="Enter your comment..."
          style={{ width: '100%' }}
          cols={2}
          rows={10}
        />
        <ScreenshotSketch selectedElement={selectedElement} />
        <p>Component Description</p>
      </Drawer>
    );
  }

  async componentDidUpdate(nextProps: IFeedbackDrawerProps) {
    const { selectedElement } = this.props;
    if (selectedElement !== nextProps.selectedElement) {
      this.setState({
        open: selectedElement !== undefined
      });
    }
  }

  onChange = (bool: boolean) => {
    console.log(bool);
  };
  onTouchEnd = () => {
    this.setState({
      open: false
    });
  };
  onSwitch = () => {
    this.setState({
      open: !this.state.open
    });
  };
}
