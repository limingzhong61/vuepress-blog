//导入顶部导航的工具类
const path = require('path')
const {
  navTool
} = require(path.join(__dirname, './utils/navTool.js'))
unDirIncludes = []
// let javaSidebar = navTool.genOneNavObject("./docs/md/JavaNote", unDirIncludes)
// console.log(JSON.stringify(javaSidebar))
module.exports = [
  // javaSidebar,
  {
    text: 'JavaScript进阶',
    items: [{
        text: '框架的设计 jQuery源码分析',
        link: '/senior-js/jquery/'
      },
      {
        text: 'markdown',
        link: '/md/markdown/markdown'
      },
      {
        text: 'Java',
        link: '/JavaNote/'
      },
    ]
  },
  {
    text: 'Java',
    items: [{
        text: 'javaSE',
        link: '/md/JavaNote/javaSE/javaSE'
      },
      {
        text: 'javaWeb',
        link: '/md/JavaNote/javaWeb/javaWeb'
      },
      {
        text: '现代前端工程实践方案 解锁webpack',
        link: '/spa/webpack/'
      },
      {
        text: 'Java',
        items: [{
            text: 'javaSE',
            link: '/md/JavaNote/javaSE/javaSE'
          },
          {
            text: 'javaWeb',
            link: '/md/JavaNote/javaWeb/javaWeb'
          },
          {
            text: '现代前端工程实践方案 解锁webpack',
            link: '/spa/webpack/'
          },
        ]
      }
    ]
  },
  {
    text: 'JSNote',
    items: [{
        text: 'JavaScript',
        link: '/JSNote/JavaScript/JavaScript'
      },
      {
        text: 'TODO-2',
        link: '/mobile/TODO2/'
      },
      {
        text: 'TODO-3',
        link: '/mobile/TODO3/'
      },
    ]
  },
  {
    text: 'front-end',
    items: [{
        text: 'html-css',
        link: '/md/front-end/html-css/html-css'
      },
      {
        text: 'TODO-2',
        link: '/node/TODO2/'
      },
      {
        text: 'TODO-3',
        link: '/node/TODO3/'
      },
    ]
  },
  {
    text: 'Github',
    link: 'https://github.com/CoderMonkie/v-blog'
  },
]