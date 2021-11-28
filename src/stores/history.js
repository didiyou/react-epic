import { observable, action } from 'mobx'
import {Uploader} from '../models'
import { message } from 'antd'

class HistoryStore {
    @observable list = []
    @observable isLoading = false
    @observable hasMore = true
    @observable page = 0
    limit = 10
    @action append(newList){
        console.log('调用append')
        this.list = this.list.concat(newList)
        console.log('list:',this.list)
    }
    @action find(){
        this.isLoading = true
        Uploader.find({page:this.page,limit:this.limit})
            .then(newList =>{
                // newList = newList.map(x=>x.attributes)
                this.append(newList)
                console.log('从leancode获取的newList:',newList)
                this.page++
                if(newList.length < this.limit){
                    this.hasMore = false
                }
            }).catch(error=>{
                message.error('加载失败')
            }).finally(()=>{
                this.isLoading = false
            })
    }
    @action reset(){
        this.list=[]
        this.isLoading=false
        this.hasMore=true
        this.page=0
    }

    
}

export default new HistoryStore()