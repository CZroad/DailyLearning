/*
*programer: ZhengMingqi
*desc:      可以循环滚动的Scrollview
*Tip: scrollview的view的锚点y必须为1 , view中显示节点个数只要显示出来的就算作一个
*/
const {ccclass, property} = cc._decorator;

@ccclass
export default class VerticalScrollView extends cc.Component {

    @property(cc.ScrollView)
    private scvMy: cc.ScrollView = null;


    // 节点的Y轴间距
    @property(cc.Integer)
    private distanceY: number = 0;

    // view中能显示子节点的数量
    @property(cc.Integer)
    private numOfChild: number = 0;

    @property(cc.Prefab)
    private prfChild: cc.Prefab = null;


    // 初始偏移量（用于控制优先显示第几个节点）
    public mStart: number = undefined;

    // 最上面的节点
    public mBegin: number = undefined ;

    // 最下面的节点
    public mEnd: number = undefined; 

    // 最上面的节点模拟的节点计数，从1开始计数
    public mTopIndex: number = undefined;

    // 最下面的节点模拟的节点计数
    public mBottonIndex: number = undefined;

    // 模拟节点最多有几个
    public mMaxIndex: number = undefined;

    // 实际的节点数量
    public mChildCount: number = undefined;

    // 子节点的高度
    public mItemHeight: number = undefined;

    // 触发移动的最小偏移量(子节点高度 + 节点Y轴距离)
    public mBaseOffset: number = undefined;
    
    // 节点的移动量
    public mMove: number = undefined;

    // content子节点数组
    public mNodes: cc.Node[] = []; 

    // content属性
    public mLayOut: cc.Layout = null;





    private mIsLock: boolean = false;

    // LIFE-CYCLE CALLBACKS:

   public onLoad () {
        this.mMaxIndex = 100;
        this.scvMy.node.on('scrolling', this.onScroll, this);
        const tContent: cc.Layout = this.scvMy.content.addComponent(cc.Layout);
        // 初始化content相关
        tContent.type = cc.Layout.Type.VERTICAL;
        tContent.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        tContent.spacingY = this.distanceY;
        tContent.verticalDirection = cc.Layout.VerticalDirection.TOP_TO_BOTTOM;
        tContent.affectedByScale = false;
        this.mLayOut = tContent;

        // 初始化属性相关
        this.mChildCount = Math.floor(this.numOfChild) + 2;
        for(let i =0 ; i < this.mChildCount; i++ ) {
            const tNode: cc.Node = cc.instantiate(this.prfChild);
            // *************************在此加入需要对子节点进行的初始化操作 TODO*********************************
            
            //

            this.scvMy.content.addChild(tNode);
            this.mNodes.push(tNode);
        }
        this.mItemHeight = this.scvMy.content.children[0].getContentSize().height
        this.mBaseOffset = this.mItemHeight + this.distanceY;
        // tContent的
        // const tTem: number = (this.mItemHeight * (this.mChildCount - 1.5) + this.distanceY * (this.mChildCount - 2))/(this.mItemHeight * this.mChildCount + this.distanceY * (this.mChildCount - 1));
        
        // 设置锚点确保上面还有一个节点便于移动
        this.scvMy.content.setAnchorPoint(0.5, 1);
        this.scvMy.content.setPosition(cc.v2(0, this.mItemHeight + this.distanceY));
        this.mStart = this.mItemHeight + this.distanceY;
        this.scvMy.scrollToOffset(cc.v2(0, 0)); 
        this.mBegin = 0;
        this.mEnd = this.mChildCount - 1;
        this.mTopIndex = 1;
        this.mBottonIndex = this.mChildCount;
        this.mMove = this.mBaseOffset * (this.mChildCount - 1);
        console.log(this.mStart);

    }

    public start () {
        this.mLayOut.type = cc.Layout.Type.NONE; 
    }

    private onScroll(scv: cc.ScrollView) {
        console.log("偏移量",scv.getScrollOffset().y);
        const offset = scv.getScrollOffset().y;
        if(this.slideUp(offset)) {
            return;
        } else {
            this.slideDown(offset);
        }


 
    }

    private slideDown(offset: number): boolean {
        console.log("slideDown called");
        if ( offset < this.mStart ) {
            this.mIsLock = false;
            // 滑到最顶端
            if (this.mTopIndex <= 1) {
                return true;
            }
            //移动节点
            this.mNodes[this.mEnd].y += this.mBaseOffset * (this.mChildCount - 1);
            this.mTopIndex -- ;
            this.mBottonIndex --;
            // ********************重新初始化节点 TODO******************

            // 
            this.mBegin = this.mEnd;
            this.mEnd --;
            if(this.mEnd < 0) {
                this.mEnd = this.mChildCount - 1;
            }
            

        }
        return false;
    }

    private slideUp(offset: number): boolean {
        // console.log("slideUp called");
        if(offset > this.mStart + this.mBaseOffset) {
            this.mIsLock = false;
            // 滑到最底端
            if (this.mBottonIndex >= this.mMaxIndex) {
                // console.log("bottonIndex", this.mBottonIndex);
                // console.log("MAXindex", this.mMaxIndex);
                return true;
            }

            // console.log("bottonIndex", this.mBottonIndex);
            // console.log("MAXindex", this.mMaxIndex);
            // console.log("bottonIndex", this.mBegin);
            // console.log("MAXindex", this.mEnd);
            // console.log("bottonIndex", this.mTopIndex);
            // console.log("MAXindex", this.mChildCount);
            // console.log("bottonIndex", this.mBaseOffset);
            // console.log("MAXindex", this.scvMy.content);

            this.mNodes[this.mBegin].y -= this.mBaseOffset * (this.mChildCount - 1);
            this.mTopIndex ++ ;
            this.mBottonIndex ++;
            // ********************重新初始化节点 TODO******************

            // 
            this.mEnd = this.mBegin;
            this.mBegin ++ ;
            if (this.mBegin >= this.mChildCount) {
                this.mBegin = 0;
            }

        }
        return false;
        
    }

    private myLock(offset) {
        if (this.mIsLock === true) {
           return; 
        }
        if(offset)
    }

    // private ona() {
    //     console.log("Top");
    // }

    // private onb() {
    //     console.log("bottom");
    // }

    // update (dt) {}
}
