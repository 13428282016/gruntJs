/**
 * Created by wmj on 15-7-11.
 */
/*!
 * Light Blog v0.0.1 (http://wmj.wyuol.com)
 * Copyright 2015-2015 MingJie Wang
 * Licensed under the MIT license
 */
/**
 * Created by wmj on 15-7-10.
 */
if (typeof jQuery === 'undefined') {
    throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
    'use strict';
    var version = $.fn.jquery.split(' ')[0].split('.')
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
        throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
    }
}(jQuery);

/**
 * Created by wmj on 15-7-10.
 */


+function()
{
    alert('test2');
}