const PATH = require('path')
const fs = require('fs')
//字符函数
// 字符串工具类

const stringTool = {
    /**
     * 两个字符串是否相同
     * @param {String} string 第一个字符串
     * @param {String} substr 第二个字符串
     * @param {Boolean} isIgnoreCase 是否忽略大小写
     * @returns {Boolean} 相同为真，不同为假
     */
    contains: (string, substr, isIgnoreCase) => {
        //  大小转换成小写
        if (isIgnoreCase) {
            // toLowerCase() :把字符串转换为小写
            string = string.toLowerCase()
            substr = substr.toLowerCase()
        }
        // 截取单个字符
        let startChar = substr.substring(0, 1)
        // 获取字符串长度
        let strLen = substr.length
        for (let i = 0; i < string.length - strLen + 1; i++) {
            // charAt() :返回指定位置的字符
            if (string.charAt(i) === startChar) {
                // 如果从i开始的地方两个字符串一样,那就一样
                if (string.substring(i, i + strLen) === substr) {
                    return true
                }
            }
        }
        return false
    },
    /**
     * 将 '\\' 和 '//'换为'/'(url格式)
     * './docs\\python\\' -----> './docs/python/'
     * @param {string} s 
     * @returns {string} 格式化后的形式
     */
    pathSeparatorFormat(s) {
        return s.replace(/\\/g, '/').replace(/\/\//g, '/')
    }
}
// 文件助手
const fileHelper = {
    getCurrentDirName(absolutePath) {
        absolutePath = stringTool.pathSeparatorFormat(absolutePath)
        dirNames = absolutePath.split('/')
        return dirNames[dirNames.length - 1]
    },
    getAllMdFiles: (rpath, unDirIncludes = []) => {
        return fileHelper.getAllFiles(rpath, unDirIncludes, ["md"])
    },
    /**
     * 
     * @param {String} rpath 目录路径
     * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
     * @param {Array} SuffixIncludes 需要处理的文件后缀
     * @returns 
     */
    getAllFiles: (rpath, unDirIncludes = [], SuffixIncludes) => {
        let filenameList = []
        fs.readdirSync(rpath).forEach((file) => {
            let fileInfo = fs.statSync(rpath + '\\' + file)
            if (fileInfo.isFile() && !unDirIncludes.includes(file) && !stringTool.contains(file, "img", true)) {
                // 只处理固定后缀的文件
                if (SuffixIncludes.includes(file.split('.')[1])) {
                    //  过滤readme.md文件
                    if (file === 'readme.md' || file === 'README.md') {
                        file = ''
                    } else {
                        //  截取MD文档后缀名
                        file = file.replace('.md', '')
                    }
                    filenameList.push(file)
                }
            }
        })
        //  排序
        filenameList.sort()
        // console.log(filenameList)
        return filenameList
    },
    /**
     * 
     * @param {String} myPath 当前的目录路径
     * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
     * @returns {Array} result 所有的目录
     */
    getAllDirs: function getAllDirs(myPath = ".", unDirIncludes, ) {
        // 获取目录数据
        const items = fs.readdirSync(myPath)
        let result = []
        // 遍历目录中所有文件夹
        items.map(item => {
            let temp = PATH.join(myPath, item)
            // isDirectory() 不接收任何参数,如果是目录(文件夹)返回true,否则返回false
            // 如果是目录,且不包含如下目录
            if (fs.statSync(temp).isDirectory() && !item.startsWith(".") && !unDirIncludes.includes(item)) {
                result.push(myPath + '\\' + item + '\\')
                result = result.concat(getAllDirs(temp, unDirIncludes))
            }
        })
        // console.log(result)
        return result
    },
    /**
     * 获取当前路径下的所有目录
     * @param {String} myPath 当前的目录路径
     * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
     * @returns {Array} result 当前路径下的所有的目录
     */
    getCurrentSonDirNames: function getCurrentDirs(myPath = ".", unDirIncludes, ) {
        // 获取目录数据
        const items = fs.readdirSync(myPath)
        let result = []
        // 遍历目录中所有文件夹
        items.map(item => {
            let temp = PATH.join(myPath, item)
            // isDirectory() 不接收任何参数,如果是目录(文件夹)返回true,否则返回false
            // 如果是目录,且不包含如下目录
            if (fs.statSync(temp).isDirectory() && !item.startsWith(".") && !unDirIncludes.includes(item)) {
                result.push(item)
                // result = result.concat(getAllDirs(temp, unDirIncludes))
            }
        })
        // console.log(result)
        return result
    }
}

module.exports = {
    fileHelper,
    stringTool
}