import React,{useEffect} from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'
import InfiniteScroll from 'react-infinite-scroller'
import { List,Spin } from 'antd'
import styled from 'styled-components'

const Img = styled.img`
    width:100px;
    height:120px;
    object-fit:contain;
    border:1px solid #eee;
`

const Component = observer(
    ()=>{
        const {HistoryStore} = useStores()
        
        
        const options={
            initialLoad:true,
            pageStart:0,
            loadMore(){
                    HistoryStore.find()
            },
            hasMore(){
                return(!HistoryStore.isLoading && HistoryStore.hasMore)
            },
            useWindow:true
        }
        
        useEffect(()=>{
            console.log('加载List')
            return ()=>{
                console.log('卸载List')
                HistoryStore.reset()
            }
        },[])
        window.HistoryStore = HistoryStore
        console.log('HistoryStore.list:',HistoryStore.list)
        return(
            <div>
                <InfiniteScroll {...options}>
                    {console.log('List组件获取的列表:',HistoryStore.list)}
                    <List dataSource={HistoryStore.list}
                    
                          renderItem={
                              item=>
                                 <List.Item key={item.id}>
                                     <div>
                                         <Img src={item.attributes.url.attributes.url} style={{height:'100px'}}/>
                                     </div>
                                     <div>
                                         <h5>{item.attributes.filename}</h5>
                                     </div>
                                     <div>
                                         <a terget='_blank' href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
                                     </div>
                                 </List.Item>
                              
                          }
                    >
                    {HistoryStore.isLoading && HistoryStore.hasMore &&(
                        <div>
                            <Spin tip='加载中'/>
                        </div>
                    )}
                    </List>
                </InfiniteScroll>
            </div>
        )
    }
)


export default Component