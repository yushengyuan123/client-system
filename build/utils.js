const chalk = require('chalk')
const { say } = require('cfonts')

function logStats (proc, data) {
  let log = ''
  
  log += chalk.yellow.bold(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`)
  log += '\n\n'
  
  if (typeof data === 'object') {
    data.toString({
      colors: true,
      chunks: false
    }).split(/\r?\n/).forEach(line => {
      log += '  ' + line + '\n'
    })
  } else {
    log += `  ${data}\n`
  }
  
  log += '\n' + chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n'
  
  console.log(log)
}

function templateLog(logTitle) {
  return function (data, color) {
    let log = ''
    data = data.toString().split(/\r?\n/)
    data.forEach(line => {
      log += `  ${line}\n`
    })
    if (/[0-9A-z]+/.test(log)) {
      console.log(
        chalk[color].bold(`┏ ${logTitle} -------------------`) +
        '\n\n' +
        log +
        chalk[color].bold('┗ ----------------------------') +
        '\n'
      )
    }
  }
}

function electronMainLog () {
  return templateLog('ElectronMainProcess')
}

function electronRenderProcessLog() {
  return templateLog('ElectronRenderProcess')
}

function greeting () {
  const cols = process.stdout.columns
  let text = ''
  
  if (cols > 104) text = 'Freddieyu-VideoControls'
  else if (cols > 76) text = 'Freddieyu-|VideoControls'
  else text = false
  
  if (text) {
    say(text, {
      colors: ['yellow'],
      font: 'simple3d',
      space: false
    })
  } else console.log(chalk.yellow.bold('\n  electron-vue'))
  console.log(chalk.blue('  getting ready...') + '\n')
}

module.exports = {
  logStats,
  electronMainLog: electronMainLog(),
  electronRenderProcessLog: electronRenderProcessLog(),
  greeting
}
