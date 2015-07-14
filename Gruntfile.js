

module.exports = function(grunt) {

    var   configBridge=grunt.file.readJSON('configBridge.json');
    // Project configuration.
    'use strict';
    grunt.initConfig({
        //读取pagekage.json
        pkg: grunt.file.readJSON('package.json'),
        //读取配置文件

        //合并文件时在文件开头的注释
        banner:"/*!\n"+
               '* Light Blog v<%=pkg.version%> (<%=pkg.homepage%>)\n' +
                '* Copyright 2015-<%=grunt.template.today("yyyy") %> <%=pkg.author%> \n'+
                '* Licensed under the <%= pkg.license%> license\n'+
                '*/\n',
        //concat用于合并多个文件到一个文件,src表示被合并的文件,dist表示合并后的文件
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
                dest: "dist/js/<%=pkg.name%>.js"
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
                    dest:'dist/js/<%=pkg.name%>.min.js'
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
                src:['js/*.js']
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
                files:"<%=jshint.core.src%>",
                tasks:['connect','jshint:core','qunit']
            },
            less:
            {
                file:'less/**/*.less',
                tasks:'less'
            }
        },
        //删除文件或目录
        clean:
        {
            dist:{
                src:['dist']
            }
        },
        //复制文件
        copy:
        {
           jslib:{
               expand:true,
               cwd:'js/lib',
               src:'*.js',
               dest:'dist/js/lib'
           }
        },
        //less 把less文件解析为css文件
        less:{
            core:{
                options:{
                    strictMath:true,
                    sourceMap:true,
                    outputSourceFiles:true,
                    sourceMapURL:'<%=pkg.name%>.css.map',//指定map文件的URL
                    sourceMapFilename:'dist/css/<%=pkg.name%>.css.map'//map的URI
                },
                src:'less/<%=pkg.name%>.less',
                dest:'dist/css/<%=pkg.name%>.css'
            }

        },
        //给css样式添加浏览器前缀,使其兼容浏览器
        autoprefixer:{
            options:{
                browsers: configBridge.config.autoprefixerBrowsers//指定浏览器
            },

            core:{
                options:{
                        map:true
                },
                src:['dist/css/<%=pkg.name%>.css']
            }
        },
        //css语法检测
        csslint:
        {
            options:
            {
                csslintrc:'less/.csslintrc'//配置文件
            },
            core:{
                src:['dist/**/*.css']
            }
        },
        //压缩css文件
        cssmin:
        {
            options:{
                compatibility: 'ie8',
                keepSpecialComments: '*'
            },
            core:{

                expand:true,
                cwd:'dist/css',
                src: '*.css',
                extDot:'first',
                dest:'dist/css',
                ext:'.min.css'


            }
        },
        //csscomb CssComb:CSS属性排序工具一个超棒的前端开发工具,使用这个工具可以帮助你重新排列CSS中定义的属性,帮助你按照你预定义的排序格式生成新的CSS。
        csscomb:{
          options:{
                config:'less/.csscomb.json'
          },

            core:{

                expand:true,
                cwd:'dist/css',
                src:[ '*.css','!*.min.css'],
                dest:'dist/css/'
            }
        },
        exec:{
          npmUpdate:{
              command:'npm update'
          }
        },
        //压缩文件
        compress:
        {

            main:{
                options:
                {
                    archive:'<%=pkg.name%>-<%=pkg.version%>-dist.zip',

                    mode:'zip',
                    level:9,
                    pretty:true
                },
                files:[{
                    expand:true,
                    cwd:'dist/',
                    src:['**'],
                    dest:'<%=pkg.name%>-<%=pkg.version%>-dist'
                }]
            }
        }

    });

    // 加载压缩文件插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 加载包含 合并文件。
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 单元测试
    grunt.loadNpmTasks('grunt-contrib-qunit');
    //测试用的html服务器
    grunt.loadNpmTasks('grunt-contrib-connect');
    //代码检测
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //监视文件改动,并在改动时执行指定的任务
    grunt.loadNpmTasks('grunt-contrib-watch');
    //删除文件
    grunt.loadNpmTasks('grunt-contrib-clean');
    //复制文件
    grunt.loadNpmTasks('grunt-contrib-copy');
    //less把less转为css
    grunt.loadNpmTasks('grunt-contrib-less');
    //给css属性添加浏览器前缀
    grunt.loadNpmTasks('grunt-autoprefixer');
    //css语法检测
    grunt.loadNpmTasks('grunt-contrib-csslint');
    //压缩css文件
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //格式化css文件
    grunt.loadNpmTasks('grunt-csscomb');
    //用于执行一系列的npm命令
    grunt.loadNpmTasks('grunt-exec');
    //压缩文件
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.registerTask('default', ['connect','jshint',"concat",'jshint','uglify','qunit']);

};