const fs = require('fs')

function end() {
    window.utools.outPlugin()
}

function genImageType(fileBuffer) {
    const imageBufferHeaders = [
        { bufBegin: [0xff, 0xd8], bufEnd: [0xff, 0xd9], suffix: 'jpeg' },
        {
         bufBegin: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
         suffix: 'png'
        },
        { bufBegin: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], suffix: 'gif' },
        { bufBegin: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], suffix: 'gif' }
    ]

    for (const imageBufferHeader of imageBufferHeaders) {
        let isEqual
        // 判断标识头前缀
        if (imageBufferHeader.bufBegin) {
            const buf = Buffer.from(imageBufferHeader.bufBegin)
            isEqual = buf.equals(
                //使用 buffer.slice 方法 对 buffer 以字节为单位切割
                fileBuffer.slice(0, imageBufferHeader.bufBegin.length)
            )
        }
        // 判断标识头后缀
        if (isEqual && imageBufferHeader.bufEnd) {
            const buf = Buffer.from(imageBufferHeader.bufEnd)
            isEqual = buf.equals(fileBuffer.slice(-imageBufferHeader.bufEnd.length))
        }
        if (isEqual) {
            return imageBufferHeader.suffix
        }
    }
    // 未能识别到该文件类型
    return ''
}

function svg2base64(string) {
    const header = 'data:image/svg+xml;base64,';
    return header + btoa(unescape(encodeURIComponent(svgString)));
}

function isSVG(pathString) {
    return /\.svg/i.test(pathString)
}

function copyText(text) {
    window.utools.copyText(text)
}

function notify(text) {
    window.utools.showNotification(text)
}

window.exports = {
    "tobase64": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: ({ payload }) => {
                window.utools.hideMainWindow()

                if (!Array.isArray(payload)) {
                    end()
                    return
                }

                // just 1
                const file = payload[0]

                if (isSVG(file.path)) {
                    const value = svg2base64(fs.readFileSync(file.path, 'utf-8'))
                    copyText(value)
                    notify('转换完成');
                    end();
                    return;
                }

                const buf = fs.readFileSync(file.path)

                const type = genImageType(buf)

                if (type) {
                    const value = `data:image/${type};base64,${buf.toString('base64')}`
                    copyText(value)
                    notify('转换完成');
                    end();
                    return;
                }

                window.tools.showMessageBox({
                    type: 'error',
                    buttons: ['确定'],
                    title: '不支持的类型',
                    message: '请检查文件是否正确'
                })
                .then(() => {
                    end()
                })
                .catch(() => {
                    end()
                })

                // todo
            }
        }
    }
}
