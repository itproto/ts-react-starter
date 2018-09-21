import * as React from 'react';
const { default: Drawer } = require('rc-drawer');
import 'rc-drawer/assets/index.css';
import './styles.css';
import * as html2canvas from 'html2canvas';
const { SketchField, Tools } = require('react-sketch');

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
  private _sketch: any;
  setSketchRef = (ref: any) => {
    this._sketch = ref;
    this.updateSketch();
  };

  updateSketch = () => {
    if (!this._sketch || !this.state.screenshot) {
      return;
    }
    // https://github.com/btcrs/feedback/blob/10d4a7f9ac5c8b9fd1fe08220820d6907f097ef6/src/components/image.jsx
    this._sketch.clear();
    this._sketch.setBackgroundFromDataUrl(this.state.screenshot.toDataURL(), {
      stretched: false,
      stretchedX: false,
      stretchedY: false,
      originX: 'left',
      originY: 'top'
    });
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
        <div>{screenshot && <img src={screenshot.toDataURL()} />}</div>
        <textarea
          placeholder="Enter your comment..."
          style={{ width: '100%' }}
          cols={2}
          rows={10}
        />
        <SketchField
          ref={(ref: any) => this.setSketchRef(ref)}
          style={{ width: '100%', height: 100 }}
          height="250px"
          tool={Tools.Pencil}
          lineColor="red"
          lineWidth={3}
          className="sketchField"
        />
        <p>Component Description</p>
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

      this.updateSketch();
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
