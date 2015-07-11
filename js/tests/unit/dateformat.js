/**
 * Created by wmj on 15-7-11.
 */
$(function(){


    console.log(DateFormat.prettyDate('2015/07/11 20:55:20','2015/07/11 20:55:10'));
    //test第一个参数指当用例出错时会打印输出信息时显示在错误信息头部,方便却分时那个错误
    QUnit.test('DateFormat.prettyDate testing',function(assert){



        function date(now,time,expected)
        {
            assert.equal(DateFormat.prettyDate(now,time),expected);
          
        }
       date('2015/07/11 20:55:20','2015/07/11 20:55:10','刚刚');
       date('2015/07/11 20:55:40','2015/07/11 20:55:10','30秒前');

       date('2015/07/11 20:56:00','2015/07/11 20:55:00','1分钟前');
       date('2015/07/11 20:56:10','2015/07/11 20:55:00','1分10秒前');
       date('2015/07/11 20:57:00','2015/07/11 20:55:00','2分钟前');
       date('2015/07/11 21:55:10','2015/07/11 20:55:10','1小时前');
       date('2015/07/11 21:55:10','2015/07/10 21:55:10','1天前');
        date('2015/09/11 21:55:10','2015/07/10 21:55:10',undefined);
    });
    //需要异步操作后才能比较
    QUnit.test('asyncTest',function(assert){
        var done1=assert.async();
        var done2=assert.async();
        setTimeout(function(){
            assert.ok(true,'done1 ok');
            done1();
        },300)
        setTimeout(function(){
            assert.ok(true,'done2 fail');
            done2();
        },500)
    });
    //深度比较
    QUnit.test('deepEqual test',function(assert){

        var obj={
            a:'a',
            b:{
                b1:'b1'
            }
        };
        assert.deepEqual(obj,{a:'a',b:{b1:'b1'}},'deepEqual ok');
    });
    //指定函数体内断言函数assert.method的调用次数
    QUnit.test( "expect test", function( assert ) {
        assert.expect( 3 );

        function calc( x, operation ) {
            return operation( x );
        }

        var result = calc( 2, function( x ) {
            assert.ok( true, "calc() calls operation function" );
            return x * x;
        });

        assert.equal( result, 4, "2 squared equals 4" );
        assert.equal( result, 4, "2 squared equals 4" );
    });

// 第一参数是否包含有和第二个参数值一样的属性,deepEqual不同,prop可以比较两个来之不同构造函数的对象
    //The propEqual() assertion provides strictly (===) comparison of Object properties. Unlike deepEqual(), this assertion can be used to compare two objects made with different constructors and prototype.
    QUnit.test( "propEqual test", function( assert ) {
        function Foo( x, y, z ) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Foo.prototype.doA = function () {};
        Foo.prototype.doB = function () {};
        Foo.prototype.bar = 'prototype';

        var foo = new Foo( 1, "2", [] );
        var ba = {
            x : 1,
            y : "2",
            z : []
        };
        assert.propEqual( foo, ba, "Strictly the same properties without comparing objects constructors." );
    });

   //使用===号比较而不是==
    QUnit.test( "not strictEqual test", function( assert ) {
        assert.notStrictEqual( 1, "1", "String '1' and number 1 have the same value but not the same type" );
    });

    //push用于创建自定义断言Define a custom mod2 assertion that tests if the provided numbers are equivalent in modulo 2.
    QUnit.assert.mod2 = function( value, expected, message ) {
        var actual = value % 2;
        this.push( actual === expected, actual, expected, message );
    };

    QUnit.test( "mod2", function( assert ) {
        assert.expect( 2 );

        assert.mod2( 2, 0, "2 % 2 == 0" );
        assert.mod2( 3, 1, "3 % 2 == 1" );
    });
    //捕获第一参数(函数)抛的异常,如果改函数没抛异常,则断言失败
    QUnit.test( "throws", function( assert ) {

        function CustomError( message ) {
            this.message = message;
        }

        CustomError.prototype.toString = function() {
            return this.message;
        };

        assert.throws(
            function() {
                throw "error"
            },
            "throws with just a message, not using the 'expected' argument"
        );

        assert.throws(
            function() {
                throw new CustomError("some error description");
            },
            /description/,
            "raised error message contains 'description'"
        );

        assert.throws(
            function() {
                throw new CustomError();
            },
            CustomError,
            "raised error is an instance of CustomError"
        );

        assert.throws(
            function() {
                throw new CustomError("some error description");
            },
            new CustomError("some error description"),
            "raised error instance matches the CustomError instance"
        );

        assert.throws(
            function() {
                throw new CustomError("some error description");
            },
            function( err ) {
                return err.toString() === "some error description";
            },
            "raised error instance satisfies the callback function"
        );
    });


})