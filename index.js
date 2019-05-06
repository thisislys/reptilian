exports.download = function download(url, dirname) {
  return new Promise((resolve, reject) => {
    let http = require("http");
    let https = require('https');
    let fs = require("fs");
    const util = require("util");
    let cheerio = require("cheerio");
    const mkdir = util.promisify(fs.mkdir);
    const writeFile = util.promisify(fs.writeFile);
    let temp = http;
    if(url.indexOf('https') >= 0) {
      temp = https;
    }
    temp.get(url, function(res) {
      var data = "";
      res.on("data",function(chunk) {
        data += chunk;
      });
      res.on("end",function() {
        if(data) {
          var $ = cheerio.load(data);
          $("img").each(function(i, elem) {
            let imgSrc = $(this).attr("src");
            let c = http;
            if(imgSrc.indexOf('https') >= 0) {
              c = https;
            }
            try {
              if(imgSrc.indexOf('?') >= 0) {
                bbb = imgSrc.match(/.+(.jpg|.png|.jpeg)/);
                if(bbb) {
                  bbb = bbb[0];
                } else {
                  bbb = imgSrc;
                }
              } else {
                bbb = imgSrc;
              }
              if(bbb.indexOf('https') < 0 || bbb.indexOf('http') < 0) {
                return;
              }
              c.get(bbb, function(res) {
                var imgData = "";
                res.setEncoding("binary");
                res.on("data", function(chunk) {
                  imgData += chunk;
                });
                res.on("end", function() {
                  imgPath = "/" + i + "." + bbb.split(".").pop();
                  if(!(fs.existsSync(dirname + "/imgs"))) {
                    mkdir(dirname + "/imgs");
                  }
                  writeFile(dirname + "/imgs" + imgPath, imgData,"binary");
                });
              });
            } catch(err) {
              console.error(err);
            }
          });
          resolve('success');
        }
      });
    }).on("error",function(err) {
      reject(err);
    });
  });
}