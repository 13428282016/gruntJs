/*!
* Light Blog v0.0.1 (http://wmj.wyuol.com)
* Copyright 2015-2015 MingJie Wang 
* Licensed under the MIT license
*/
/**
 * Created by wmj on 15-7-10.
 */

+function (window, $ ) {
    'use strict'
    var DateFormat = function (options) {
        this.options = $.extend({}, DateFormat.DEFAULTS, options)
    }
    DateFormat.VERSION = '0.0.1';
    DateFormat.DEFAULTS =
    {};
    DateFormat.prettyDate = function (now, time) {

        var date = new Date(time || ""),
            diff = (((new Date(now || '')).getTime() - date.getTime()) / 1000),//获取时间差,以秒为单位
            dayDiff = Math.floor(diff / 86400);//获取天数差;
        //天数大于一个月的返回空;
        if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
            return;
        }
        //dayDiff ==0当天的,30秒前显示'秒',30秒-1分钟内显示'刚刚',1~2分钟之间,显示分钟和秒,2分钟~1小时之间,显示分,一小时~一天之间的显示小时
        //dayDiff  1~31天的显示"多少天前"
        //其他返回null
        return dayDiff === 0 && (
                diff < 30 && '刚刚' ||
                diff < 60 && (diff + '秒前' )||
                diff < 120 && ('1分' + ((diff == 60) ?'钟前' :diff-60 + '秒前' ))||
                diff < 3600 && (Math.floor(diff / 60) + '分钟前' )||
                diff < 86400 &&( Math.floor(diff / 3600) + '小时前')
            ) ||(dayDiff + '天前');


    }
    window.DateFormat = DateFormat;


}(window, jQuery)
/**
 * Created by wmj on 15-7-10.
 */


+function($)
{
    'use strict'
    $.extend({a:1});
}(jQuery);