'use strict';

const  chalk = require('chalk') 
const {Command} = require ('commander')
const fse = require('fs-extra');
const { spawn }= require('cross-spawn')
const path = require('path')
const packageJSON = require('../package.json');
const { resolve } = require('path');


async function init (){
  let projectName ;
   new Command(packageJSON.name)
   .version(packageJSON.version) 
   .arguments('<project-directory>')
   .usage(`${chalk.green('<project-directory>')}`)
   .action((name)=>{
      projectName = name
   })
   .parse(process.argv) //[node完整路径，当前node脚本路径,...其它参数]
   await createApp(projectName)
} 

async function createApp(projectName){
  let root = path.resolve(projectName) //得到将生成项目绝对路径
  fse.ensureDirSync(projectName) // 保证此目录是存在的，如果不存在，则新建
  
  const packageJSON = {
    name:projectName,
    version:'0.1.0',
    private:true
  }
  
  fse.writeFileSync(
    path.join(root,'package.json'),
    JSON.stringify(packageJSON,null,2)
  )

  const originalDirectory = process.cwd();//原始命令工作目录
  process.chdir(root); //change directory 改变工作目录
  console.log('projectName',projectName)
  console.log('root',root)
  await run(root,projectName,originalDirectory)
}

/**
 * 
 * @param {*} root 创建项目的路径
 * @param {*} projectName  项目名称
 * @param {*} originalDirectory 原来的工作目录
 */
async function run(root,projectName,originalDirectory){
  let scrpitName = 'react-scripts' // create 生成的代码里 源文件编译 启动服务放在了 react-srcipts
  let templateName = 'cra-template'
  const allDependencies = ['react','react-dom',scrpitName,templateName]
  console.log('安装包 这可能需要花点时间')
  await install(root,allDependencies)
  // 项目根目录  项目名字  verbose是否显示详细的信息， 原始的目录 模版的名称cra-template
  let data = [root, appName,true,originalDirectory,templateName]
  let source = `
    var init = require('react-scripts/scripts/init.js');
    init.apply(null,JSON.parse(process.argv[1]));
  `
  await executeNodeScript({cwd:process.cwd(),data,source})
  console.log('结束')
  process.exit(0)
}

async function executeNodeScript({cwd},data,source){
  return new Promise((resolve)=> {
    const child = spawn(
      process.execPath,//node可执行文件的路径
      ['-e',source,'--',JSON.stringify(data)], // node -e 'console.log('执行一个脚本')'
      {cwd,stdio:'inherit'} // 子 父 进程共享一个 输入输出
    ) 
    child.om('close',resolve)
  })
}

async function install(root,allDependencies){
  return new Promise(resolve =>{
    const Command = 'yarnpkg'
    const args = ['add','--exact',...allDependencies,'--cwd',root]
    console.log(Command,args)
    const child = spawn(Command,args,{stdio:'inherit'})
    child.on('close',resolve)
  })
}

module.exports = {
  init
};
