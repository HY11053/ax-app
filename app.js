/**
 * @file app.js
 * @author swan
 */
App({
    onLaunch(options) {
        // do something when launch
    },
    onShow(options) {
        // do something when show
    },
    onHide() {
        // do something when hide
    },
    onError: function () {
        console.log('SWAN发生错误');
    },
    globalData: {
        baseUrl:'https://www.anxjm.com/api/',
        baseName:'安心加盟网',
    }
});
