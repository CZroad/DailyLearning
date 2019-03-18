
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.ScrollView)
    private scvMy: cc.ScrollView = null;

    @property([cc.Node])
    private nodes: cc.Node[] = [];

    // 初始偏移量（用于控制优先显示第几个节点）
    private mStart: number = 0;

    // 最上面的节点
    private mBegin: number = 0 ;

    // 最下面的节点
    private mEnd: number = 6; 

    private mIsLock: boolean = false;
    public distance = 10;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.scvMy.node.on('scrolling', this.onScroll, this);
        this.scvMy.scrollToOffset(cc.v2(0, 0));
    }

    start () {

    }

    private onScroll(scv: cc.ScrollView) {
        // console.log(this.mCount);
        console.log("偏移量",scv.getScrollOffset().y);
        const offset = scv.getScrollOffset();
        if (offset.y < 70 + this.mStart) {this.mIsLock = true}
        if (offset.y -  (this.mStart + 70) > 0 && this.mIsLock === true) {
            this.nodes[this.mBegin].y -= 70 * 7;
            console.log(this.nodes[this.mBegin]);
            console.log(this.nodes[this.mBegin].y);
            this.mEnd = this.mBegin;
            this.mBegin ++;
            console.log("向上滑",this.mEnd);
            console.log("向上滑",this.mBegin);
            this.mIsLock = false;
            if (this.mBegin > 6) {
                this.mBegin = 0;
            }
        }
        if (offset.y < (this.mStart - 70) && this.mIsLock === true) {
            this.nodes[this.mEnd].y += 70 * 7;
            console.log(this.nodes[this.mEnd]);
            console.log(this.nodes[this.mEnd].y);
            this.mBegin = this.mEnd;
            this.mEnd --;
            console.log("向下滑",this.mBegin);
            console.log("向下滑",this.mEnd);
            this.mIsLock = false;
            if (this.mEnd < 0 ) {
                this.mEnd = 6;
            }
        }
    }

    private ona() {
        console.log("Top");
    }

    private onb() {
        console.log("bottom");
    }

    // update (dt) {}
}
