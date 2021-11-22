import { observable, action, makeObservable } from 'mobx'
import {Auth} from '../models'
import userStore from './user'

class AuthStore {
    constructor(){
        makeObservable(this)
    }
    
    @observable values = {
        username: '',
        password: ''
    }
    @action setIsLogin(isLogin) {
        this.isLogin = isLogin
    }
    @action setUsername(username) {
        this.values.username = username
    }
    @action setPassword(password) {
        this.values.password = password
    }
    @action login() {
        return new Promise((resolve,reject)=>{
            Auth.login(this.values.username,this.values.password)
        .then(user=>{
            userStore.pullUser()
            resolve(user)
        })
        .catch(err=>{
            userStore.resetUser()
            console.log('成功')
            console.log(err)
            reject(err)
        })
        })  
    }
    @action register() {
    return new Promise((resolve,reject)=>{
        Auth.register(this.values.username,this.values.password)
        .then(user=>{
            userStore.pullUser()
            resolve(user)
        }).catch(err=>{
            userStore.resetUser()
            reject(err)
        }
        )
    })   
    }


    @action logout(){
        Auth.logout()
        userStore.resetUser()
    }
}
    export default new AuthStore()