const chalk = require('chalk')
const {Command} = require('commander')

let program = new Command('crate-react-app')
program.version('1.0.0')
.arguments('<must1> <must2> [optional]')// 设置命令行的参数 <> 必选 []可选项
.usage(`${chalk.green('<must1> <must2>')} [optional]`)
.action((must1,must2,optional,...args)=>{
  console.log(must1,must2,optional,args)
})
.parse(process.argv)