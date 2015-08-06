import React, { PropTypes } from 'react';
import cx from 'classnames';

import { load } from './aceLoader';


export default class AceEditor extends React.Component {

  static displayName = 'AceEditor';

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    mode: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    theme: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    value: PropTypes.string,
    fontSize: PropTypes.number,
    showGutter: PropTypes.bool,
    onChange: PropTypes.func,
    maxLines: PropTypes.number,
    readOnly: PropTypes.bool,
    highlightActiveLine: PropTypes.bool,
    showPrintMargin: PropTypes.bool,
  };

  static defaultProps = {
    id: 'ace-editor',
    mode: '',
    theme: '',
    height: '500px',
    width: '500px',
    value: '',
    fontSize: 12,
    showGutter: true,
    onChange: null,
    maxLines: null,
    readOnly: false,
    highlightActiveLine: true,
    showPrintMargin: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  onChange() {
    let value = this.editor.getValue();
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  componentDidMount() {
    load(::this.initAceEditor);
  }

  initMode(mode) {
    if (typeof mode === 'string') {
      return 'ace/mode/' + mode;
    }
    if (typeof mode === 'function') {
      let Mode = mode(window.ace.require);
      return new Mode();
    }
    throw new Error('Unsupported mode type');
  }

  initAceEditor() {
    this.setState({
      isLoaded: true,
    });
    let {id, mode, theme, fontSize, value, showGutter, maxLines, readOnly, highlightActiveLine, showPrintMargin} = this.props;

    this.editor = window.ace.edit(id);
    this.editor.getSession().setMode(this.initMode(mode));
    this.editor.setTheme('ace/theme/' + theme);
    this.editor.setFontSize(fontSize);
    this.editor.setValue(value, 1);
    this.editor.on('change', ::this.onChange);
    this.editor.renderer.setShowGutter(showGutter);
    this.editor.setOption('maxLines', maxLines);
    this.editor.setOption('readOnly', readOnly);
    this.editor.setOption('highlightActiveLine', highlightActiveLine);
    this.editor.setShowPrintMargin(showPrintMargin);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isLoaded) {
      return;
    }

    let {mode, theme, fontSize, value, showGutter, maxLines, readOnly, highlightActiveLine, showPrintMargin} = nextProps;

    this.editor.getSession().setMode(this.initMode(mode));
    this.editor.setTheme('ace/theme/' + theme);
    this.editor.setFontSize(fontSize);
    this.editor.setOption('maxLines', maxLines);
    this.editor.setOption('readOnly', readOnly);
    this.editor.setOption('highlightActiveLine', highlightActiveLine);
    this.editor.setShowPrintMargin(showPrintMargin);
    if (this.editor.getValue() !== value) {
      this.editor.setValue(value, 1);
    }
    this.editor.renderer.setShowGutter(showGutter);
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={cx(
          'AceEditor',
          !this.state.isLoaded && 'AceEditor--loading',
          this.props.className,
        )}
        style={{
          width: this.props.width,
          height: this.props.height,
        }}
      >
        Loading ...
      </div>
    );
  }

}
