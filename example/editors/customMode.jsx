import React from 'react';

import AceEditor from 'AceEditor';
import rules from '../mocks/mock1.txt';
import botifySegmentationMode from '../modes/botifySegmentation';


export const customMode = (
  <AceEditor
    id="custom-editor"
    mode={botifySegmentationMode}
    theme="monokai"
    value={rules}
  />
);
