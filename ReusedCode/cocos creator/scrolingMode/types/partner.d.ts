declare module Partner {

  //获取游戏的好友数据
  function getUserCloudStorage(keys: string[], callback: Function);
  function getFriendCloudStorage(keys: string[], callback: Function);
  function getFriendUserInfo(openIds: string[], callback: Function);

  function getFriendData(callback: Function): any[];
  function getUserHeadTexture(headUrl: string, callback: Function);

  function registerDomainCallback(callback: Function);
}
