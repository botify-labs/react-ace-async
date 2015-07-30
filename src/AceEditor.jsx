import React, { PropTypes } from 'react';
import cx from 'classnames';

import { load } from './aceLoader';


export default class AceEditor extends React.Component {

  static displayName = 'AceEditor';

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    mode: PropTypes.string,
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

  initAceEditor() {
    this.setState({
      isLoaded: true,
    });

    this.editor = window.ace.edit(this.props.id);
    this.editor.getSession().setMode('ace/mode/' + this.props.mode);
    this.editor.setTheme('ace/theme/' + this.props.theme);
    this.editor.setFontSize(this.props.fontSize);
    this.editor.on('change', ::this.onChange);
    this.editor.setValue(this.props.value, 1);
    this.editor.renderer.setShowGutter(this.props.showGutter);
    this.editor.setOption('maxLines', this.props.maxLines);
    this.editor.setOption('readOnly', this.props.readOnly);
    this.editor.setOption('highlightActiveLine', this.props.highlightActiveLine);
    this.editor.setShowPrintMargin(this.props.showPrintMargin);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isLoaded) {
      return;
    }
    this.editor.getSession().setMode('ace/mode/' + nextProps.mode);
    this.editor.setTheme('ace/theme/' + nextProps.theme);
    this.editor.setFontSize(nextProps.fontSize);
    this.editor.setOption('maxLines', nextProps.maxLines);
    this.editor.setOption('readOnly', nextProps.readOnly);
    this.editor.setOption('highlightActiveLine', nextProps.highlightActiveLine);
    this.editor.setShowPrintMargin(nextProps.showPrintMargin);
    if (this.editor.getValue() !== nextProps.value) {
      this.editor.setValue(nextProps.value, 1);
    }
    this.editor.renderer.setShowGutter(nextProps.showGutter);
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
