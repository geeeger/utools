const fs = require('fs-extra')
const city = require('../packages/weather/city.json')

const m = {}

for (let index = 1; index < 12; index++) {
    city.map((item) => {
        var str = item.city_name.substr(0, index);
        if (str.length !== index) { return; }
        if (!m[str]) {m[str] = []}
        m[str].push(item)
    })
}

fs.writeFileSync('packages/weather/city-map.json', JSON.stringify(m))