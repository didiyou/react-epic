import AV,{Query,User} from 'leancloud-storage'

AV.init({
    appId: "zDhYDNKtz8MkbvA5dRnSJsO3-gzGzoHsz",
    appKey: "g795GOEC35qSkMbbzubQV5pA",
    serverURL: "https://zdhydnkt.lc-cn-n1-shared.com"
  })

  let user = new User()
  user.setUsername('huger')
  user.setPassword('123456')
  user.signUp().then(loginedUser=>{
      console.log('注册成功')
      console.log(loginedUser)},error=>{
          console.log(error)
      }
  )

const Auth = {
    register(username,password){
    let user = new User()
    user.setUsername('username')
    user.setPassword('password')
    return new Promise((resolve,reject)=>{
        user.signUp().then(loginedUser=>resolve(loginedUser),error=>{
            reject(error)
        })
    })
    },


login(username,password){
    return new Promise((resolve,reject)=>{
        user.logIn(username, password).then(loginedUser=>resolve(loginedUser),error=>reject(error))
    })
},
 logout(){
    user.logOut();
 },
 getCurrentUser(){
     return user.current()
 }
}

  export {Auth}