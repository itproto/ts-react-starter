import * as React from 'react';

import * as ReactDOM from 'react-dom';
import './styles.css';

export const Badge: React.SFC<any> = props => {
  const { element, onSelect } = props;
  const { idx, domRect } = props;

  const onClickHandler = () => {
    onSelect(element);
  };

  return (
    <span
      onClick={onClickHandler}
      style={{ top: domRect.top, left: domRect.left - 8 }}
      className="introjs-helperNumberLayer"
    >
      {idx}
    </span>
  );
};

export class FrameTest extends React.Component<any, any> {
  state: any = {};

  frame: any;

  componentDidMount() {
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
    const comps = doc.querySelectorAll('[data-tip]')!;

    const meta = Array.from(comps).map((element: any, idx: number) => {
      // c.style.backgroundColor = '#ff0000';
      // c.addEventListener('click', this.onH1Click);

      return {
        domRect: element.getBoundingClientRect(),
        name: element.dataset.tip,
        idx: idx + 1,
        element
      };
    });

    // const screenshot = await html2canvas((last as any) as HTMLElement);
    this.setState({
      meta
    });
  };

  renderOverly = () => {
    const { meta } = this.state;
    const { onElementSelect } = this.props;
    return (
      <div className="makeAbsolute">
        {meta.map((el: any) => (
          <Badge onSelect={onElementSelect} key={el.name} {...el} />
        ))}
      </div>
    );
  };
  render() {
    const { meta } = this.state;

    const {onElementSelect, ...iframeProps} = this.props;

    return (
      <div className="frmContainer">
        <iframe
          frameBorder={1}
          sandbox="allow-scripts allow-same-origin"
          className="makeAbsolute"
          style={{ width: 1000, height: 1000 }}
          src="api/foo"
          ref={frame => {
            this.frame = frame;
          }}
          {...iframeProps}
        />

        {meta && this.renderOverly()}
      </div>
    );
  }
}
