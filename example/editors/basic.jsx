import React from 'react';

import AceEditor from 'AceEditor';


function onChange(newValue) {
  console.log('change', newValue);
}

export const basic = (
  <AceEditor
    id="simple-editor"
    mode="javascript"
    theme="github"
    onChange={onChange}
  />
);
