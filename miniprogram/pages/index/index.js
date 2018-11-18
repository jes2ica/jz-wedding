// pages/invitation/index.js
const app = getApp()
var server = app.globalData.server;
var appid = app.globalData.appid;
var touchDot = 0;//触摸时的原点  
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        animationData: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //创建动画
        var animation = wx.createAnimation({
            duration: 3600,
            timingFunction: "ease",
            delay: 600,
            transformOrigin: "50% 50%",

        })
        animation.scale(0.9).translate(10, 10).step();     //边旋转边放大
        //导出动画数据传递给组件的animation属性。
        this.setData({
            animationData: animation.export(),
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
})