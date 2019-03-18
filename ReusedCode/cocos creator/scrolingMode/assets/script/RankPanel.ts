import RankListItem from "./RankListItem";
import { IUIPanel, RankItemData, IFrienInfodMap, IFriendInfo } from "../game/util/Misc";
import * as Misc from "../game/util/Misc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankPanel extends cc.Component {

  @property(cc.Prefab)
  public prefabListItem: cc.Prefab = null;

  @property(cc.Node)
  public nodeRankListContent: cc.Node = null;

  private myselfRankItemData: RankItemData = null;
  private rankItemDataList: RankItemData[] = [];

  private frameFilledRankIndex: number = -1;
  private rankSorted: boolean = false;

  public bublesortCycle(a: RankItemData[]) {

    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - 1 - i; j++) {
        if (a[j].cycle < a[j + 1].cycle) {
          let temp;
          temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
        }
      }
    }
  }

  public bublesortValue(a: RankItemData[]) {

    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - 1 - i; j++) {
        if (a[j].coinValue < a[j + 1].coinValue) {
          let temp;
          temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
        }
      }
    }
  }

  public bublesortIndex(a: RankItemData[]) {

    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - 1 - i; j++) {
        if (a[j].coinIndex < a[j + 1].coinIndex) {
          let temp;
          temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
        }
      }
    }
  }

  public async start() {
    this.frameFilledRankIndex = -1;

    // 获取好友的信息

    const friendDataList: any[] = await Misc.getFriendCloudStorage(["coin_value", "coin_index", "cycle", "top_hero"]);
    if (!friendDataList) {
      return;
    }



    // console.log("########my openid:", myOpenId);
    for (let i = 0; i < friendDataList.length; i++) {
      /*
     for (let i = 0; i < 50; i++) {
       const friendRankItemData = new RankItemData();
       friendRankItemData.name = "111111";
       friendRankItemData.id = 111111;
       friendRankItemData.cycle = 5;
       friendRankItemData.coinIndex = 3;
       friendRankItemData.coinValue = 4;
       friendRankItemData.rank = 1;
       */

      const friendData: any = friendDataList[i];
      const friendOpenId = friendData.openid;

      const friendRankItemData = new RankItemData();
      friendRankItemData.headUrl = friendData.avatarUrl;
      friendRankItemData.name = friendData.nickname;
      friendRankItemData.id = friendOpenId;
      const friendGameKVDataList: any = friendData.KVDataList;
      const friendGameData = Misc.extractKVObject(friendGameKVDataList);

      const friendCoinValue: number = parseInt(friendGameData.coin_value, 10);
      friendRankItemData.coinValue = friendCoinValue;

      const friendCoinIndex: number = parseInt(friendGameData.coin_index, 10);
      friendRankItemData.coinIndex = friendCoinIndex;

      const friendCycle: number = parseInt(friendGameData.cycle, 10);
      friendRankItemData.cycle = friendCycle;

      const friendTopName: string = friendGameData.top_hero;
      friendRankItemData.topname = friendTopName;


      this.rankItemDataList.push(friendRankItemData);

    }

    // 根据星数排名
    /*
    this.rankItemDataList = this.rankItemDataList.sort(function(a: RankItemData, b: RankItemData) {
      return b.star - a.star;
    });
    */

    this.bublesortValue(this.rankItemDataList);
    this.bublesortIndex(this.rankItemDataList);
    this.bublesortCycle(this.rankItemDataList);

    // 名次
    for (let i = 0; i < this.rankItemDataList.length; i++) {
      const rankItemData = this.rankItemDataList[i];
      rankItemData.rank = i + 1;
    }
    this.rankSorted = true;
  }

  public update() {
  if (!this.rankSorted) {
    return;
  }
  if (this.frameFilledRankIndex >= this.rankItemDataList.length - 1) {
    return;
  }

  // 每帧最多只有几个
  const frameMaxRankIndex = Math.min(this.frameFilledRankIndex + 5, this.rankItemDataList.length - 1);
  for (let i = this.frameFilledRankIndex + 1; i <= frameMaxRankIndex; i++) {
    const rankItemData = this.rankItemDataList[i];
    this.frameFilledRankIndex = i;
    // for (let j = 0 ; j < 3 ; j++) {
    const itemNode = cc.instantiate(this.prefabListItem);
    const rankListItem = RankListItem.GetComponent(itemNode);
    this.nodeRankListContent.addChild(itemNode);
    rankListItem.setPlayerData(rankItemData);
    rankListItem.setPhoto(rankItemData.headUrl);
    // }

  }
  this.frameFilledRankIndex = frameMaxRankIndex;
}

  /*
  private convertStar(star: string): number {
    if (star) {
      return parseInt(star, 10);
    }
    return 0;
  }
  */
}
