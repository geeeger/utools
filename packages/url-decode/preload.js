window.exports = {
    "url-decode": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action) => {
                window.utools.copyText(decodeURIComponent(action.payload))
                window.utools.showNotification('复制成功')
                window.utools.hideMainWindow()
                window.utools.outPlugin()
            }
        }
    }
}
