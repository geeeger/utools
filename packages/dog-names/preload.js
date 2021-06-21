const uniqueRandomArray = require('./unique-random-array');
const flatZip = require('./flat-zip');
const femaleDogNames = require('./female-dog-names.json');
const maleDogNames = require('./male-dog-names.json');

const allDogNames = flatZip([femaleDogNames, maleDogNames]);

window.exports = {
    "dog-names": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action) => {
                window.utools.hideMainWindow()
                try {
                    const r = uniqueRandomArray(allDogNames)()
                    window.utools.copyText(r)
                    window.utools.showNotification(`已复制: ${r}`)
                } catch (e) {
                    window.utools.showNotification(e.message)
                }
                
                window.utools.outPlugin()
            }
        }
    },

    "dog-names-all": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action) => {
                window.utools.hideMainWindow()
                try {
                    window.utools.copyText(JSON.stringify(allDogNames))
                    window.utools.showNotification(`已复制列表`)
                } catch (e) {
                    window.utools.showNotification(e.message)
                }
                
                window.utools.outPlugin()
            }
        }
    },

    "dog-names-male": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action) => {
                window.utools.hideMainWindow()
                try {
                    const r = uniqueRandomArray(maleDogNames)()
                    window.utools.copyText(r)
                    window.utools.showNotification(`已复制: ${r}`)
                } catch (e) {
                    window.utools.showNotification(e.message)
                }
                
                window.utools.outPlugin()
            }
        }
    },

    "dog-names-female": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action) => {
                window.utools.hideMainWindow()
                try {
                    const r = uniqueRandomArray(femaleDogNames)()
                    window.utools.copyText(r)
                    window.utools.showNotification(`已复制: ${r}`)
                } catch (e) {
                    window.utools.showNotification(e.message)
                }
                
                window.utools.outPlugin()
            }
        }
    }
}
