import React from 'react';

import AceEditor from 'AceEditor';


function onChange(newValue) {
  console.log('change', newValue);
}

React.render(
  <AceEditor
    mode="javascript"
    theme="github"
    onChange={onChange}
    name="UNIQUE_DIV_ID"
  />
, document.getElementById('container'));
