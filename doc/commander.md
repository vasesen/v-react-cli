// chalk 可以在终端显示颜色
// commander是一个完整的 node.js命令行解决方案 
// 通过.arguments可以为最顶层命令指数参数，对子命令而言 参数都包括在 .commander调用之中了 
//通过usage 选项可以修改帮助信息的首行提示
``
  const chalk = require('chalk')
  const {Command} = require('commander');
  console.log('process.argv',process.argv);
  new Command('create-react-app')
      .version('1.0.0')
      .arguments('<must1> <must2> [optional]')
      .usage(`${chalk.green('<must1> <must2>')} [optional]`)
      .action((must1,must2,optional,...args)=>{
        console.log(must1,must2,optional,args)
      })
      .parse(precess.argv )
``