const path = require('path')
const inquirer = require('inquirer')
const { pathExists, resolveCWDPath, copy, remove } = require('../utils')

async function downloadTemplate(name, options) {
  const cwdPath = process.cwd()
  const targetDirPath = resolveCWDPath(`${cwdPath}/${name}`)
  let isExist = await pathExists(targetDirPath)
  if (isExist) {
    if (options.force) {
      await remove(targetDirPath)
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
              value: true,
            },
            {
              name: 'Cancel',
              value: false,
            },
          ],
        },
      ])

      if (isRemove) {
        console.log(`\r\n  removing...`)
        try {
          await remove(targetDirPath)
          console.log('\r\n  remove success')
        } catch (error) {
          console.log('\r\n  remove failed:', error)
        }
      } else {
        await remove(targetDirPath)
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
    console.log(`\r\nScaffolding project in ${targetDirPath} \r\n`)
    try {
      console.log(`Done. Now run:\r\n`)
      console.log(`  cd ${name}\r`)
      console.log(`  npm install\r`)
      console.log(`  npm run start\r\n`)
      await copy(templatePath, targetDirPath)
    } catch (error) {
      console.log('  generate failed:', error)
    }
  }
}

module.exports = {
  downloadTemplate,
}
