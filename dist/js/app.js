/**
 * Created by wmj on 15-7-13.
 */

requirejs.config({
    baseUrl:'/dist/js/lib',//定义js的根目录
    //定义子目录
    paths:{
        app:'../app'//'app/a.js'相当于baseUrl+app+'a.js'
        //backhone:'../lib/backhone'
    },
    //定义shim: 为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置。
    shim:{
        //在这里配置依赖和导出变量
       // 这里的'backhone'需要在paths指定对应的时那个路径的js
        //'backbone': {
        //    //These script dependencies should be loaded before loading
        //    //backbone.js
        //    deps: ['underscore', 'jquery'],
        //    //Once loaded, use the global 'Backbone' as the
        //    //module value.
        //    exports: 'Backbone',
        //    init:function(backhone)
        //    {
        //        //Using a function allows you to call noConflict for
        //        //libraries that support it, and do other cleanup.
        //        //However, plugins for those libraries may still want
        //        //a global. "this" for the function will be the global
        //        //object. The dependencies will be passed in as
        //        //function arguments. If this function returns a value,
        //        //then that value is used as the module export value
        //        //instead of the object found via the 'exports' string.
        //        //Note: jQuery registers as an AMD module via define(),
        //        //so this will not work for jQuery. See notes section
        //        //below for an approach for jQuery.
        //        return this.Foo.noConflict();
        //    }
        //}
    }

});
requirejs(['jquery'],function($){
    $('body').html('打算打算的');
});
requirejs(['jquery','app/module1'],function($,m1)
{  $('body').html(m1.toString());
})
requirejs(['jquery','app/module2'],function($,m2)
{
    console.log('m2',m2);
})
require(['jquery','app/module3'],function($,m3)
{
   console.log('m3', m3);
});
require(['jquery','app/module4'],function($,m4)
{
   console.log('m4',m4);
})
require(['jquery','app/commonJsModule'],function($){

})

//从包中加载模块
//§ 4.1
//RequireJS支持从CommonJS包结构中加载模块，但需要一些额外的配置。具体地，支持如下的CommonJS包特性：
//一个包可以关联一个模块名/前缀。
//package config可为特定的包指定下述属性：
//name: 包名（用于模块名/前缀映射）
//location: 磁盘上的位置。位置是相对于配置中的baseUrl值，除非它们包含协议或以“/”开头
//main: 当以“包名”发起require调用后，所应用的一个包内的模块。默认为“main”，除非在此处做了另外设定。该值是相对于包目录的。
//重要事项
//虽然包可以有CommonJS的目录结构，但模块本身应为RequireJS可理解的模块格式。例外是：如果你在用r.js Node适配器，模块可以是传统的CommonJS模块格式。你可以使用CommonJS转换工具来将传统的CommonJS模块转换为RequireJS所用的异步模块格式。
//一个项目上下文中仅能使用包的一个版本。你可以使用RequireJS的多版本支持来加载两个不同的模块上下文；但若你想在同一个上下文中使用依赖了不同版本的包C的包A和B，就会有问题。未来可能会解决此问题。
//如果你使用了类似于入门指导中的项目布局，你的web项目应大致以如下的布局开始（基于Node/Rhino的项目也是类似的，只不过使用scripts目录中的内容作为项目的顶层目录）:
//project-directory/
//project.html
//scripts/
//require.js
//而下面的示例中使用了两个包，cart及store：
//project-directory/
//project.html
//scripts/
//cart/
//main.js
//store/
//main.js
//util.js
//main.js
//require.js
//project.html 会有如下的一个script标签：
//<script data-main="scripts/main" src="scripts/require.js"></script>
//这会指示require.js去加载scripts/main.js。main.js使用“packages”配置项来设置相对于require.js的各个包，此例中是源码包“cart”及“store”：
////main.js contents
////Pass a config object to require
//require.config({
//    "packages": ["cart", "store"]
//});
//
//require(["cart", "store", "store/util"],
//    function (cart,   store,   util) {
//        //use the modules as usual.
//    });
//对“cart”的依赖请求会从scripts/cart/main.js中加载，因为“main”是RequireJS默认的包主模块。对“store/util”的依赖请求会从scripts/store/util.js加载。
//如果“store”包不采用“main.js”约定，如下面的结构：
//project-directory/
//project.html
//scripts/
//cart/
//main.js
//store/
//store.js
//util.js
//main.js
//package.json
//require.js
//则RequireJS的配置应如下：
//require.config({
//    packages: [
//        "cart",
//        {
//            name: "store",
//            main: "store"
//        }
//    ]
//});
//减少麻烦期间，强烈建议包结构遵从“main.js”约定。

//多版本支持
//§ 4.2
//如配置项一节中所述，可以在同一页面上以不同的“上下文”配置项加载同一模块的不同版本。require.config()返回了一个使用该上下文配置的require函数。下面是一个加载不同版本（alpha及beta）模块的示例（取自test文件中）：
//<script src="../require.js"></script>
//<script>
//var reqOne = require.config({
//    context: "version1",
//    baseUrl: "version1"
//});
//
//reqOne(["require", "alpha", "beta",],
//    function(require,   alpha,   beta) {
//        log("alpha version is: " + alpha.version); //prints 1
//        log("beta version is: " + beta.version); //prints 1
//
//        setTimeout(function() {
//            require(["omega"],
//                function(omega) {
//                    log("version1 omega loaded with version: " +
//                    omega.version); //prints 1
//                }
//            );
//        }, 100);
//    });
//
//var reqTwo = require.config({
//    context: "version2",
//    baseUrl: "version2"
//});
//
//reqTwo(["require", "alpha", "beta"],
//    function(require,   alpha,   beta) {
//        log("alpha version is: " + alpha.version); //prints 2
//        log("beta version is: " + beta.version); //prints 2
//
//        setTimeout(function() {
//            require(["omega"],
//                function(omega) {
//                    log("version2 omega loaded with version: " +
//                    omega.version); //prints 2
//                }
//            );
//        }, 100);
//    });
//</script>
//注意“require”被指定为模块的一个依赖，这就允许传递给函数回调的require()使用正确的上下文来加载多版本的模块。如果“require”没有指定为一个依赖，则很可能会出现错误。