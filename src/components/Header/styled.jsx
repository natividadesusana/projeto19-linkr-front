import styled from 'styled-components'

export const Container = styled.div`
  background-color: black;
  font-size: 20px;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;

  @media screen and (max-width: 480px) {
    height: 8vh;
    width: 100vw;
    padding: 0 10px;
  }
`

export const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 7vw;
  padding-right: 30px;

  @media screen and (max-width: 480px) {
    width: 20vw;
  }
`

export const Title = styled.h1`
  color: white;
  font-family: 'Oleo Script', cursive;
  font-size: 40px;
  padding-left: 30px;
  margin-right: -150px;

  @media screen and (max-width: 480px) {
    font-size: 30px;
    padding-left: 10px;
  }
`

export const Icon = styled.div`
  color: white;
  cursor: pointer;
`

export const UserImage = styled.img`
  width: 4.5vw;
  height: 4.5vw;
  border-radius: 50%;
  cursor: pointer;

  @media screen and (max-width: 480px) {
    width: 6vh;
    height: 6vh;
  }
`

export const LogoutOption = styled.div`
  color: white;
  cursor: pointer;
  font-size: 18px;
  position: absolute;
  top: 90%;
  right: 0;
  background-color: black;
  padding: 15px;
  padding-right: 70px;
  border-radius: 10px;
`
