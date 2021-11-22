import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import styled from 'styled-components'
import {useStores} from '../stores'
import {useNavigate} from 'react-router-dom'

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
  const {AuthStore} = useStores()
  const history = useNavigate()
    const onFinish = (values) => {
      AuthStore.setUsername(values.username)
      AuthStore.setPassword(values.password)
      AuthStore.login()
      .then(()=>{
        console.log('登录成功')
        history('./')
      }).catch(
        (err)=>{console.log('登陆失败')
      }
      )
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    const validateUsername = (rule,value)=>{
        if(/\W/.test(value)) return Promise.reject('只能是字母数字下划线')
        if(value.length < 4 || value.length > 10) return Promise.reject('长度为4~10个字符串')
        return Promise.resolve(value)
    }
    return (
    <Wrapper>
    <Title>登录</Title>    
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