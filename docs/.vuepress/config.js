//导入生成侧边栏的工具类
const path = require('path')
const {
    sideBarTool
} = require(path.join(__dirname, './utils/index.js'))

// 需要排除的一些目录
let unDirIncludes = ['node_modules', 'assets', 'public', '网络工程']
// 只需要处理后缀的文件类型
let SuffixIncludes = ['md', 'html']
//使用方法生生成侧边栏
let rootPath = "./docs/markdown"
// 侧边栏
let javaSidebar = sideBarTool.genSideBarGroupMy("./docs/JavaNote", unDirIncludes, SuffixIncludes, {})
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
        nav: require('./nav'),
        sidebar: {
            '/markdown/': genMarkDownSideBar,
            '/JavaNote/': javaSidebar,
            // '/JavaNote/': [{
            //         title: 'javaSE',
            //         collapsable: true,
            //         //   sidebarDepth: 2,
            //         path: '/JavaNote/javaSE/javaSE',
            //         children: ['/JavaNote/javaSE/javaSE.md']
            //     },
            //     {
            //         title: 'javaWeb',
            //         collapsable: true,
            //         //   sidebarDepth: 2,
            //         children: ['/JavaNote/javaWeb/javaWeb.md']
            //     }, {
            //         title: 'SpringCloud',
            //         collapsable: true,
            //         //   sidebarDepth: 2,
            //         children: ['/JavaNote/SpringCloud/SpringCloud.md', {
            //             title: 'RabbitMQ',
            //             collapsable: true,
            //             //   sidebarDepth: 2,
            //             children: ['/JavaNote/SpringCloud/RabbitMQ/RabbitMQ.md']
            //         }]
            //     }
            // ],
        }
    },
    plugins: {
        '@vuepress/back-to-top': {},
        '@vuepress/medium-zoom': {},
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
        // '@vuepress/medium-zoom': {
        //     selector: 'img.zoom-custom-imgs',
        //     // medium-zoom options here
        //     // See: https://github.com/francoischalifour/medium-zoom#options
        //     options: {
        //       margin: 16
        //     }
        //   }
    }
}