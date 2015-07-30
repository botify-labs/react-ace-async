#react-ace-async

A react component for Ace 1.2.0.

This module has been inspired by https://github.com/securingsincity/react-ace with the main difference that **it dependends on ace** https://github.com/ajaxorg/ace instead of brace https://github.com/thlorenz/brace which is not that supported anymore.


## Why *-async ?

The module **loads `ace` asynchronously**. The reason is that ace is developped with AMD leading that I've been unable to require ace modules with CommonJS.

### Pros
- Ace is **pretty heavy** (core weights 350kb + ~300kb of submodules). Loading Ace asynchronously allows to load only the script you really need, specialy for the dozen of theme and modes you don't need but would have been loaded otherwise.

### Cons
- It leads to an unusual way to loads modules. For instead if you want to create custom modes. (see examples)
- `ace` can't be versionned with package.json dependencies.


## Bundler compatibility
- Webpack: OK
- Browserify: ? (didn't try but sources are coded with JSX, ES6)

##Install

The module isn't published on npm yet. You need to pull it from github.


##Usage

```javascript
import React from 'react';
import AceEditor from 'react-ace-async';

React.render(
  <AceEditor
    id="basic"
    mode="java"
    theme="github"
  />,
  document.getElementById('container')
);
```

`mode` can be either:
- a string matching any official modes https://github.com/ajaxorg/ace/blob/master/lib/ace/ext/modelist.js
- or a **custom mode** class, see examples https://github.com/zallek/react-ace/tree/master/example

`theme` can be a string matching any official themes https://github.com/ajaxorg/ace/blob/master/lib/ace/ext/themelist.js
