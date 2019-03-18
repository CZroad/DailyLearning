import { RankItemData } from "../game/util/Misc";
import {getUserHeadTexture } from "../game/util/Misc";
import Coin from "../game/util/Coin"
const {ccclass, property} = cc._decorator;

@ccclass
export default class RankListItem extends cc.Component {

  public static GetComponent(node: cc.Node): RankListItem {
    return node.getComponent(RankListItem);
  }

  
  @property(cc.Label)
  public labCoin: cc.Label = null; // 金币数量

  @property(cc.Label)
  public labPlayerName: cc.Label = null; // 玩家名字

  @property(cc.Label)
  public labRank: cc.Label = null; // 玩家排名

  @property(cc.Label)
  public labTopname: cc.Label = null; // 最高等级英雄

  @property(cc.Sprite)
  public sprPerson: cc.Sprite = null;  // 玩家头像

  @property([cc.Sprite])
  public sprTip: cc.Sprite[] = [];


  public start() {

  }

  public setPlayerData(data: RankItemData) {
    const tCoin = new Coin(data.coinValue, data.coinIndex);
    tCoin.normalize();
    this.labCoin.string = tCoin.toString();
    this.labPlayerName.string = data.name;
    if (data.rank <= 3) {
      this.sprTip[data.rank - 1].node.active = true;
    } else {
      this.labRank.string = data.rank.toString();
    }
    this.labTopname.string = data.topname;

  }

  public async setPhoto(ImageURL: string) {
    const tPhoto: cc.Texture2D = await getUserHeadTexture(ImageURL);
    if (tPhoto) {
      this.sprPerson.node.active = true;
      this.sprPerson.spriteFrame = new cc.SpriteFrame(tPhoto);
    }
  }

}
