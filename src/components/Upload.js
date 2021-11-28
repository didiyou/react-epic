import React,{useRef} from 'react'
import {useStores} from '../stores'
import {observer,useLocalStore} from 'mobx-react'
import { Upload ,Spin} from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { message } from 'antd'
import styled from 'styled-components'
const Result = styled.div`
    margin-top:30px;
    border:1px dashed #ccc;
    padding:20px;
`

const H1= styled.h1`
    margin:20px 0;
    text-align:center;
`
const Image = styled.div`
    max-width:300px;    
`

const Component = observer(()=>{
    const { Dragger } = Upload
    const refWidth = useRef()
    const refHeight = useRef()
    const {ImageStore,UserStore} = useStores()
    const store = useLocalStore(()=>({
        width:null,
        get widthStr(){
            return store.width ? `/w/${store.width}` : ''
        },
        setWidth(width){
            store.width = width
        },
        setHeight(height){
            store.height = height
        },
        height:null,
        get heightStr(){
            return store.height ? `/w/${store.height}` : ''
        },
        get fullStr(){
            return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
        }

    }))

    const bindWidthChange = ()=>{
        store.setWidth(refWidth.current.value)
    }
    const bindHeightChange = ()=>{
        store.setHeight(refHeight.current.value)
    }
    const props = {
        showUploadList:false,
        beforeUpload:file=>{
            ImageStore.setFile(file)
            ImageStore.setFilename(file.name)
            if(!UserStore.currentUser){
                message.warning('请先登录')
                return false
            }
            if(!/(svg$)|(jpg$)|(png$)|(jpeg$)|(gif$)/ig.test(file.type)){
                message.error('只能上传png/svg/jpg/gif格式的图片')
                return false
            }
            if(file.size > 2048*1024)
            {
                message.error('文件最大2M')
                return false
            }
            ImageStore.upload()
                .then(()=>{
                    message.success('上传文件成功')
                }).catch((err)=>{
                    message.error('上传失败')
                    console.log(err)
                })
            return false
        }
    }
    return(
        <>
            <Spin tip='上传中...' spinning={ImageStore.isUploading}>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或者拖拽上传</p>
                <p className="ant-upload-hint">
                    仅支持.png/.gif/.jpg/.svg格式的图片，图片最大2M
                </p>
            </Dragger>
            </Spin>
            {
                ImageStore.serverFile ? <Result>
                    <H1>上传结果</H1>
                    <dl>
                        <dt>
                            线上地址
                        </dt>
                        <dd><a target='_blank' href={ImageStore.serverFile.attributes.url.attributes.url}/>{ImageStore.serverFile.attributes.url.attributes.url}</dd>
                        <dt>文件名</dt>
                        <dd>{ImageStore.filename}</dd>
                        <dt>图片预览</dt>
                        <dd>
                            <Image src={ImageStore.serverFile.attributes.url.attributes.url}/>
                        </dd>
                        <dt>更多尺寸</dt>
                        <dd>
                            <input ref={refWidth} onChange={bindWidthChange} placeholder='最大宽度（可选）'/>
                            <input ref={refHeight}  onChange={bindHeightChange} placeholder='最大高度（可选）'/>
                        </dd>
                        <dd>
                            <a target='_blank' href={store.fullStr}>{store.fullStr}</a>
                        </dd>
                    </dl>
                </Result> : null
            }

        </>
    )
})
export default Component