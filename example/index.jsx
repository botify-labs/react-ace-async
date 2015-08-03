import React from 'react';

import AceEditor from 'AceEditor';
import rules from './mocks/mock1.txt';
import botifySegmentationMode from './modes/botifySegmentation';
import './index.css';


React.render(
  <div>
    <AceEditor
      id="custom-mode"
      mode={botifySegmentationMode}
      theme="monokai"
      value={rules}
      style={{
        width: 500,
        height: 500,
      }}
    />
  </div>
, document.getElementById('container'));
