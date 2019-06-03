//获取应用实例
var app = getApp();
Page({
  data: {
    imgdatas: [
        {id:2025045,imgurl:"https://m.u88.com/uploads/picture/92/7d/0e3e4085115f35610d9a2da9cfa2.jpg"},
        {id:2012519,imgurl:"https://m.u88.com/uploads/picture/dc/ef/6be81af68e04fb5a19e533daa157.jpg"},
        {id:2005015,imgurl:"https://m.u88.com/uploads/picture/b0/0d/cf7abd0a7f1a74c8d753df9974d2.png"},
        {id:2011164,imgurl:"https://m.u88.com/uploads/picture/69/bc/020f367ee05d7cc182e44d672d3a.png"},
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
        let realPath =''
        swan.navigateTo({
            url: '/pages/paihangbang/paihangbang?real_path='+realPath,
        })
    },
    //排行榜列表页
    toPaihangbang(event){
        let realPath = event.currentTarget.dataset.realpath
        swan.navigateTo({
            url: '/pages/paihangbang/paihangbang?real_path='+realPath,
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
        swan.showLoading({
            title: '数据加载中 请稍后',
        })
        swan.setPageInfo && swan.setPageInfo({
            title: '安心加盟网_连锁加盟开店创业好项目_最新致富商机尽在U88.com',
            keywords: 'U88,加盟,创业,加盟网,项目,致富,创业好项目',
            description: '安心加盟网，连锁加盟网，创业网，商机网，致富网，汇集各地招商加盟连锁代理好品牌，致富经，创业好项目，加盟店，连锁店，开店指导，打造中国最权威的创业加盟网。',
            articleTitle: '安心加盟网_连锁加盟开店创业好项目_最新致富商机尽在U88.com',
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
