function colorRGB2Hex(color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2]);
 
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}

window.exports = {
    "rgb2hex": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action) => {

                window.utools.hideMainWindow()
                const r = JSON.stringify(colorRGB2Hex(action.payload))
                window.utools.copyText(r)
                window.utools.showNotification(`已复制: ${r}`)
                window.utools.outPlugin()
            }
        }
    }
}
