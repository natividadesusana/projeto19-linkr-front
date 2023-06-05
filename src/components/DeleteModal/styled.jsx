import styled from 'styled-components'

export const DeleteModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
`

export const ModalContent = styled.div`
  background-color: #333333;
  padding: 50px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ModalTitle = styled.h3`
  text-align: center;
  width: 18vw;
  color: white;
  font-size: 25px;
  margin-bottom: 10px;
`

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  button {
    margin-left: 10px;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    background-color: #1676f2;
    color: white;
    font-size: 14px;
    cursor: pointer;
  }
`
