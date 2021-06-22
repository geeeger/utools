function rgb2hsl () {

    // define h,s,l
    var h,s,l;

    // get options
    var rgb = Array.prototype.slice.call(arguments);

    rgb = rgb.map(function (v) {
        return v/255.0;
    });

    var max = Math.max.apply(null, rgb),
        min = Math.min.apply(null, rgb);

    var delta = max - min;

    // l
    l = (max + min) / 2.0;

    // h
    if (max === min) {
        h = 0;
    }
    else if (max === rgb[0] && rgb[1] >= rgb[2]) {
        h = 60 * ((rgb[1] - rgb[2]) / delta);
    }
    else if (max === rgb[0] && rgb[1] < rgb[2]) {
        h = 60 * ((rgb[1] - rgb[2]) / delta) + 360;
    }
    else if (max === rgb[1]) {
        h = 60 * ((rgb[2] - rgb[0]) / delta) + 120;
    }
    else if (max === rgb[2]) {
        h = 60 * ((rgb[0] - rgb[1]) / delta) + 240;
    }

    // s
    if (l === 0 || max === min) {
        s = 0;
    }
    else if (l > 0 && l <= 0.5) {
        s = delta / (2 * l);
    }
    else {
        s = delta / (2 - 2 * l);
    }

    return {
        h: h,
        s: s,
        l: l
    };
}

window.exports = {
    "rgb2hsl": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action) => {
                window.utools.hideMainWindow()
                const r = JSON.stringify(rgb2hsl.apply(null, action.payload.split(',').map(n => Number(n))))
                window.utools.copyText(r)
                window.utools.showNotification(`已复制: ${r}`)
                window.utools.outPlugin()
            }
        }
    }
}
