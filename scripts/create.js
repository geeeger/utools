const fs = require('fs-extra')
const inquirer = require('inquirer')
const path = require('path')
const ejs = require('ejs')

inquirer.prompt([
    {
        type: 'input',
        name: 'packageName',
        message: '插件名？',
        required: true
    },
    {
        type: 'input',
        name: 'description',
        message: '描述？',
        required: true
    },
    {
        type: 'input',
        name: 'author',
        message: '开发人？',
        require: true,
    },
    {
        type: 'input',
        name: 'homepage',
        message: '地址？',
        require: true,
    }
])
    .then((answers) => {
        if (fs.existsSync(`packages/${answers.packageName}`)) {
            throw new Error('already existed!')
        }

        fs.ensureDirSync(`packages/${answers.packageName}`)

        const dirs = fs.readdirSync(`scripts/templates`)

        dirs.forEach(fileName => {
            const parsed = path.parse(fileName)

            if (parsed.ext === '.ejs') {
                const content = ejs.render(fs.readFileSync(`scripts/templates/${parsed.base}`, 'utf-8'), answers)
                fs.writeFileSync(`packages/${answers.packageName}/${parsed.name}`, content)
            } else {
                fs.copyFileSync(`scripts/templates/${parsed.base}`, `packages/${answers.packageName}/${parsed.base}`)
            }
        })
    })