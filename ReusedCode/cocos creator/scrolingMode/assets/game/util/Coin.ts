/**
 * Author liushiqi
 * Date: 2019/1/10
 * Desc: 表示金币的数据结构
 */

 // 表示金币的数据结构, coin = value * (1000 ^ exponent)
export default class Coin {
  /**
   * 两个Coin相加，返回和
   * @param tCoinL 加数
   * @param tCoinR 加数
   */
  public static add(lhs: Coin, rhs: Coin): Coin {
    const tCoinL = lhs.clone();
    const tCoinR = rhs.clone();
    while (tCoinL.exponent !== tCoinR.exponent) {
      if (tCoinL.exponent > tCoinR.exponent) {
        tCoinR.incExp();
      } else if (tCoinL.exponent < tCoinR.exponent) {
        tCoinL.incExp();
      }
    }
    const ret = new Coin(tCoinL.value + tCoinR.value, tCoinL.exponent);
    return ret;
  }

  /**
   * 两个Coin相减，返回差
   * @param lhs 被减数
   * @param rhs 减数
   */
  public static sub(lhs: Coin, rhs: Coin): Coin {
    const rtmp = rhs.clone();
    rtmp.value = -rtmp.value;
    return this.add(lhs, rtmp);
  }

  /**
   * 比较两个Coin大小，左手边大则返回正数，相等则返回0，右手边大返回负数。
   * @param lhs 左手边
   * @param rhs 右手边
   */
  public static comp(lhs: Coin, rhs: Coin): number {
    const sub = Coin.sub(lhs, rhs);
    return sub.value;
  }

 /**
  * 根据基础的价格和购买的次数，返回商店应该显示的金币值
  * @param pNumBase 每个英雄的基础金钱
  * @param pNumTimes 每个英雄已经购买的次数
  * @param pNumFactor 英雄每次购买增长的系数
  */
  public static CreatePrice(pNumBase: number, pNumFactor: number, pNumTimes: number) {
    const tCoin: Coin = new Coin(pNumBase);
    tCoin.normalize();
    for (let i = 0 ; i < pNumTimes; i++) {
      tCoin.value *= pNumFactor;
      tCoin.normalize();
    }
    return new Coin(tCoin.value, tCoin.exponent);
  }

  /**
   * Coin的系数部分 coin = **value** * (1000 ^ exponent)
   */
  public value: number;

  /**
   * Coin的指数部分 coin = value * (1000 ^ **exponent**)
   */
  public exponent: number;

  /**
   * coin = value * (1000 ^ exponent)
   * @param value Coin的系数部分
   * @param exponent Coin的指数部分
   */
  public constructor(value?: number, exponent?: number) {
    this.value = value != null ? value : 0;
    this.exponent = exponent != null ? exponent : 0;
  }

  /**
   * 返回Coin的副本，避免引用传值
   */
  public clone() {
    return new Coin(this.value, this.exponent);
  }

  /**
   * 从另一个Coin中复制值
   * @param pCoin 被复制的Coin
   */
  public copyFrom(pCoin: Coin) {
    this.value = pCoin.value;
    this.exponent = pCoin.exponent;
  }

  /**
   * toString
   */
  public toString() {
    // todo
    const unit = ["", "K", "M", "G", "T", "E", "Z", "Y", "B"];
    const strExp = unit[this.exponent] === undefined ? 
      "*1000^" + this.exponent.toString() : unit[this.exponent];
    return this.value.toFixed(2).toString() + strExp;
  }

  /**
   * 将Coin化为标准格式（value in [0.1, 1000)
   */
  public normalize() {
    if (this.value === 0) {
      this.exponent = 0;
      return this;
    }

    let tExp = Math.log(Math.abs(this.value)) / Math.log(1000);
    tExp = Math.floor(tExp);
    this.value /= Math.pow(1000, tExp);
    this.exponent += tExp;
    return this;
  }

  /**
   * 将Coin的exponent增加num，value缩小相应的倍数
   * @param num 增加的exponent
   */
  public incExp(num: number = 1) {
    num = Math.round(num);
    this.value /= Math.pow(1000, num);
    this.exponent += num;
  }

  /**
   * 将Coin的exponent减少num，value放大相应的倍数
   * @param num 减少的exponent
   */
  private decExp(num: number = 1) {
    this.incExp(-num);
  }
}
