import AV,{Query,User} from 'leancloud-storage'

AV.init({
    appId: "zDhYDNKtz8MkbvA5dRnSJsO3-gzGzoHsz",
    appKey: "g795GOEC35qSkMbbzubQV5pA",
    serverURL: "https://zdhydnkt.lc-cn-n1-shared.com"
  })

  let user = new User()
//   user.setUsername('')
//   user.setPassword('')
//   user.signUp().then(loginedUser=>{
//       console.log('注册成功')
//       console.log(loginedUser)},error=>{
//           console.log(error)
//       }
//   )

const Auth = {
    register(username,password){
    let user = new User()
    user.setUsername(username)
    user.setPassword(password)
    return new Promise((resolve,reject)=>{
        user.signUp().then(loginedUser=>resolve(loginedUser),error=>{
            reject(error)
        })
    })
    },


login(username,password){
    return new Promise((resolve,reject)=>{
        console.log(username)
        user.logIn(username, password).then(loginedUser=>
            {
            console.log('上传成功')
            resolve(loginedUser)
        },error=>{
            console.log('error is :',error)
            reject(error)
        })
    })
},
 logout(){
    user.logOut();
 },
 getCurrentUser(){
     return user.current()
 }
}

const Uploader = {
    add(file,filename){
    const item = new AV.Object('Image')
    const avFile = new AV.File(filename,file)
    item.set('filename',filename)
    item.set('owner',AV.User.current())
    item.set('url',avFile)
    return new Promise((resolve,reject)=>{
        item.save().then((serverFile)=>{
            console.log('保存成功')
            resolve(serverFile)
        },
        error=>{console.log('保存失败')
        reject(error)}
    )
    })
    }
}
  export {Auth}