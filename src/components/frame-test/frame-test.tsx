import * as React from 'react';

import * as ReactDOM from 'react-dom';
import './styles.css';

import * as html2canvas from 'html2canvas';

export class FrameTest extends React.Component<any, any> {
  state: any = {
    myTop: 0,
    myLeft: 0
  };

  frame: any;

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  componentDidMount() {
    // const node = ReactDOM.findDOMNode(this.frame);
    // console.info(this.frame);
    this.frame.addEventListener('load', this.onFrameLoad);
  }

  /*
  shouldComponentUpdate() {
    return false;
  }*/
  onH1Click = (e: Event) => {
    const el = e.srcElement;
    console.info('amazing', el);
  };
  onFrameLoad = async (props: any[]) => {
    console.info(props);
    const frameBody = ReactDOM.findDOMNode(this.frame) as any;
    const doc = frameBody.contentDocument as Element;
    // const $h1 = doc.querySelector('h1')!;
    const comps = doc.querySelectorAll('[data-tip]')!;
    let rect = {
      x: 0,
      y: 0
    };

    let last;
    comps.forEach((c: any) => {
      c.style.backgroundColor = '#ff0000';
      c.addEventListener('click', this.onH1Click);
      rect = c.getBoundingClientRect();
      last = c;
      // console.info(c.style.backgroundColor);
    });
    const screenshot = await html2canvas((last as any) as HTMLElement);
    this.setState({
      myTop: rect.y,
      myLeft: rect.x,
      screenshot
    });
  };

  render() {
    const { myTop, myLeft, screenshot } = this.state;
    console.info(screenshot);
    return (
      <div className="frmContainer">
        <iframe
          allowTransparency={true}
          frameBorder={1}
          sandbox="allow-scripts allow-same-origin"
          className="makeAbsolute"
          style={{ width: 1000, height: 1000 }}
          src="api/foo"
          ref={frame => {
            this.frame = frame;
          }}
          {...this.props}
        />
        <div className="makeAbsolute">
          <div className="makeAbsolute" style={{ top: myTop, left: myLeft }}>
            Here we are
          </div>
        </div>

        {screenshot ? <img src={screenshot.toDataURL()} /> : null}
      </div>
    );
  }
}
