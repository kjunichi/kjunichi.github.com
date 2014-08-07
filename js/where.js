/*
 * ZeroClipboardのswfの読み込みの謎に迫る
 */
/*!
* ZeroClipboard
* The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
* Copyright (c) 2014 Jon Rohan, James M. Greene
* Licensed MIT
* http://zeroclipboard.org/
* v2.1.6
*/
// where.js
(function() {
     var _window = window, _document = _window.document;
     
var _getDirPathOfUrl = function(url) {
    var dir;
    if (typeof url === "string" && url) {
      dir = url.split("#")[0].split("?")[0];
      dir = url.slice(0, url.lastIndexOf("/") + 1);
    }
    return dir;
};
  
  var _getCurrentScriptUrlFromErrorStack = function(stack) {
    var url, matches;
    if (typeof stack === "string" && stack) {
      matches = stack.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/);
      if (matches && matches[1]) {
        url = matches[1];
      } else {
        matches = stack.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/);
        if (matches && matches[1]) {
          url = matches[1];
        }
      }
    }
    return url;
  };
  var _getCurrentScriptUrlFromError = function() {
    var url, err;
    try {
      throw new _Error();
    } catch (e) {
      err = e;
    }
    if (err) {
      url = err.sourceURL || err.fileName || _getCurrentScriptUrlFromErrorStack(err.stack);
    }
    return url;
  };
  
 var _getCurrentScriptUrl = function() {
    var jsPath, scripts, i;
    //HTML5だとdocument.currentScriptで取得出来て簡単らしい。
    if (_document.currentScript && (jsPath = _document.currentScript.src)) {
      return jsPath;
    }
    
    // 以降はcurrentScript非対応の環境向けの処理臭い。
    
    scripts = _document.getElementsByTagName("script");
    if (scripts.length === 1) {
         // scriptタグが一つだけなら、俺しかいないだろ。
      return scripts[0].src || undefined;
    }
    
    // 複数scriptタグが存在している場合の処理
    if ("readyState" in scripts[0]) {
      for (i = scripts.length; i--; ) {
        if (scripts[i].readyState === "interactive" && (jsPath = scripts[i].src)) {
             // スクリプトタグでreadyStateがinteractiveになっているものがビンゴ！
          return jsPath;
        }
      }
    }
    if (_document.readyState === "loading" && (jsPath = scripts[scripts.length - 1].src)) {
         // DOM構築中だったら、最後のスクリプトタグで決め打ち
      return jsPath;
    }
    
    // これまで手を尽くして取得できなかったら、スタックトレースより取得を試みる模様。
    if (jsPath = _getCurrentScriptUrlFromError()) {
      return jsPath;
    }
    return undefined;
};

var _getUnanimousScriptParentDir = function() {
    var i, jsDir, jsPath, scripts = _document.getElementsByTagName("script");
    for (i = scripts.length; i--; ) {
      if (!(jsPath = scripts[i].src)) {
        jsDir = null;
        break;
      }
      jsPath = _getDirPathOfUrl(jsPath);
      if (jsDir == null) {
        jsDir = jsPath;
      } else if (jsDir !== jsPath) {
        jsDir = null;
        break;
      }
    }
    return jsDir || undefined;
};
  

var _getDefaultMyPath = function() {
  var jsDir = _getDirPathOfUrl(_getCurrentScriptUrl()) || _getUnanimousScriptParentDir() || "";
  return jsDir + "where.js";
};

console.log(_getDefaultMyPath());
console.log("_getCurrentScriptUrl()",_getCurrentScriptUrl());
console.log("_getUnanimousScriptParentDir()",_getUnanimousScriptParentDir());
})();
