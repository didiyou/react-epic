import { observable, action, makeObservable } from 'mobx'
import {Auth} from '../models'
import UserStore from './user'
import HistoryStore from './history'
import ImageStore from './image'
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
            UserStore.pullUser()
            resolve(user)
        })
        .catch(err=>{
            UserStore.resetUser()
            console.log(err)
            reject(err)
        })
        })  
    }
    @action register() {
    return new Promise((resolve,reject)=>{
        Auth.register(this.values.username,this.values.password)
        .then(user=>{
            UserStore.pullUser()
            resolve(user)
        }).catch(err=>{
            UserStore.resetUser()
            reject(err)
        }
        )
    })   
    }


    @action logout(){
        HistoryStore.resetUser()
        Auth.logout()
        UserStore.resetUser()
        ImageStore.reset()
    }
}
    export default new AuthStore()