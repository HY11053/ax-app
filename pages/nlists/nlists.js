var app = getApp();
Page({
    data: {
        page:0
    },
    //内容详情页
    toArticle(event){
        let index = event.currentTarget.dataset.index
        swan.navigateTo({
            url: '/pages/article/article?index='+index,
        })
    },
    toNlist(event){
        let realPath = event.currentTarget.dataset.realpath
        swan.navigateTo({
            url: '/pages/nlists/nlists?real_path='+realPath,
        })
    },
    toIndex(event){
        swan.navigateTo({
            url: '/pages/index/index',
        })
    },

    onLoad: function (options) {
        // 监听页面加载的生命周期函数
        let realPath=options.real_path;
        this.setData({real_path:options.real_path})
        console.log(realPath)
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
        var that=this
        //文档列表
        swan.request({
            url: app.globalData.baseUrl+"nlistarticles/?real_path="+that.data.real_path, //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ articles:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    onShow: function() {
        // 监听页面加载的生命周期函数
        var that=this
        //当前栏目信息请求
        swan.request({
            url: app.globalData.baseUrl+"bnlist/?real_path="+that.data.real_path, //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                //console.log(res.data);
                that.setData({ thistypeinfos:res.data });
                swan.setPageInfo && swan.setPageInfo({
                    title:that.data.thistypeinfos.title+'-'+app.globalData.baseName,
                    keywords: that.data.thistypeinfos.keywords,
                    description:that.data.thistypeinfos.description,
                    articleTitle: that.data.thistypeinfos.title,
                    success: function () {
                        console.log(that.data.thistypeinfos.title);
                        console.log('普通文档列表页面基础信息设置完成');
                    }
                });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });

    },

    onHide: function() {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function() {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function() {
        // 监听用户下拉动作
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var that = this;
        // 显示加载图标
        swan.showLoading({
            title: '正在加载中',
        })
        that.setData({page:that.data.page+15})
        swan.request({
            url: app.globalData.baseUrl+"articles/?take=15&orderby=id&brandpic=1&typeid="+that.data.thistypeinfos.id+"&skip="+that.data.page,
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                var articles_list = that.data.articles;
                for (var i = 0; i < res.data.length; i++) {
                    articles_list.push(res.data[i]);
                }
                // 设置数据
                that.setData({
                    articles: that.data.articles
                })
                // 隐藏加载框
                swan.hideLoading();
            }
        })

    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});