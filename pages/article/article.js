var app = getApp();
let wxParser = require('../../wxParser/index');
Page({
    data: {
        showModal: false
    },
    telSubmit: function() {
        this.setData({
            showModal: true
        })
    },
    preventTouchMove: function() {
    },
    closeMod: function() {
        this.setData({
            showModal: false
        })
    },
    //内容详情页
    toArticle(event){
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
    //文档列表页
    toNlist(event){
        let realPath = event.currentTarget.dataset.realpath
        swan.navigateTo({
            url: '/pages/nlists/nlists?real_path='+realPath,
        })
    },
    //首页
    toIndex(event){
        swan.navigateTo({
            url: '/pages/index/index',
        })
    },
    formSubmitHandle: function(e) {
        var  that =this
        if ( e.detail.value.username== '') {
            swan.showToast({
                title:'姓名不能为空',
                duration: 2000,
                mask: true,
                icon: 'none'
            });
            return false;
        }
        // 判断手机号是否正确
        if (!(/^1[34578]\d{9}$/.test(e.detail.value.iphone))) {
            swan.showToast({
                title:'请输入正确的手机号码',
                duration: 2000,
                mask: true,
                icon: 'none'
            });
            return false;
        }
        swan.request({
            url: "https://mip.anxjm.com/mipbtphonecomplate/", //请求地址
            method: 'POST',
            dataType: 'json',
            data:{
                username:e.detail.value.username,
                iphone:e.detail.value.iphone,
                content:e.detail.value.content,
                host:'https://mip.anxjm.com/news/'+that.data.thisarticleinfos.id+'.html?referer=baidu_applet',
                realm:'mip.anxjm.com',
                job:'guestbook',
                title:'安心加盟网',
                cla:that.data.thisarticleinfos.brandtypename,
                combrand:that.data.thisarticleinfos.brandname,
                resolution:'resolution',
            },
            success: function (res) {
                swan.showToast({
                    title:'电话提交成功 我们将尽快与你们联系',
                    duration: 2000,
                    mask: true,
                    icon: 'none'
                });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    formSubmitHandle2: function(e) {
        var  that =this
        if ( e.detail.value.tusername== '') {
            swan.showToast({
                title:'姓名不能为空',
                duration: 2000,
                mask: true,
                icon: 'none'
            });
            return false;
        }
        // 判断手机号是否正确
        if (!(/^1[34578]\d{9}$/.test(e.detail.value.tiphone))) {
            swan.showToast({
                title:'请输入正确的手机号码',
                duration: 2000,
                mask: true,
                icon: 'none'
            });
            return false;
        }
        swan.request({
            url: "https://mip.anxjm.com/mipbtphonecomplate/", //请求地址
            method: 'POST',
            dataType: 'json',
            data:{
                username:e.detail.value.tusername,
                iphone:e.detail.value.tiphone,
                content:e.detail.value.tcontent,
                host:'https://mip.anxjm.com/news/'+that.data.thisarticleinfos.id+'.html?referer=baidu_applet-mod',
                realm:'mip.anxjm.com',
                job:'guestbook',
                title:'安心加盟网',
                cla:that.data.thisarticleinfos.brandtypename,
                combrand:that.data.thisarticleinfos.brandname,
                resolution:'resolution',
            },
            success: function (res) {
                swan.showToast({
                    title:'电话提交成功 我们将尽快与你们联系',
                    duration: 2000,
                    mask: true,
                    icon: 'none'
                });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    //拨打电话
    makePhoneCall(e) {
        let phoneNumber=e.currentTarget.dataset.phoneNumber
        swan.makePhoneCall({
            phoneNumber,
            fail: err => {
                swan.showModal({
                    title: '拨打失败',
                    content: '请检查是否输入了正确的电话号码',
                    showCancel: false
                });
            }
        });
    },
    onLoad: function (options) {
        this.setData({id:options.index})
        swan.showLoading({
            title: '数据加载中 请稍后',
        })
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
        var that=this
        //单页文档接口请求
        swan.request({
            url: app.globalData.baseUrl+"getarticle/?id="+that.data.id, //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ thisarticleinfos:res.data });
                let ht=res.data.body;
                wxParser.parse({
                    bind: 'richText',
                    html:ht ,
                    target: that,
                    enablePreviewImage: true, // 图片预览功能
                });
                if (that.data.thisarticleinfos.brandname)
                {
                    swan.setNavigationBarTitle({
                        title: that.data.thisarticleinfos.brandname
                    });
                } else{
                    swan.setNavigationBarTitle({
                        title: '安心加盟网内容资讯页'
                    });
                }
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });

        //品牌资讯
        swan.request({
            url: app.globalData.baseUrl+"getarticlebrandnews/?id="+that.data.id, //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ brandnews:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //相关品牌推荐
        swan.request({
            url: app.globalData.baseUrl+"articlephbrands/?id="+that.data.id, //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ brandarticles:res.data });
                //console.log(that.data)
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //文档栏目数据请求
        swan.request({
            url: app.globalData.baseUrl+"arctype/?aid="+that.data.id, //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ thistypeinfos:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    onShow: function() {
        // 监听页面加载的生命周期函数
        swan.hideLoading();
        var that=this
        console.log(that.data.id)
        swan.request({
            url: app.globalData.baseUrl+"getarticleinfo/?id="+that.data.id, //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                swan.setPageInfo && swan.setPageInfo({
                    title:res.data.title+'-'+app.globalData.baseName,
                    keywords: res.data.keywords,
                    description:res.data.description,
                    articleTitle: res.data.title,
                    releaseDate:res.data.created_at,
                    // 单张图时值可以是字符串
                    image: res.data.litpic,
                    success: function () {
                        console.log(res.data.title);
                        console.log('普通文档页面基础信息设置完成');
                    }
                });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        console.log(that.data.id)
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
    }
});