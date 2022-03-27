const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')
const ora = require('ora')
const { isExistFile, copyTemplate, removeTemplate } = require('../utils')

async function downloadTemplate(name, options) {
  const cwdPath = process.cwd()
  const targetDirPath = path.join(cwdPath, name)
  if (isExistFile(targetDirPath)) {
    if (options.force) {
      await fs.remove(targetDirPath)
    } else {
      // 询问是否确定要覆盖
      let { isRemove } = await inquirer.prompt([
        {
          name: 'isRemove',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite',
            },
            {
              name: 'Cancel',
              value: false,
            },
          ],
        },
      ])

      if (isRemove === 'overwrite') {
        const spinner = ora(`\r\nRemoving...`)
        spinner.start()
        try {
          let result = await removeTemplate(targetDirPath)
          if (result) {
            spinner.succeed('remove success')
          }
        } catch (error) {
          spinner.fail('remove failed:', error)
        }
      }
    }
  } else {
    // 询问拉哪一个模板
    let { templateName } = await inquirer.prompt([
      {
        name: 'templateName',
        type: 'list',
        message: 'Choose which template to pull:',
        choices: [
          {
            name: 'react-template',
            value: 'react-template',
          },
          {
            name: 'vue-template',
            value: 'vue-template',
          },
        ],
      },
    ])

    // 获取模板路径
    let templatePath = path.join(__dirname, '..', 'template', templateName)
    console.log(templatePath, 'templatePath')
    copyTemplate(templatePath, targetDirPath)
  }
}

module.exports = {
  downloadTemplate,
}
