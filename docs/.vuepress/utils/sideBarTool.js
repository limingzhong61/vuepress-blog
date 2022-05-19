const PATH = require('path')
const fs = require('fs')
const cons = require('consolidate')
const PRE_DIR_NAME = "./docs"
const PRE_MD_DIR_NAME = "md"
// 导入文件的工具类
const path = require('path')
const {
    fileHelper,stringTool
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
const sideBarTool = {
    /**
     * 创建一个侧边栏,支持多层级递归
     * @param {String} RootPath 目录路径
     * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
     * @param {Array} SuffixIncludes 需要处理的文件后缀
     * @returns {Object} 返回一个对象,如下所示
     * 
     * {
     * '/view/GFW/': [ 'index' ],
     * '/view/git/': [ 'index' ],
     * '/view/html/': [ 'day1', 'day2', 'day3', 'day4', 'day5' ],
     * }
     * 
     */
    genSideBar: (RootPath, unDirIncludes, SuffixIncludes) => {
        let sidebars = {}
        let allDirs = fileHelper.getAllDirs(RootPath, unDirIncludes)
        allDirs.forEach(item => {
            let dirFiles = fileHelper.getAllFiles(item, unDirIncludes, SuffixIncludes)
            let dirname = item.replace(RootPath, "")
            dirname = dirname.replace(/\\/g, '/')
            if (dirFiles.length > 0) {
                sidebars[dirname] = dirFiles
            }
        })
        // console.log(sidebars)
        return sidebars
    },
    genSideBarByFiles: (RootPath, unDirIncludes, SuffixIncludes) => {
        let sidebars = []
        let mdFileNameList = []
        // let allDirs = fileHelper.getAllDirs(RootPath, unDirIncludes)
        let allFiles = fs.readdirSync(RootPath)
        console.log(allFiles)
        // fileName:(string)
        allFiles.forEach(fileName => {
            let fileInfo = fs.statSync(RootPath + '\\' + fileName)
            // console.log(fileInfo)
            // 只处理固定后缀的文件
            if (fileInfo.isFile() && fileName.includes("md")) {
                if (fileName === "README.md") {
                    return; //跳过readme.md
                    mdFileNameList.push('') //官方归档：该目录下的README.md文件
                    return;
                }
                mdFileNameList.push(fileName.split('.')[0])
            }
        })
        console.log(mdFileNameList)
        return mdFileNameList
    },
    /**
     * 创建一个侧边栏(带分组),支持多层级递归
     * @param {String} RootPath 目录路径
     * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
     * @param {Array} SuffixIncludes 需要处理的文件后缀
     * @param {Object} param3 暂未用上(分组相关配置参数)
     * @returns {Array} 返回一个数组,如下所示
     * [{
     *  "title": "",
     *  "collapsable": true,
     *  "sidebarDepth": 2,
     *  "children": ["/view/"]
     *   },
     *  {
     *  "title": "GFW",
     *   "collapsable": true,
     *   "sidebarDepth": 2,
     *  "children": ["/view/GFW/"]
     *  },
     *  {
     *  "title": "html",
     *  "collapsable": true,
     *  "sidebarDepth": 2,
     *  "children": [
     *      ["/view/html/day1", "day1"],
     *      ["/view/html/day2", "day2"],
     *      ["/view/html/day3", "day3"],
     *      ["/view/html/day4", "day4"],
     *      ["/view/html/day5", "day5"]
     *    ]
     * }]
     */
    genSideBarGroup: (RootPath, unDirIncludes, SuffixIncludes, {
        title = '',
        children = [''],
        collapsable = true,
        sidebarDepth = 2
    }) => {
        // 准备接收
        debugger;
        let sidebars = []
        let allDirs = fileHelper.getAllDirs(RootPath, unDirIncludes)
        // console.log("allDirs:")
        // console.log(allDirs)
        allDirs.forEach((item) => {
            console.log(item)
            let children = fileHelper.getAllFiles(item, unDirIncludes, SuffixIncludes)
            // console.log("children")
            // console.log(children)
            let dirname = item.replace(RootPath, "")
            let titleTemp = item.replace(RootPath + '\\view', "")
            title = titleTemp.replace(/\\/g, '')
            if (children.length > 1) {
                children = children.flatMap((vo, idx) => [
                    [dirname.replace(/\\/g, '/') + vo, vo]
                ])
            }
            let Obj = {
                title,
                collapsable: true,
                sidebarDepth: 2,
                children: children.length > 1 ? children : [dirname.replace(/\\/g, '/')]
            }
            sidebars.push(Obj)
        })
        console.log(sidebars)
        return sidebars
    },
    genSideBarGroupMy: (RootPath, unDirIncludes,) => {
        // 准备接收
        let sidebars = []
        //
        // 处理文件
        // 处理该目录下的.md文件
        let linkPath = RootPath.replace(PRE_DIR_NAME, "")
        let fileChildren = fileHelper.getAllMdFiles(RootPath, unDirIncludes, SuffixIncludes)
        linkPath = stringTool.pathSeparatorFormat(linkPath)
        
        // let allChildren = []
        if (fileChildren.length > 0) {
            for (var i = 0; i < fileChildren.length; i++) {
                let title = fileChildren[i]
                fileChildren[i] = linkPath + fileChildren[i] + ".md"
                let children = [fileChildren[i]]
                children.push()
                let Obj = {
                    title: title,
                    collapsable: true,
                    sidebarDepth: 2,
                    children: children
                }
                sidebars.push(Obj)
            }
        }



        let allDirs = fileHelper.getAllDirs(RootPath, unDirIncludes)
        // console.log("allDirs:")
        // console.log(allDirs)
        
        allDirs.forEach((item) => {
            let sidebarObj = sideBarTool.genSideBarRecur(item)
            if (!sidebarObj) {
                return;
            }
            sidebars.push(sidebarObj)
        })
        // console.log(JSON.stringify(sidebars))
        return sidebars
    },
    /*{
        title = '',
        children = [''],
        collapsable = true,
        sidebarDepth = 2
     }
    */
    genSideBarRecur(path) {
        // item 格式：./docs/JavaNote\javaSE\
        // console.log(item)
        // console.log(typeof(item))
        //图片路径：如：docs\JavaNote\javaSE\javaSE\，不含有"."
        if (!path.includes(".")) {
            return;
        }
        let linkPath = path.replace(PRE_DIR_NAME, "")
        // 处理该目录下的.md文件
        let fileChildren = fileHelper.getAllFiles(path, unDirIncludes, SuffixIncludes)
        linkPath = linkPath.replace(/\\/g, '/').replace(/\/\//g, '/')
        let allChildren = []
        if (fileChildren.length > 0) {
            for (var i = 0; i < fileChildren.length; i++) {

                fileChildren[i] = linkPath + fileChildren[i] + ".md"
                allChildren.push(fileChildren[i])
            }
        }
        //处理该目录下的包含.md文件的子目录
        let dirChildren = fileHelper.getAllDirs(path, unDirIncludes, SuffixIncludes)
        // let childrenSideBars = []
        dirChildren.forEach((dirFullName) => {
            //图片路径：如：docs\JavaNote\javaSE\javaSE\，不含有"."
            if (!path.includes(".")) {
                return;
            }
            let childrenSideBarsItem = sideBarTool.genSideBarRecur(dirFullName, unDirIncludes, SuffixIncludes, {})
            //没有md文件,则不添加
            if (!childrenSideBarsItem || !childrenSideBarsItem.children ||
                childrenSideBarsItem.children.length <= 0) {
                return
            }
            // //需要把数组转为json 字符串
            // let itemStr = childrenSideBarsItem
            // //如果不是字符串才需要转换
            // if(typeof(addStr) !== typeof("")){
            //     itemStr =  JSON.stringify(childrenSideBarsItem)
            // }

            allChildren.push(childrenSideBarsItem)
        })
        // console.log("dirChildren")
        // console.log(dirChildren)
        // console.log("children")
        // console.log(children)
        let dirname = path.replace(PRE_DIR_NAME, "")
        // let titleTemp = item.replace(RootPath + '\\view', "")
        dirname = dirname.replace(/\\/g, '/')
        dirname = dirname.replace(/\/\//g, '/')
        // console.log(dirname)
        dirNames = dirname.split("/")
        // console.log(dirNames.toString())
        //因为 dirname = /JavaNote/ssm-crud/ssm-crud/，故减2
        title = dirNames[dirNames.length - 2]
        // console.log(dirNames.length)
        // console.log(dirNames[dirNames.length-1])
        // console.log(title)
        if(allChildren.length === 0){
            return null;
        }
        let Obj = {
            title: title,
            collapsable: true,
            sidebarDepth: 2,
            children: allChildren
        }
        return Obj
    },
    /**
     * // 侧边栏  
let javaSidebar = sideBarTool.genSideBarGroupMy("./docs/JavaNote", unDirIncludes, SuffixIncludes, {})
let jsSidebar = sideBarTool.genSideBarGroupMy("./docs/JSNote", unDirIncludes, SuffixIncludes, {})
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
                let itemConfig = sideBarTool.genSideBarGroupMy(dirFullName, unDirIncludes, SuffixIncludes, {})
                sideBarConfig[itemPath] = itemConfig
            }
        })
        return sideBarConfig
    }
}

module.exports = {
    stringTool,
    sideBarTool
}

// 需要排除的一些目录
let unDirIncludes = ['node_modules', 'assets', 'public', '网络工程']
// 只需要处理后缀的文件类型
let SuffixIncludes = ['md', 'html']
//使用方法生生成侧边栏
let rootPath = "./docs/markdown"
// 侧边栏
// let sidebar = sideBarTool.genSideBarGroup("./docs/JavaNote", unDirIncludes, SuffixIncludes, {})
// console.log(sidebar)
// let genSideBarVar =sideBarTool.genSideBarByFiles(rootPath, unDirIncludes, SuffixIncludes, {})
// console.log(genSideBarVar)
// let javaSidebar = sideBarTool.genSideBarGroupMy("./docs/JavaNote", unDirIncludes, SuffixIncludes, {})
// // console.log(JSON.stringify(javaSidebar))
// let jsSidebar = sideBarTool.genSideBarGroupMy("./docs/JSNote", unDirIncludes, SuffixIncludes, {})
// console.log(JSON.stringify(jsSidebar))
let sideBarConfig = sideBarTool.genSideBarConfig()
console.log(JSON.stringify(sideBarConfig))