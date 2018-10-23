//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    will_show: false,
    has_guests: false,
    num_adults: 0,
    num_children: 0,
    record_id: '',
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

    // 查找当前用户的注册信息
    const db = wx.cloud.database()
    db.collection('users').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          record_id: res.data[0]._id
        })
        console.log('[数据库] [查询记录] 成功: ', res.data[0]._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  formSubmit: function (e) {
    var name = e.detail.value.name;
    var cellphone = e.detail.value.cellphone;

    const db = wx.cloud.database()
    if (this.data.record_id) {
      db.collection('users').doc(this.data.record_id).set({
        data: {
          name: name,
          cellphone: cellphone,
        },
        success: res => {
          wx.showToast({
            title: '修改成功',
          })
          console.log('[数据库] [修改记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '修改失败'
          })
          console.error('[数据库] [修改记录] 失败：', err)
        }
      })
    } else {
      db.collection('users').add({
        data: {
          name: name,
          cellphone: cellphone,
        },
        success: res => {
          wx.showToast({
            title: '注册成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '注册失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }
  },

  // Corresponds to the changes of "will show" switch.
  bindAttendChange: function (e) {
    this.setData({
      will_show: e.detail.value
    })
  },

  bindBringGuestsChange: function(e) {
    this.setData({
      has_guests: e.detail.value
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

})
