import * as React from 'react';
import * as html2canvas from 'html2canvas';
const { SketchField, Tools } = require('react-sketch');
import './styles.css';
import * as ReactDOM from 'react-dom';

interface IScreenshotSketchProps {
  selectedElement?: HTMLElement;
}

type IState = {
  screenshot: any;
  calculatedWidth: number | string;
  calculatedHeight: number | string;
};

const pad = 64;

export class ScreenshotSketch extends React.Component<
  IScreenshotSketchProps,
  IState
> {
  state: IState = {
    screenshot: undefined,
    calculatedWidth: '100%',
    calculatedHeight: '100%'
  };
  private _sketch: any;
  setSketchRef = (ref: any) => {
    this._sketch = ref;
    // this.updateSketch();
  };

  componentDidMount() {
    this.generateScreenshot();
  }
  componentDidUpdate(nextProps: IScreenshotSketchProps) {
    const { selectedElement } = this.props;
    if (selectedElement !== nextProps.selectedElement) {
      this.generateScreenshot();
    }
  }

  generateScreenshot = async () => {
    const { selectedElement } = this.props;
    if (!selectedElement) {
      return;
    }
    const screenshot = await html2canvas(selectedElement);
    const { width, height } = selectedElement.getBoundingClientRect();
    this.setState({
      screenshot,
      calculatedWidth: width + 2 * pad,
      calculatedHeight: height + 2 * pad
    });

    this.updateSketch();
  };
  updateSketch = () => {
    const { selectedElement } = this.props;
    const { screenshot } = this.state;
    if (!selectedElement || !this._sketch || !screenshot) {
      return;
    }

    // https://github.com/btcrs/feedback/blob/10d4a7f9ac5c8b9fd1fe08220820d6907f097ef6/src/components/image.jsx
    this._sketch.clear();
    this._sketch.addImg(screenshot.toDataURL(), {
      stretch: false,
      scale: 1,
      left: pad,
      top: pad,
      originX: 'left',
      originY: 'top'
    });
  };

  openFullScreen = () => {
    const el = ReactDOM.findDOMNode(this) as Element;
    el.webkitRequestFullScreen();
  };

  exitFullScreen = () => {
    document.webkitExitFullscreen();
    this.forceUpdate();
  };

  render() {
    const { calculatedWidth, calculatedHeight } = this.state;
    return (
      <div className="skreenshotSketch">
        <div className="sketchTools">
          <button onClick={this.exitFullScreen}>Exit full</button>
          <button onClick={this.openFullScreen}>Zoom</button>
        </div>

        <div className="sketchFieldContainer">
          <SketchField
            ref={(ref: any) => this.setSketchRef(ref)}
            // style={{ width: '100%', height: 100 }}
            height={calculatedHeight}
            width={calculatedWidth}
            tool={Tools.Pencil}
            lineColor="red"
            lineWidth={3}
            className="sketchField"
          />
        </div>
      </div>
    );
  }
}
