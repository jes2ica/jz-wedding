// pages/map/index.js

const app = getApp()
var server = app.globalData.server;
var appid = app.globalData.appid;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, 
  },
  navigate: function(e) {
    console.log(e)
    wx.openLocation({
      latitude: parseFloat('24.435587'),
      longitude: parseFloat('118.08955'),
      scale: 14,
      name: '厦门康莱德酒店',
      address: '厦门市思明区演武西路186号'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
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
  
  }
})