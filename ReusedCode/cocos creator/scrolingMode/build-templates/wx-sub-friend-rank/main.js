(function () {

  function boot() {
    var settings = window._CCSettings;
    window._CCSettings = undefined;

    if (!settings.debug) {
      var uuids = settings.uuids;

      var rawAssets = settings.rawAssets;
      var assetTypes = settings.assetTypes;
      var realRawAssets = settings.rawAssets = {};
      for (var mount in rawAssets) {
        var entries = rawAssets[mount];
        var realEntries = realRawAssets[mount] = {};
        for (var id in entries) {
          var entry = entries[id];
          var type = entry[1];
          // retrieve minified raw asset
          if (typeof type === 'number') {
            entry[1] = assetTypes[type];
          }
          // retrieve uuid
          realEntries[uuids[id] || id] = entry;
        }
      }

      var scenes = settings.scenes;
      for (var i = 0; i < scenes.length; ++i) {
        var scene = scenes[i];
        if (typeof scene.uuid === 'number') {
          scene.uuid = uuids[scene.uuid];
        }
      }

      var packedAssets = settings.packedAssets;
      for (var packId in packedAssets) {
        var packedIds = packedAssets[packId];
        for (var j = 0; j < packedIds.length; ++j) {
          if (typeof packedIds[j] === 'number') {
            packedIds[j] = uuids[packedIds[j]];
          }
        }
      }
    }

    var onStart = function () {
      cc.view.resizeWithBrowserSize(true);
      // init assets
      cc.AssetLibrary.init({
        libraryPath: 'res/import',
        rawAssetsBase: 'res/raw-',
        rawAssets: settings.rawAssets,
        packedAssets: settings.packedAssets,
        md5AssetsMap: settings.md5AssetsMap
      });

      cc.Pipeline.Downloader.PackDownloader._doPreload("WECHAT_SUBDOMAIN", settings.WECHAT_SUBDOMAIN_DATA);

      // load scene
      var launchScene = settings.launchScene;
      cc.director.loadScene(launchScene, null,
        function () {
          cc.loader.onProgress = null;
        }
      );
    };

    // jsList
    var jsList = [];
    var partnerBaseJs = "src/assets/partner/PartnerBase.js";
    var partnerWxJs = "src/partner/PartnerWechat.js";
    var projectJs = settings.debug ? 'src/project.dev.js' : 'src/project.js';
    jsList.push(partnerBaseJs);
    jsList.push(partnerWxJs);
    jsList.push(projectJs);

    var option = {
      id: 'GameCanvas',
      scenes: settings.scenes,
      debugMode: settings.debug ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
      showFPS: false,
      frameRate: 60,
      jsList: jsList,
      groupList: settings.groupList,
      collisionMatrix: settings.collisionMatrix,
      renderMode: 1
    };
    cc.game.run(option, onStart);
  }

  require(window._CCSettings.debug ? 'cocos2d-js.js' : 'cocos2d-js-min.js');
  var prevPipe = cc.loader.md5Pipe || cc.loader.assetLoader;
  cc.loader.insertPipeAfter(prevPipe, wxDownloader);
  boot();
})();
