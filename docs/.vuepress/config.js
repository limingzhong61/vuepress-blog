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
    themeConfig: {
        nav: require('./nav'),
        sidebar: require('./sidebar')
    }
}