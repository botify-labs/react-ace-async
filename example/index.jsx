import React from 'react';

import AceEditor from 'AceEditor';
import rules from './mocks/mock1.txt';
import botifySegmentationMode from './modes/botifySegmentation';
import './index.css';


function onChange(newValue) {
  console.log('change', newValue);
}

React.render(
  <div>
    <AceEditor
      id="basic"
      mode="javascript"
      theme="github"
      onChange={onChange}
    />
    <AceEditor
      id="custom-mode"
      mode={botifySegmentationMode}
      theme="monokai"
      value={rules}
    />
  </div>
, document.getElementById('container'));
