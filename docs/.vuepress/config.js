//导入生成侧边栏的工具类
const path = require('path')
const {
    sideBarTool
} = require(path.join(__dirname, './utils/sideBarTool.js'))
// const {
//     hopeTheme
// } = require("vuepress-theme-hope");

module.exports = {
    theme: "vuepress-theme-hope",
    title: 'codeOflI',
    description: '编程学习者',
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
        // markdown-it-anchor 的选项
        // anchor: {
        //     permalink: false
        // },
        // markdown-it-toc 的选项
        toc: {
            includeLevel: [1, 2, 3, 4, 5]
        },
        extendMarkdown: md => {
            md.use(require("markdown-it-disable-url-encode"));
        },
        externalLinks: {
            target: '_blank',
            rel: 'noopener noreferrer'
        }
    },
    themeConfig: {
        search: true,
        searchMaxSuggestions: 15,
        nav: require('./nav'),
        sidebar: sideBarTool.genSideBarConfig()

        // sidebar: {
        //     '/md/Markdown/': [{
        //         title: 'Markdown',
        //         collapsable: true,
        //         sidebarDepth: 3,    // 可选的, 默认值是 1
        //         children: [
        //             '/md/Markdown/Markdown.md',
        //             // '/senior-js/jquery/2',
        //         ]
        //     }],
        // }

    },
    plugins: {
        '@vuepress/nprogress': {},
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