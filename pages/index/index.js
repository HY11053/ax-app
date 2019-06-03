//获取应用实例
var app = getApp();
Page({
  data: {
    imgdatas: [
        {id:5703,imgurl:"https://m.anxjm.com/mobile/images/ucc.jpg"},
        {id:20582,imgurl:"https://m.anxjm.com/mobile/images/juneng.jpg"},
        {id:7396,imgurl:"https://m.anxjm.com/mobile/images/liangpin.jpg"},
    ],
      currentTab:0,
      page:0,
      basename:app.globalData.baseName
  },
    //滑动切换
    swiperTab: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },
    //点击切换
    clickTab: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    //搜索事件触发
    searchBtn:function()
    {
        this.setData({btn:true})
    },
    formSubmitHandle: function(e) {
        if ( e.detail.value.search== '') {
            swan.showToast({
                title:'搜索内容不能为空',
                duration: 2000,
                mask: true,
                icon: 'none'
            })
        }else{
            let search =e.detail.value.search
            swan.navigateTo({
                url: '/pages/search/search?keyword='+search,
            })
        }
    },
    //品牌换一换
    changeBrands:function(e){
        var that = this;
        // 显示加载图标
        swan.showLoading({
            title: '正在加载中',
        })
        that.setData({page:that.data.page+4})
        swan.request({
            url: app.globalData.baseUrl+"brandarticles/?take=4&orderby="+e.target.dataset.type+"&skip="+that.data.page,
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                var cbrand_list=[] ;
                for (var i = 0; i < res.data.length; i++) {
                    cbrand_list.push(res.data[i]);
                }
                //console.log(cbrand_list)
                // 设置数据
                if (e.target.dataset.type==='click'){
                    that.setData({
                        cbrands:cbrand_list
                    })
                }else {
                    that.setData({
                        newbrands:cbrand_list
                    })
                }
                // 隐藏加载框
                swan.hideLoading();
            }
        })
    },
    //内容详情页
    toArticle(event){
        // console.log(event);
        //获取点击跳转对应的下标
        let index = event.currentTarget.dataset.index
        swan.navigateTo({
            url: '/pages/article/article?index='+index,
        })
    },
    //品牌详情页
    toBrandArticle(event){
        let index = event.currentTarget.dataset.index
        swan.navigateTo({
            url: '/pages/brandarticle/brandarticle?index='+index,
        })
    },
    //品牌列表页
    toBrandList(event){
        let realPath = event.currentTarget.dataset.realpath
        //console.log(event)
        swan.navigateTo({
            url: '/pages/blists/blists?real_path='+realPath,
        })
    },
    //排行榜首页
    toPaihangbangindex(event){
        swan.navigateTo({
            url: '/pages/paihangbang/paihangbang',
        })
    },
    //文档列表页
    toNlist(event){
        let realPath = event.currentTarget.dataset.realpath
        swan.navigateTo({
            url: '/pages/nlists/nlists?real_path='+realPath,
        })
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
        swan.showLoading({
            title: '数据加载中 请稍后',
        })
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
        var that=this
        //品牌滚动推荐
        swan.request({
            url: app.globalData.baseUrl+"scrollbrandarticles/", //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ abrands:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //精品推荐
        swan.request({
            url: app.globalData.baseUrl+"clickbrands/", //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ cbrands:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //新品推荐
        swan.request({
            url: app.globalData.baseUrl+"latestbrands/", //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ newbrands:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //加盟费用
        swan.request({
            url: app.globalData.baseUrl+"brandnews/",
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ newarticles:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //安心网说
        swan.request({
            url: app.globalData.baseUrl+"getjmnews", //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ zhinanarticles:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //安心创业
        swan.request({
            url: app.globalData.baseUrl+"touzinews/", //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ touziarticles:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //选址筹备
        swan.request({
            url: app.globalData.baseUrl+"feiyongnews", //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ jingyingarticles:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        swan.hideLoading();
    },
    onShow: function() {
        // 监听页面显示的生命周期函数
        swan.setPageInfo && swan.setPageInfo({
            title: '安心加盟网-真实性连锁招商加盟项目综合服务平台',
            keywords: '安心加盟网，招商加盟网，加盟网',
            description: '安心加盟网站审核真实性连锁加盟好项目加盟网站,提供好的加盟项目加盟店,最新加盟项目,创业加盟项目加盟店,免费项目加盟网站承诺加盟店加盟真实项目加盟网站',
            articleTitle: '安心加盟网-真实性连锁招商加盟项目综合服务平台',
            success: function () {
                console.log('首页基础信息设置完成');
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
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    },

});
