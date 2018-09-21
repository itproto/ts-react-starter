import * as React from 'react';
const { default: Drawer } = require('rc-drawer');
import 'rc-drawer/assets/index.css';
import './styles.css';
import * as html2canvas from 'html2canvas';
interface IFeedbackDrawerProps {
  selectedElement?: any;
}

type IState = {
  open: boolean;
  screenshot: any;
};

export class FeedbackDrawer extends React.Component<
  IFeedbackDrawerProps,
  IState
> {
  state: IState = {
    open: false,
    screenshot: undefined
  };

  // TODO: use only selectedElement instead of both
  render() {
    const { selectedElement } = this.props;
    if (!selectedElement) {
      return null;
    }

    const { dataset } = selectedElement;
    const { screenshot } = this.state;
    return (
      <Drawer
        onChange={this.onChange}
        open={this.state.open}
        onMaskClick={this.onTouchEnd}
        onHandleClick={this.onSwitch}
        width="30vw"
      >
        <h3>Selected component {dataset.tip} </h3>
        {screenshot && <img src={screenshot.toDataURL()} />}
      </Drawer>
    );
  }
  async componentDidUpdate(nextProps: IFeedbackDrawerProps) {
    const { selectedElement } = this.props;
    if (selectedElement !== nextProps.selectedElement) {
      const screenshot = await html2canvas(selectedElement);
      this.setState({
        open: true,
        screenshot
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
