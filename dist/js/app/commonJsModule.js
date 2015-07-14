/**
 * Created by wmj on 15-7-13.
 */
//这种风格时commonjs的风格
define(function(require,exports,module){
    var $=require('jquery');
    $('body').append('commonjsmodule');
})