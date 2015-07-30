import React from 'react';

import { basic } from './editors/basic';
import { customMode } from './editors/customMode';

import './index.css';


React.render(
  <div>
    {basic}
    {customMode}
  </div>
, document.getElementById('container'));
