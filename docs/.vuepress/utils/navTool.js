const PATH = require('path')
const fs = require('fs')
const cons = require('consolidate')
const PRE_DIR_NAME = "./docs"
const PRE_MD_DIR_NAME = "md"
//导入文件的工具类
const path = require('path')
const {
    fileHelper,
    stringTool
} = require(PATH.join(__dirname, './fileHelper.js'))

/**
 * 自定义排序文件夹
 * @param  a
 * @param  b
 * @returns  { number }
 */

function sortDir(a, b) {
    let al = a.parent.toString().split("\\").length
    let bl = b.parent.toString().split("\\").length
    if (al > bl) {
        return -1
    }
    if (al === bl) {
        return 0
    }
    if (al < bl) {
        return 1
    }
}


// 侧边栏创建工具
const navTool = {
    getRootPath(rootPath) {
        return rootPath.replace(PRE_DIR_NAME + '/', "")
    },
    /**
     * 递归生成navItems
     * @param {string} RootPath 
     * @param {Array} unDirIncludes 
     * @param {Array} SuffixIncludes 
     * @returns 
     * [
            {text: '组件化开发 React专题', link: '/spa/react/'},
            {text: '组件化开发 Vue专题', link: '/spa/vue/'},
            {text: '现代前端工程实践方案 解锁webpack', link: '/spa/webpack/'},
        ]
     */
    genNavRecur: (RootPath, unDirIncludes, SuffixIncludes) => {
        // {
        //     text = '',
        //     items = [''],
        //     link = '',
        // }
        // 准备接收
        let navItems = []
        // unDirIncludes.push(item)
        // {text: 'Java', link: '/JavaNote/'},
        //处理文件====================
        let singleItem = {}
        
        let sonFiles = fileHelper.getAllMdFiles(RootPath)
        if (sonFiles.length === 1) {
            singleItem["text"] = sonFiles[0]
            singleItem["link"] = '/' + navTool.getRootPath(RootPath) + '/' + sonFiles[0]
            navItems.push(singleItem)
        } else {
            let mdItems = []
            singleItem["text"] = fileHelper.getCurrentDirName(RootPath)
            sonFiles.forEach(sonItem => {
                let singleItem = {}
                singleItem["text"] = sonItem
                singleItem["link"] = '/' + navTool.getRootPath(RootPath) + '/' +
                    sonItem + '/'
                singleItem["link"] = stringTool.pathSeparatorFormat(singleItem["link"])
                mdItems.push(singleItem)
            })
            singleItem["items"] = mdItems
            if (singleItem.items && singleItem.items.length !== 0) {
                navItems.push(singleItem)
            }
        }
        
        // 处理目录==================================
        // console.log(RootPath)
        let sonDirs = fileHelper.getCurrentSonDirNames(RootPath, unDirIncludes)
        sonDirs.forEach((dirItem) => {
            if (dirItem === fileHelper.getCurrentDirName(RootPath)) { //父子目录同名，子目录为图片路径
                return
            }
            let navItem = navTool.genNavRecur(RootPath + '/' + dirItem, unDirIncludes, SuffixIncludes)
            if (navItem.length !== 0) {
                navItems.push(navItem)
            }
        })
        // let allDirs = fileHelper.getCurrentSonDirNames(RootPath, unDirIncludes)
        // console.log("allDirs:")
        // console.log(allDirs)
        // allDirs.forEach((item) => {


        // })
        // console.log(JSON.stringify(sidebars))
        return navItems.length === 1 ? navItems[0] : navItems
    },
    /**
     * 
     * @param {*} RootPath 
     * @param {*} unDirIncludes 
     * 
     * {
        text: 'dirName',
        items: [
          {text: '框架的设计 jQuery源码分析', link: '/senior-js/jquery/'},
          {text: 'markdown', link: '/md/markdown/markdown'},
          {text: 'Java', link: '/JavaNote/'},
        ]
      },
     */
    genOneNavObject: (RootPath, unDirIncludes) => {
        currentDirName = fileHelper.getCurrentDirName(RootPath)
        let navObject = {}
        navObject["text"] = currentDirName
        navObject["items"] = navTool.genNavRecur(RootPath, unDirIncludes)
        return navObject
    },
    /**
     * // 侧边栏  
let javaSidebar = sideBarTool.getNavRecur("./docs/JavaNote", unDirIncludes, SuffixIncludes, {})
let jsSidebar = sideBarTool.getNavRecur("./docs/JSNote", unDirIncludes, SuffixIncludes, {})
     * @param {string} path 
        return：最终的侧边栏数据
        sidebar: {
            '/markdown/': genMarkDownSideBar,
            '/JSNote/': jsSidebar,
            '/JavaNote/': [{
                    "title": "java",
                    "collapsable": true,
                    "sidebarDepth": 2,
                    "children": ["/view/"]
                },
                {
                    "title": "html",
                    "collapsable": true,
                    "sidebarDepth": 2,
                    "children": [
                        ["/view/html/day1", "day1"],
                        {
                            title: '回调对象设计',
                            collapsable: true,
                            children: [
                                '/senior-js/jquery/3',
                                '/senior-js/jquery/4',
                            ]
                        }, ,
                        ["/view/html/day3", "day3"],
                    ]
                }
            ]
        }        
        
     */
    genSideBarConfig(path = PRE_DIR_NAME + "/md") {
        // 获取目录数据
        const items = fs.readdirSync(path)
        let sideBarConfig = {}
        // 遍历目录中所有文件夹
        const prePath = '/' + PRE_MD_DIR_NAME
        items.map(item => {
            let temp = PATH.join(path, item)
            // isDirectory() 不接收任何参数,如果是目录(文件夹)返回true,否则返回false
            // 如果是目录,且不包含如下目录
            if (fs.statSync(temp).isDirectory() && !item.startsWith(".") && !unDirIncludes.includes(item)) {
                let itemPath = prePath + '/' + item + '/'
                let dirFullName = path + '\\' + item + '\\'
                let itemConfig = navTool.genNavRecur(dirFullName, unDirIncludes, SuffixIncludes, {})
                sideBarConfig[itemPath] = itemConfig
            }
        })
        return sideBarConfig
    }
}

module.exports = {
    navTool
}

// 需要排除的一些目录
let unDirIncludes = ['node_modules', 'assets', 'public', '网络工程']
// 只需要处理后缀的文件类型
let SuffixIncludes = ['md', 'html']
//使用方法生生成侧边栏
let rootPath = "./docs/markdown"

// let javaSidebar = navTool.genOneNavObject("./docs/md/JavaNote/SpringCloud", unDirIncludes, SuffixIncludes, {})
// let javaSidebar = navTool.genOneNavObject("./docs/md/JavaNote", unDirIncludes, SuffixIncludes, {})
// console.log(JSON.stringify(javaSidebar))

// let sideBarConfig = navTool.genSideBarConfig()
// console.log(JSON.stringify(sideBarConfig))