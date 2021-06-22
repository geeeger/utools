window.exports = {
    "url-encode": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action, callbackSetList) => {

                window.utools.copyText(encodeURIComponent(action.payload))
                window.utools.showNotification('复制成功')
                window.utools.hideMainWindow()
                window.utools.outPlugin()
            }
        }
    }
}
