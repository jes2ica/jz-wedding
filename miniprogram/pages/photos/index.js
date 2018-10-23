//index.js
//获取应用实例
const app = getApp()
var server = app.globalData.server;
var appid = app.globalData.appid;

Page({
  data: {
    userInfo: {}, 
  },  
  onLoad: function () {
    var that = this
       
    wx.request({
      url: server,
      method: 'GET',
      data: { 'c': 'info', 'appid': appid},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
      
        that.setData({      
          slideList: res.data.slideList
        });
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function (res) {
    var that = this;
    //console.log(that.data);
    return {
      title: that.data.mainInfo.share,
      imageUrl: that.data.mainInfo.thumb,
      path: 'pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  }
})
