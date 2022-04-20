const camel2Underscore = str =>
  str.replace(/([A-Z])/g, '_$1').toLocaleLowerCase();
const underscore2Camel = str =>
  str.replace(/_[a-z]/g, match => match.slice(1).toLocaleUpperCase());

window.exports = {
  c2uList: {
    mode: 'list',
    args: {
      placeholder: '驼峰转下划线',
      search: (action, searchWord, callbackSetList) => {
        searchWord = searchWord.trim();
        if (!searchWord) return callbackSetList([]);
        if (!/^[a-z]+(?:[A-Z][a-z]+)+$/g.test(searchWord)) {
          return callbackSetList([]);
        }
        const result = [
          {
            title: camel2Underscore(searchWord),
            description: '复制 - 下划线变量名',
          },
        ];
        callbackSetList(result);
      },
      select: (action, itemData) => {
        window.utools.hideMainWindow();
        window.utools.copyText(itemData.title);
        window.utools.outPlugin();
      },
    },
  },
  u2cList: {
    mode: 'list',
    args: {
      placeholder: '下划线转驼峰',
      search: (action, searchWord, callbackSetList) => {
        searchWord = searchWord.trim();
        if (!searchWord) return callbackSetList([]);
        if (!/^[a-z]+(?:_[a-z]+)+$/g.test(searchWord)) {
          return callbackSetList([]);
        }
        const result = [
          {
            title: underscore2Camel(searchWord),
            description: '复制 - 小驼峰变量名',
          },
        ];
        callbackSetList(result);
      },
      select: (action, itemData) => {
        window.utools.hideMainWindow();
        window.utools.copyText(itemData.title);
        window.utools.outPlugin();
      },
    },
  },
  c2u: {
    mode: 'none',
    args: {
      enter: action => {
        window.utools.hideMainWindow();
        const result = camel2Underscore(action.payload);
        window.utools.copyText(result);
        window.utools.showNotification('"' + result + '" 已复制');
        window.utools.outPlugin();
      },
    },
  },
  u2c: {
    mode: 'none',
    args: {
      enter: action => {
        window.utools.hideMainWindow();
        const result = underscore2Camel(action.payload);
        window.utools.copyText(result);
        window.utools.showNotification('"' + result + '" 已复制');
        window.utools.outPlugin();
      },
    },
  },
};
