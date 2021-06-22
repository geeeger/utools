const map = require('./city-map.json')

function createA(data) {
    return '' +
`| 城市 | 系统更新时间 | 当天日期 | 天气更新时间 |
| ---- | ------------ | -------- | ------------ |
| ${data.cityInfo.city} | ${data.time} | ${data.date} | ${data.cityInfo.updateTime} |\n`
}

function createB(data) {
    return '' +
`| 湿度 | pm2.5 | pm10 | 空气质量 | 温度 | 感冒提醒 |
| ---- | ----- | ---- | -------- | ---- | -------- |
| ${data.shidu} | ${data.pm25} | ${data.pm10} | ${data.quality} | ${data.wendu} | ${data.ganmao} |\n`
}

function createC(list) {
    return '' +
`| 日期 | 周   | 高温 | 低温 | 空气质量指数 | 风向 | 风力 | 天气 |
| ---- | ---- | ---- | ---- | -------- | ---- | ---- | ---- |
${list.map(data => `| ${data.ymd} | ${data.week} | ${data.high} | ${data.low} | ${data.aqi} | ${data.fx} | ${data.fl} | ${data.type} |\n`).join('')}`
}

window.exports = {
    "weather": {
        mode: "list",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action, callbackSetList) => {

                // window.utools.hideMainWindow()
                // window.utools.outPlugin()

                // console.log('插件装配完成')

                // // todo
            },

            search: (action, searchWord, callbackSetList) => {
                if (searchWord && map[searchWord]) {
                    callbackSetList(map[searchWord].map(item => ({
                        title: item.city_name,
                        ...item
                    })))
                }
                else {
                    callbackSetList()
                }
            },
            select: (action, itemData) => {
                window.utools.showNotification('加载中')
                fetch(`http://t.weather.itboy.net/api/weather/city/${itemData.city_code}`)
                    .then(r => r.json())
                    .then(r => {
                        window.utools.ubrowser.goto(createA(r) + '\n' +  createB(r.data) + '\n' + createC(r.data.forecast), itemData.city_name).run({ width: 1000, height: 600 })
                    })
                    .finally(() => {
                        window.utools.hideMainWindow()
                        window.utools.outPlugin()
                    })
             },
             // 子输入框为空时的占位符，默认为字符串"搜索"
             placeholder: "搜索"
        }
    }
}
