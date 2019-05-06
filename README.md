# Node.js图片爬虫


# Install
```sh
  npm i nodereptilian
  
  vi test.js

  const nodereptilian = require('nodereptilian');
  var url = "http://bbs.fengniao.com/forum/10559203.html";
  nodereptilian.download(url, __dirname).then(value => console.log(value));

  node test.js
```
