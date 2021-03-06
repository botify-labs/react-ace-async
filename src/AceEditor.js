import React from 'react';
import PropTypes from 'prop-types';
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
      column: PropTypes.number,
      text: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['info', 'warning', 'error']).isRequired,
      raw: PropTypes.string,
    })),
    fontSize: PropTypes.number,
    showGutter: PropTypes.bool,
    onChange: PropTypes.func, //Called with (value: String, editor: )
    maxLines: PropTypes.number,
    tabSize: PropTypes.number,
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
    tabSize: 4,
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

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    let value = this.editor.getValue();
    if (this.props.onChange) {
      this.props.onChange(value, this.editor);
    }
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
    let {id, mode, theme, fontSize, annotations, showGutter, maxLines, readOnly, tabSize} = this.props;

    this.editor = window.ace.edit(id);
    this.editor.$blockScrolling = Infinity;
    this.editor.getSession().setMode(this.initMode(mode));
    this.editor.setTheme('ace/theme/' + theme);
    this.editor.setFontSize(fontSize);
    this.editor.getSession().setAnnotations(annotations);
    this.editor.on('change', this.onChange);
    this.editor.renderer.setShowGutter(showGutter);
    this.editor.setOption('maxLines', maxLines);
    this.editor.setOption('readOnly', readOnly);
    this.editor.setOption('tabSize', tabSize);
    this.editor.setOption('highlightActiveLine', true);
    this.editor.setShowPrintMargin(false);
  }

  componentWillMount() {
    load(() => {
      this.setState({
        isLoaded: true,
      });
    });
  }

  componentDidMount() {
    //Init AceEditor at first rendering
    if (this.state.isLoaded) {
      this.initAceEditor();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //Init AceEditor lately if it needed to be loaded
    if (this.state.isLoaded && !prevState.isLoaded) {
      this.initAceEditor();
    }
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
    return this.state.isLoaded !== nextState.isLoaded;
  }

  render() {
    let {id, className, style, value} = this.props;
    let {isLoaded} = this.state;
    if (!isLoaded) {
      return (
        <div
          className={cx('AceEditor', 'AceEditor--loading', className )}
          style={style}
        >
          Loading ...
        </div>
      );
    }
    return (
      <div
        id={id} className={cx('AceEditor', className )}
        style={style}
      >
       {value}
      </div>
    );
  }

}
