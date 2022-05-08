const PATH = require('path')
const fs = require('fs')
//字符函数
const {
    stringTool
} = require(PATH.join(__dirname, './index.js'))
// 文件助手
const fileHelper = {
    /**
     * 
     * @param {String} rpath 目录路径
     * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
     * @param {Array} SuffixIncludes 需要处理的文件后缀
     * @returns 
     */
    getAllFiles: (rpath, unDirIncludes, SuffixIncludes) => {
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
    // /**
    //  * 获取当前路径下的所有目录
    //  * @param {String} myPath 当前的目录路径
    //  * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
    //  * @returns {Array} result 当前路径下的所有的目录
    //  */
    //  getCurrentSonDirNames: function getCurrentDirs(myPath = ".", unDirIncludes, ) {
    //     // 获取目录数据
    //     const items = fs.readdirSync(myPath)
    //     let result = []
    //     // 遍历目录中所有文件夹
    //     items.map(item => {
    //         let temp = PATH.join(myPath, item)
    //         // isDirectory() 不接收任何参数,如果是目录(文件夹)返回true,否则返回false
    //         // 如果是目录,且不包含如下目录
    //         if (fs.statSync(temp).isDirectory() && !item.startsWith(".") && !unDirIncludes.includes(item)) {
    //             result.push('/' + item + '/')
    //             // result = result.concat(getAllDirs(temp, unDirIncludes))
    //         }
    //     })
    //     // console.log(result)
    //     return result
    // }
}

module.exports ={
    fileHelper
}