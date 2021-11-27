import React,{useEffect} from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'
import InfiniteScroll from 'react-infinite-scroll-component'
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
        const option={
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

            return ()=>{
                HistoryStore.reset()
            }
        })
        return(
            <div>
                <InfiniteScroll {...option}>
                    <List dataSource={HistoryStore.list}
                          renderItem={
                              item=>{
                                 <List.Item key={item.id}>
                                     <div>
                                         <Img   src={item.attributes.url.attributes.url} style={{height:'100px'}}/>
                                     </div>
                                     <div>
                                         <h5>{item.attributes.filename}</h5>
                                     </div>
                                     <div>
                                         <a terget='_blank' href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
                                     </div>
                                 </List.Item>
                              }
                          }
                    >
                    {HistoryStore.isLoading && HistoryStore.hasMore &&(
                        <div>
                            <Spin tip='加载中'/>
                        </div>
                    )}
                    </List>
                </InfiniteScroll>
            List...
            </div>
        )
    }
)


export default Component