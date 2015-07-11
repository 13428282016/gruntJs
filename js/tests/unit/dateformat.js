/**
 * Created by wmj on 15-7-11.
 */
$(function(){


    console.log(DateFormat.prettyDate('2015/07/11 20:55:20','2015/07/11 20:55:10'));
    QUnit.test('DateFormat.prettyDate testing',function(assert){
        assert.equal(DateFormat.prettyDate('2015/07/11 20:55:20','2015/07/11 20:55:10'),'刚刚');
        assert.equal(DateFormat.prettyDate('2015/07/11 20:55:40','2015/07/11 20:55:10'),'30秒前');

        assert.equal(DateFormat.prettyDate('2015/07/11 20:56:00','2015/07/11 20:55:00'),'1分钟前');
        assert.equal(DateFormat.prettyDate('2015/07/11 20:56:10','2015/07/11 20:55:00'),'1分10秒前');
        assert.equal(DateFormat.prettyDate('2015/07/11 20:57:00','2015/07/11 20:55:00'),'2分钟前');
        assert.equal(DateFormat.prettyDate('2015/07/11 21:55:10','2015/07/11 20:55:10'),'1小时前');
        assert.equal(DateFormat.prettyDate('2015/07/11 21:55:10','2015/07/10 21:55:10'),'1天前');
    });

})