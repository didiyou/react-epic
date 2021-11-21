import React,{useState} from 'react'
import LogoUrl from './logo.svg'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'antd';
import 'antd/dist/antd.css'
const Header = styled.header`
    display:flex;
    align-items: center;
    padding:10px 100px;
    background:#02102f;
    color:#fff;
    &.active{
        color:blue;
    }
`
const Logo = styled.img`
    height:30px;
`
const StyledLink = styled(NavLink)`
    color:#fff;
    margin-left:30px;
`
const Login = styled.div`
    margin-left: auto;
`
const StyledButton = styled(Button)`
    margin-left:10px;
`
function Component() {
    const [isLogin,setIsLogin] = useState(false)
    return (
        <>
        <Header>
            <Logo src={LogoUrl}/>
            <nav>
                <StyledLink to="/" activeClassName='active' exact>首页</StyledLink>
                <StyledLink to="/history" activeClassName='active'>上传历史</StyledLink>
                <StyledLink to="/about" activeClassName='active'>关于我</StyledLink>
            </nav>
            <Login>
                {
                    isLogin ? <>
                    饥人谷 <StyledButton type="primary">注销</StyledButton>
                    </> : <>
                    <StyledButton type="primary" >登录</StyledButton>
                    <StyledButton type="primary">注册</StyledButton>
                    </>
                }
            </Login>
        </Header>
        </>
    )
}
export default Component