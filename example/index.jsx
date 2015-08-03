import React from 'react';

import AceEditor from 'AceEditor';
import rules from './mocks/mock1.txt';
import botifySegmentationMode from './modes/botifySegmentation';
import './index.css';


let render = (value) => {
  let firstLine = value.split('\n')[0];
  let annotations = firstLine === '' ? [{
    row: 0,
    column: 0,
    text: 'First line can not be empty',
    type: 'error',
    raw: 'EmptyError',
  }] : null;

  React.render(
     <AceEditor
        id="custom-mode"
        mode={botifySegmentationMode}
        theme="monokai"
        value={value}
        onChange={render}
        style={{
          width: 500,
          height: 500,
        }}
        annotations={annotations}
      />
  , document.getElementById('container'));
};
render(rules);
