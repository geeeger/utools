
// Parse Function
function modifyHex(hex) {
    if (hex.length == 4) {
      hex = hex.replace('#', '');
    }
    if (hex.length == 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return hex;
}


function hexToRgb(hex) {
    let x = [];
    hex = hex.replace('#', '')
    if (hex.length != 6) {
      hex = modifyHex(hex)
    }
    x.push(parseInt(hex.slice(0, 2), 16))
    x.push(parseInt(hex.slice(2, 4), 16))
    x.push(parseInt(hex.slice(4, 6), 16))
    return "rgb(" + x.toString() + ")"
}

window.exports = {
    "hex2rgb": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action) => {

                window.utools.hideMainWindow()
                const r = JSON.stringify(hexToRgb(action.payload))
                window.utools.copyText(r)
                window.utools.showNotification(`已复制: ${r}`)
                window.utools.outPlugin()
            }
        }
    }
}
