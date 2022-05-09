//导入生成侧边栏的工具类
const path = require('path')
const {
    sideBarTool
} = require(path.join(__dirname, './utils/sideBarTool.js'))
 
// 需要排除的一些目录
let unDirIncludes = ['node_modules', 'assets', 'public', '网络工程']
// 只需要处理后缀的文件类型
let SuffixIncludes = ['md', 'html']
//使用方法生生成侧边栏
let rootPath = "./docs/md/markdown"
rootPath = "./docs"
// 侧边栏  
// let javaSidebar = sideBarTool.genSideBarGroupMy("./docs/JavaNote", unDirIncludes, SuffixIncludes, {})
// let jsSidebar = sideBarTool.genSideBarGroupMy("./docs/JSNote", unDirIncludes, SuffixIncludes, {})
let genMarkDownSideBar = sideBarTool.genSideBarByFiles(rootPath, unDirIncludes, SuffixIncludes, {})
module.exports = {
    title: '夕月',
    description: '~从后端到全栈开发~和夕月一起学~',
    head: [
        ['link', {
            rel: 'icon',
            href: '/img/logo.jpg'
        }],
        ['link', {
            rel: 'stylesheet',
            href: '/css/style.css'
        }],
    ],
    markdown: {
        lineNumbers: true,
        externalLinks: {
            target: '_blank',
            rel: 'noopener noreferrer'
        }
    }, 
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        nav: require('./nav'),
        sidebar: sideBarTool.genSideBarConfig() 
        // sidebar: {
        //     '/markdown/': genMarkDownSideBar,
        //     '/JavaNote/': javaSidebar,
        //     '/JSNote/':jsSidebar
        // }
        // sidebar: {
        //     '/md/JavaNote/': [{
        //         title: 'java',
        //         collapsable: true,
        //         children: [
        //             '/md/JavaNote/javaSE/javaSE.md',
        //             // '/senior-js/jquery/2',
        //         ]
        //     }],
        // }

    },
    plugins: {
        '@vuepress/back-to-top': {},
        // '@vuepress/medium-zoom': {},
        'vuepress-plugin-code-copy': {},
        '@vssue/vuepress-plugin-vssue': {
            // 设置 `platform` 而不是 `api`
            platform: 'github',
            locale: 'zh-CN',
            // 其他的 Vssue 配置
            owner: 'codeOflI',
            repo: 'vssue-local-test',
            clientId: 'f20f176ac06dd11b4cfb',
            clientSecret: '0283dfbfcaf67c7dcef198f82ea83f62d3f016bd',
        },
        'copyright': {

            noCopy: false, // 允许复制内容
            minLength: 100, // 如果长度超过 100 个字符
            authorName: "夕月",
        },
        'sitemap': {
            hostname: 'http://localhost:8080'
        },
        // '@vuepress/search': {
        //     search: true, //默认false
        //     searchMaxSuggestions: 10 // 默认是5
        // }
        
        '@vuepress/medium-zoom': {
            selector: 'img',
            // medium-zoom options here
            // See: https://github.com/francoischalifour/medium-zoom#options
            options: {
              margin: 16
            }
          }
    }
}