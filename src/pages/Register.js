import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import styled from 'styled-components'
import {useStores} from '../stores'
import {useNavigate} from 'react-router-dom'
import { message } from 'antd'

const Wrapper = styled.div`
    max-width: 600px;
    margin:30px auto;
    box-shadow:2px 2px 4px 0 rgba(0,0,0,0.2);
    border-radius:4px;
    padding:20px;
`
const Title = styled.h1`
    text-align:center;
`
const Component = () => {
    const {AuthStore} =useStores()
    const history = useNavigate()
    const onFinish = (values) => {
        console.log('点击注册')
      console.log('Success:', values);
      AuthStore.setUsername(values.username)
      AuthStore.setPassword(values.password)
      AuthStore.register()
      .then(()=>{
        console.log('注册成功')
        history('./')
    })
      .catch(()=>{message.error('注册失败')})
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    
    const validateUsername = (rule,value)=>{
        if(/\W/.test(value)) return Promise.reject('只能是字母数字下划线')
        if(value.length < 4 || value.length > 10) return Promise.reject('长度为4~10个字符串')
        return Promise.resolve(value)
    }

    const validateConfirm = ({getFieldValue})=>(
        {
            validator(rule,value){
                if(getFieldValue('password') === value) return Promise.resolve()
                return Promise.reject('两次密码不一致')
            }
        }
    )
  
    // const submit = ()=>{
    //   console.log('点击注册')
    //   Form.validateFields.then(values=>{
    //     AuthStore.setUsername(values.username)
    //     AuthStore.setPassword(values.password)
    //     AuthStore.register()
    //     .then(()=>{console.log('注册成功')})
    //     .catch(()=>{console.log('注册失败')})
    //   })
    // }
    return (
    <Wrapper>
    <Title>注册</Title>    
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '输入用户名',
            },
            {
              validator:validateUsername
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[ 
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: '再次确认密码',
            },
            validateConfirm
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 12,
            span: 4,
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      </Wrapper>
    );
  };



export default Component