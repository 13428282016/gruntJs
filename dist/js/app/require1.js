/**
 * Created by wmj on 15-7-13.
 */
//使用require需要会执行callback,但是在外层使用require本脚本时获取不到callback的返回值m1,而已也不会按依赖顺序加载本脚本
require(['jquery','app/module1'],function($,m1){

    console.log('r1:',m1);
    return m1;
});