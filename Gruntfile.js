

module.exports = function(grunt) {

    // Project configuration.
    'use strict';
    grunt.initConfig({
        //读取pagekage.json
        pkg: grunt.file.readJSON('package.json'),
        //合并文件时在文件开头的注释
        banner:"/*!\n"+
               '* Light Blog v<%=pkg.version%> (<%=pkg.homepage%>)\n' +
                '* Copyright 2015-<%=grunt.template.today("yyyy") %> <%=pkg.author%> \n'+
                '* Licensed under the <%= pkg.license%> license\n'+
                '*/\n',
        //concat用于合并多个文件到一个文件,src表示被合并的文件,dest表示合并后的文件
        concat:
        {
            options:
            {
                banner:"<%=banner%>"
            },
            lightblog: {
                src: [
                    "js/dateformat.js",
                    "js/test2.js"

                ],
                dest: "dest/js/<%=pkg.name%>.js"
            }


        },


        //压缩js文件,w文件内的函数需要特定的形式+function($){}(Jquey) 否则会被忽略
        uglify: {
            options: {
                compress: {
                    warnings: false
                },
                mangle: true,
                preserveComments: 'some'
            },

            core:
                {
                    src: "<%=concat.lightblog.dest%>",
                    dest:'dest/js/<%=pkg.name%>.min.js'
                }



        },
        //单元测试
        qunit:
        {
            options:{
                //qunit需要phantomjs提供单元测试支持
                inject:'node_modules/grunt-contrib-qunit/phantomjs/bridge.js',
                //当单元测试出错或者没有单元测试时是否继续运行执行下一个任务
                force:true,
                //除了files指定的那些测试文件.还可以指定需要测试的url
                urls:[
                    "http://localhost:8000/index.html"
                ]
            },
            all: ['js/tests/**/*.html']

        },
        //用于检查js代码规范和错误
        jshint:{
            options:{
                //jshint的默认配置,可以时文件可以是数组
                jshintrc:'js/.jshintrc'
            },
            grunt:{
                options:{
                    jshintrc:'./.jshintrc'
                },
                src:['Gruntfile.js']
            },
            core:{
                src:'js/*.js'
            }
        },
        //配置用于单元测试的服务器
        connect:{
            server:{
                options:{

                    port:8000,
                    base:'js/tests/'
                }
            }
        },
        //监控文件变化,然后执行指定的任务
        watch:
        {
            src:{
                files:'<%=jshint.core.src%=>',
                tasks:['jshint:core','quint','concat']
            }
        }
    });

    // 加载压缩文件插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 加载包含 合并文件。
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 单元测试
    grunt.loadNpmTasks('grunt-contrib-qunit');
    //测试服务器
    grunt.loadNpmTasks('grunt-contrib-connect');
    //代码检测
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['connect','jshint',"concat",'jshint','uglify','qunit']);

};