import React from 'react'
import LogoUrl from './logo.svg'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
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
function Component() {
    return (
        <>
        <Header>
            <img src={LogoUrl}/>
            <nav>
                <StyledLink to="/" activeClassName='active' exact>首页</StyledLink>
                <StyledLink to="/history" activeClassName='active'>上传历史</StyledLink>
                <StyledLink to="/about" activeClassName='active'>关于我</StyledLink>
            </nav>
        </Header>
        </>
    )
}
export default Component