function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa( binary );
}

window.exports = {
    "cat-gif": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action) => {
                window.utools.hideMainWindow()
                fetch('https://cataas.com/cat/gif')
                    .then(response => response.blob())
                    .then(blob => {
                        let reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = function () {
                            window.utools.showNotification(window.utools.copyImage(reader.result) ? '成功' : '失败')
                            window.utools.outPlugin()
                        }
                        reader.onerror = function () {
                            throw new Error('读取喵喵图片失败')
                        }
                    })
                    .catch((e) => {
                        window.utools.showNotification(e.message)
                        window.utools.outPlugin()
                    })
            }
        }
    },
    "cat-gif-link": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action) => {
                window.utools.hideMainWindow()
                fetch('https://cataas.com/cat/gif?json=true')
                    .then(response => response.json())
                    .then(r => {
                        window.utools.copyText(`https://cataas.com${r.url}`)
                        window.utools.showNotification('复制喵喵链接成功！')
                        window.utools.outPlugin()
                    })
                    .catch((e) => {
                        window.utools.showNotification(e.message)
                        window.utools.outPlugin()
                    })
            }
        }
    }
}
