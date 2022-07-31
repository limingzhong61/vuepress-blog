//导入顶部导航的工具类
const path = require('path')
const {
  navTool
} = require(path.join(__dirname, './utils/navTool.js'))
unDirIncludes = []
// let javaSidebar = navTool.genOneNavObject("./docs/md/JavaNote", unDirIncludes)
// console.log(JSON.stringify(javaSidebar))
module.exports = [
  // java nav
  {
    text: 'Java',
    items: [{
      text: 'Java基础',
      items: [{
          text: 'Java基础',
          link: '/md/JavaNote/Java基础/Java基础'
        },
        {
          text: 'OnJava8',
          link: '/md/JavaNote/OnJava8/OnJava8'
        }
      ]
    }, {
      text: 'SSM',
      items: [{
          text: 'MyBatis',
          link: '/md/JavaNote/MyBatis/MyBatis'
        },
        {
          text: 'Spring',
          link: '/md/JavaNote/Spring/Spring'
        }, {
          text: 'SpringMVC',
          link: '/md/JavaNote/SpringMVC/SpringMVC'
        }, {
          text: 'ssm-crud',
          link: '/md/JavaNote/ssm-crud/ssm-crud'
        }
      ]
    }, {
      text: 'SpringBoot',
      items: [{
          text: 'SpringBoot',
          link: '/md/JavaNote/SpringBoot/SpringBoot'
        },
        {
          text: 'SpringBoot高级',
          link: '/md/JavaNote/SpringBootHigh/SpringBootHigh'
        }
      ]
    }, {
      text: 'SpringCloud',
      link: '/md/JavaNote/SpringCloud/SpringCloud',
      items: [{
        text: 'SpringCloud',
        link: '/md/JavaNote/SpringCloud/SpringCloud',
      }]
    }, {
      text: '其他',
      items: [{
          text: 'maven',
          link: '/md/JavaNote/maven/maven'
        },
        {
          text: 'javaWeb',
          link: '/md/JavaNote/javaWeb/javaWeb'
        },
      ]
    }]
  },
  {
    text: 'JavaScript',
    items: [{
        text: 'JavaScript',
        link: '/md/JSNote/JavaScript/JavaScript'
      },
      {
        text: 'ES6',
        link: '/md/JSNote/JavaScript/ES6/ES6'
      },
      {
        text: 'jquery',
        link: '/md/JSNote/jquery/jquery'
      }, {
        text: 'vue',
        link: '/md/JSNote/vue/vue'
      },
    ]
  },
  {
    text: 'front-end',
    items: [{
        text: 'html-css',
        link: '/md/front-end/html-css/html-css'
      },

    ]
  }, {
    text: '数据库',
    items: [ {
      text: 'SQL 数据库',
      // link: '/md/JavaNote/MySQL/MySQL',
      items: [{
        text: 'MySQL',
        link: '/md/数据库/MySQL/MySQL'
      }]
    }, {
      text: 'NoSQL 数据库',
      // link: '/md/JavaNote/Redis/Redis',
      items: [{
        text: 'Redis',
        link: '/md/JavaNote/Redis/Redis',
      }]
    }]
  }, {
    text: '其他',
    items: [{
      text: 'docker',
      link: '/md/docker/docker'
    }, {
      text: 'git',
      link: '/md/git/git'
    }, {
      text: 'hexo',
      link: '/md/hexo/hexo'
    }, {
      text: 'linux',
      link: '/md/linux/linux'
    }, {
      text: 'Markdown',
      link: '/md/Markdown/Markdown'
    }, {
      text: 'nginx',
      link: '/md/nginx/nginx'
    }]
  },{
    text: '其他',
    items: [{
      text: 'docker',
      link: '/md/docker/docker'
    }, {
      text: 'git',
      link: '/md/git/git'
    }, {
      text: 'hexo',
      link: '/md/hexo/hexo'
    }, {
      text: 'linux',
      link: '/md/linux/linux'
    }, {
      text: 'Markdown',
      link: '/md/Markdown/Markdown'
    }, {
      text: 'nginx',
      link: '/md/nginx/nginx'
    }]
  },
  {
    text: 'Github',
    link: 'https://github.com/codeOflI/LearningNotes'
  },
]