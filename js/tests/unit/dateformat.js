/**
 * Created by wmj on 15-7-11.
 */
$(function(){


    //test第一个参数本次测试名,方便却分时那个错误
    QUnit.test('DateFormat.prettyDate testing',function(assert){



        function date(now,time,expected,msg)
        {
            assert.equal(DateFormat.prettyDate(now,time),expected,msg);
          
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
    //深度比较两个对象
    QUnit.test('deepEqual test',function(assert){

        var obj={
            a:'a',
            b:{
                b1:'b1'
            }
        };
        assert.deepEqual(obj,{a:'a',b:{b1:'b1'}},'deepEqual ok');
    });
    //指定函数体内断言函数assert.method的调用次数,如果调用次数不一致则报错
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
    //Register a callback to fire whenever the test suite begins.
    //details记录每次测试的信息
    QUnit.begin(function(details)
    {

        console.log(details);
    });

    // Register a callback to fire whenever the test suite ends.(所有test完成的时后)
    QUnit.done(function( details ) {
        console.log( "Total: ", details.total, " Failed: ", details.failed, " Passed: ", details.passed, " Runtime: ", details.runtime );
    });
   // Description: Register a callback to fire whenever an assertion completes.

    QUnit.log(function( details ) {
        if ( details.result ) {
            return;
        }
        var loc = details.module + ": " + details.name + ": ",
            output = "FAILED: " + loc + ( details.message ? details.message + ", " : "" );

        if ( details.actual ) {
            output += "expected: " + details.expected + ", actual: " + details.actual;
        }
        if ( details.source ) {
            output += ", " + details.source;
        }
        console.log( output );
    });
    //Register a callback to fire whenever a module begins.
    QUnit.moduleStart(function( details ) {
        console.log( "Now running: ", details.name );
    });

    //Register a callback to fire whenever a module ends.

    QUnit.moduleDone(function( details ) {
        console.log( "Finished running: ", details.name, "Failed/total: ", details.failed, details.total );
    });
    //Register a callback to fire whenever a test ends.(单个 test完成的时候)


    QUnit.testDone(function( details ) {
        console.log( "Finished running: ", details.module, details.name, "Failed/total: ", details.failed, details.total, details.duration );
    });
    console.log(

        //相当于php的var_dump()
        QUnit.dump.parse({a:1,b:2})
    )
    //相当于$.extends()
    QUnit.test( "QUnit.extend", function( assert ) {
        var base = {
            a: 1,
            b: 2,
            z: 3
        };
        QUnit.extend( base, {
            b: 2.5,
            c: 3,
            z: undefined
        } );

        assert.equal( base.a, 1, "Unspecified values are not modified" );
        assert.equal( base.b, 2.5, "Existing values are updated" );
        assert.equal( base.c, 3, "New values are defined" );
        assert.ok( !( "z" in base ), "Values specified as `undefined` are removed" );
    });

   // DEPRECATION Note: beforeEach and afterEach were previously named setup and teardown, which still exist and will be removed in QUnit 2.0.0.
   //     Examples:
  //  Example: Use the QUnit.module() function to group tests together:

    //使用模块对测试用例进行分组,可以在setup,和teartdown中配置tests回调函数中的this变量
    QUnit.module( "group a" );
    QUnit.test( "a basic test example", function( assert ) {
        assert.ok( true, "this test is fine" );
    });
    QUnit.test( "a basic test example 2", function( assert ) {
        assert.ok( true, "this test is fine" );
    });

    QUnit.module( "group b" );
    QUnit.test( "a basic test example 3", function( assert ) {
        assert.ok( true, "this test is fine" );
    });
    QUnit.test( "a basic test example 4", function(assert) {
        assert.ok( true, "this test is fine" );
    });

   // Example: A sample for using the beforeEach and afterEach callbacks



    QUnit.module( "module A", {
        beforeEach: function() {
            // prepare something for all following tests
        },
        afterEach: function() {
            // clean up after each test
        }
    });

   // Example: Hooks share the same context as their respective test


    QUnit.module( "module test beforeEach ", {
        beforeEach: function() {

            this.parts = 'part';
        }
    });

    QUnit.test( "module test beforeEach", function( assert ) {

        assert.equal( 'part', "part" );

    });


})