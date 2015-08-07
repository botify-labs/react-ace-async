import React, { PropTypes } from 'react';
import cx from 'classnames';

import { load } from './aceLoader';


export default class AceEditor extends React.Component {

  static displayName = 'AceEditor';

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    mode: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    theme: PropTypes.string,
    value: PropTypes.string,
    annotations: PropTypes.arrayOf(PropTypes.shape({
      row: PropTypes.number.isRequired,
      column: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['info', 'warning', 'error']).isRequired,
      raw: PropTypes.string,
    })),
    fontSize: PropTypes.number,
    showGutter: PropTypes.bool,
    onChange: PropTypes.func, //Called with (value: String, editor: )
    maxLines: PropTypes.number,
    readOnly: PropTypes.bool,
  };

  static defaultProps = {
    id: 'ace-editor',
    style: {},
    mode: '',
    theme: '',
    value: '',
    annotations: [],
    fontSize: 12,
    showGutter: true,
    onChange: null,
    maxLines: null,
    readOnly: false,
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
      this.props.onChange(value, this.editor);
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
    let {id, mode, theme, fontSize, value, annotations, showGutter, maxLines, readOnly} = this.props;

    this.editor = window.ace.edit(id);
    this.editor.$blockScrolling = Infinity;
    this.editor.getSession().setMode(this.initMode(mode));
    this.editor.setTheme('ace/theme/' + theme);
    this.editor.setFontSize(fontSize);
    this.editor.getSession().setAnnotations(annotations);
    this.editor.on('change', ::this.onChange);
    this.editor.setValue(value, 1);
    this.editor.renderer.setShowGutter(showGutter);
    this.editor.setOption('maxLines', maxLines);
    this.editor.setOption('readOnly', readOnly);
    this.editor.setOption('highlightActiveLine', true);
    this.editor.setShowPrintMargin(false);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isLoaded) {
      return;
    }

    let {mode, theme, fontSize, value, annotations, showGutter, maxLines, readOnly} = nextProps;

    if (this.props.mode !== mode) {
      this.editor.getSession().setMode(this.initMode(mode));
    }
    if (this.props.theme !== theme) {
      this.editor.setTheme('ace/theme/' + theme);
    }
    if (this.props.fontSize !== fontSize) {
      this.editor.setFontSize(fontSize);
    }
    if (this.props.maxLines !== maxLines) {
      this.editor.setOption('maxLines', maxLines);
    }
    if (this.props.readOnly !== readOnly) {
      this.editor.setOption('readOnly', readOnly);
    }
    if (this.props.showGutter !== showGutter) {
      this.editor.renderer.setShowGutter(showGutter);
    }
    if (this.props.annotations !== annotations) {
      this.editor.getSession().setAnnotations(annotations);
    }
    if (this.editor.getValue() !== value) {
      this.editor.setValue(value, 1);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isLoaded !== nextState.isLoaded
      || this.props.className !== nextProps.className
      || this.props.style !== nextProps.style;
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div
          className={cx('AceEditor', 'AceEditor--loading', this.props.className )}
          style={this.props.style}
        >
          Loading ...
        </div>
      );
    }
    return (
      <div
        id={this.props.id} className={cx('AceEditor', this.props.className )}
        style={this.props.style}
      >
      </div>
    );
  }

}
