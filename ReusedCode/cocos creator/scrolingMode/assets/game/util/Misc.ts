
export interface IUIPanel {
  dispose();
  ViewNode(): cc.Node;
  onBack();
  onFront();
}

export interface IFriendInfo {
  openId: string;
  gender: number;
}

export interface IFrienInfodMap {
  [key: string]: IFriendInfo;
}

export class RankItemData {
  public name: string;
  public cycle: number;
  public coinValue: number;
  public coinIndex: number;
  public headUrl: string;
  public id: number;
  public rank: number;
  public topname: string;
}

// 从微信返回的KVDataList 返回KVData Object
export function extractKVObject(KVDataList: any[]): any {
  const data: any = {};
  for (let i = 0; i < KVDataList.length; i ++) {
    const kvData        = KVDataList[i];
    const key: string   = kvData.key;
    const value: string = kvData.value;
    data[key] = value;
  }
  return data;
}


// 需要
export async function getUserHeadTexture(headUrl: string): Promise<cc.Texture2D> {
  const p = new Promise<cc.Texture2D>((resolve, reject) => {
    Partner.getUserHeadTexture(headUrl, function(texture: cc.Texture2D) {
      resolve(texture);
    });
  });
  return p;
}

//  不需要
export async function getUserCloudStorage(keys: string[]): Promise<any> {
  const p = new Promise<any>((resolve, reject) => {
    Partner.getUserCloudStorage(keys, function(res) {
      resolve(res);
    });
  });
  return p;
}


// 需要
export async function getFriendCloudStorage(keys: string[]): Promise<any> {
  const p = new Promise<any>((resolve, reject) => {
    Partner.getFriendCloudStorage(keys, function(res) {
      resolve(res);
    });
  });
  return p;
}

// 不需要
export async function getFriendUserInfo(openIds: string[]): Promise<any> {
  const p = new Promise<any>((resolve, reject) => {
    Partner.getFriendUserInfo(openIds, function(res) {
      resolve(res);
    });
  });
  return p;
}
