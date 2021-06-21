const random = require('./unique-random-array')
const cats = require('./cat-names.json')

window.exports = {
    "cat-names": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action) => {
                window.utools.hideMainWindow()
                try {
                    const r = random(cats)()
                    window.utools.copyText(r)
                    window.utools.showNotification(`已复制: ${r}`)
                } catch (e) {
                    window.utools.showNotification(e.message)
                }
                
                window.utools.outPlugin()
            }
        }
    },

    "cat-names-all": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action) => {
                window.utools.hideMainWindow()
                try {
                    window.utools.copyText(JSON.stringify(cats))
                    window.utools.showNotification(`已复制列表`)
                } catch (e) {
                    window.utools.showNotification(e.message)
                }
                
                window.utools.outPlugin()
            }
        }
    }
}
