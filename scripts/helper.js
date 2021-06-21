const fs = require('fs-extra')
const inquirer = require('inquirer')
const path = require('path')
const ejs = require('ejs')

const list = fs.readdirSync(`scripts/helpers`)
    .map(name => path.parse(name))
    .filter(name => name.ext === '.js')
    .map(name => name.name)

inquirer
  .prompt([
    {
        type: 'input',
        name: 'packageName',
        message: '插件名？',
        required: true
    },
    {
      name: "helperList",
      type: "checkbox",
      message: "需要使用的helper？(空格选择)",
      choices: list,
    },
  ])
  .then((answer) => {
    answer.helperList.forEach(element => {
        if (fs.existsSync(`packages/${answer.packageName}/${element}.js`)) {
            return;
        }
        fs.copyFileSync(`scripts/helpers/${element}.js`, `packages/${answer.packageName}/${element}.js`)
        fs.copyFileSync(`scripts/helpers/LICENSE.${element}`, `packages/${answer.packageName}/LICENSE.${element}`)
    });
  });