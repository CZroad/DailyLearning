;(function(){
  Partner = Partner.extends();

  Partner.getFriendData = function() {
    return wx.getFriendCloudStorage();
  };

  Partner.registerDomainCallback = function(callback) {
    wx.onMessage(callback);
  };

  Partner.getUserCloudStorage = function(keys, callback) {
    var options = {};
    options.keyList = keys;
    options.success = function(res) {
      callback(res.KVDataList);
    }
    options.fail = function() {
      callback(null);
    }
    wx.getUserCloudStorage(options);
  }

  Partner.getFriendCloudStorage = function(keys, callback) {
    var options = {};
    options.keyList = keys;
    options.success = function(res) {
      callback(res.data);
    }
    options.fail = function() {
      callback(null);
    }
    wx.getFriendCloudStorage(options);
  }

  Partner.getFriendUserInfo = function(openIds, callback) {
    var options = {};
    options.openIdList = openIds;
    options.lang = 'zh_CN',
    options.success = function(res) {
      callback(res.data);
    }
    options.fail = function() {
      callback(null);
    }
    wx.getUserInfo(options);
  }

  Partner.getUserHeadTexture = function(headUrl, callback) {
    var headImage = wx.createImage();
    headImage.onload = function() {
      var texture = new cc.Texture2D();
      texture.initWithElement(headImage);
      texture.handleLoadedTexture();
      callback(texture);
    };
    headImage.src = headUrl;
  }

})();
