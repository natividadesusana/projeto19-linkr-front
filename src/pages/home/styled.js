import styled from 'styled-components'
import { Tooltip } from 'react-tooltip'
import FONTS from '../../constants/Fonts'
import { FiRefreshCcw } from 'react-icons/fi';

export const Container = styled.div`
  width: 90vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: left;
  margin: 150px auto 0;
  a {
    text-decoration: none;
    color: #fff;
  }

  @media (max-width: 480px) {
    width: 98.5vw;
  }

  @media screen and (min-width: 650px) {
    width: 45vw;
  }
`

export const Title = styled.h2`
  color: white;
  font-size: 35px;
  font-family: 'Noto Sans Thai', sans-serif;
  margin-bottom: 80px;
  margin-top: 50px;
  @media (max-width: 650px) {
    margin-top: 80px;
  }
`

export const PublicationBox = styled.div`
  background-color: white;
  height: auto;
  min-height: 30vh;
  border-radius: 15px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
  @media screen and (max-width: 480px) {
    border-radius: 0;
  }
`

export const BoxImage = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 10px;

  @media screen and (min-width: 480px) {
    margin-bottom: 0;
  }
`

export const UserImage = styled.img`
  width: 4.5vw;
  height: 4.5vw;
  max-height: 100px;
  border-radius: 50%;

  @media screen and (max-width: 480px) {
    display: none;
  }
`

export const BoxInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
  height: 100%;
  width: 100%;
  font-family: 'Assistant', sans-serif;
  font-weight: 200;
  margin-left: 20px;

  h1 {
    color: #6b6b6b;
    font-size: 25px;
    margin-bottom: 10px;
  }

  .url {
    background-color: #efefef;
    border: none;
    outline: none;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: 'Assistant', sans-serif;
    font-weight: 200;
    font-size: 20px;
    padding-left: 10px;
    height: 38px;
    &:disabled {
      background-color: #d3d3d3;
      cursor: not-allowed;
    }

    @media screen and (min-width: 480px) {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 480px) {
    margin-left: 0;
  }

  .description {
    background-color: #efefef;
    border: none;
    outline: none;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: 'Assistant', sans-serif;
    font-weight: 200;
    font-size: 20px;
    padding-left: 10px;
    height: 100px;
    align-items: flex-start;

    &:disabled {
      background-color: #d3d3d3;
      cursor: not-allowed;
    }

    &:focus {
      color: black;
    }

    @media screen and (min-width: 480px) {
      font-size: 16px;
      margin-left: none;
    }
  }

  button {
    padding: 10px;
    border-radius: 8px;
    border: none;
    background-color: #1676f2;
    color: white;
    font-size: 15px;
    margin-left: auto;
    width: 100px;
    cursor: pointer;
    &:disabled {
      background-color: #d3d3d3;
      cursor: not-allowed;
    }
    @media screen and (min-width: 480px) {
      font-size: 14px;
    }
  }
  @media screen and (min-width: 480px) {
    width: 100vw;
  }
`

export const PostBox = styled.div`
  background-color: black;
  height: auto;
  min-height: 30vh;
  border-radius: 15px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  @media screen and (min-width: 480px) {
    flex-direction: row;
  }

  @media screen and (max-width: 480px) {
    border-radius: 0;
  }
`

export const BoxInfosPost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
  height: 100%;
  width: 100%;
  padding: 10px;
  font-weight: 400;
  font-family: 'Assistant', sans-serif;
  color: white;

  > a:last-child {
    height: auto;
    min-height: 20vh;
    border-radius: 8px;
    border: 1px solid #b9b9b9;
    color: #cecece;
    cursor: pointer;
  }

  @media screen and (min-width: 480px) {
    width: 100vw;
    padding: 20px;
  }
`

export const Text = styled.div`
  width: 100%;

  p {
    font-size: 25px;
    padding-bottom: 20px;
    color: #b9b9b9;

    @media screen and (min-width: 480px) {
      font-size: 20px;
      padding-bottom: 15px;
    }
  }

  .textarea {
    background-color: white;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: 'Assistant', sans-serif;
    font-weight: 200;
    font-size: 20px;
    padding-left: 10px;
    height: 38px;
    width: 97%;
    color: black;
    outline: none;

    @media screen and (min-width: 480px) {
      font-size: 16px;
    }
  }
`

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 25px;
    padding-bottom: 10px;

    @media screen and (min-width: 480px) {
      font-size: 20px;
      padding-bottom: 15px;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    width: 60px;
    cursor: pointer;
  }
`
export const StyledTooltip = styled(Tooltip)`
  background-color: white;
  color: black;
  text-align: center;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 13px;

    color: #505050;
  }
`;

export const ButtonLikeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 160px;
  span {
    color: #fff;
    font-weight: 400;
    font-size: 15px;
    font-family: 'Lato';
    font-style: normal;

  }
`;

export const LikeAndImage = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NewPostsButton = styled.button`
  background-color: #1877F2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.45);
  border-radius: 16px;
  border: 1px solid #1877F2;
  height: 61px;
  font-family: ${FONTS.LINKS}, normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  cursor: pointer;
  margin-bottom: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

export const Icon = styled(FiRefreshCcw)`
  font-size: 22px;
  font-weight: bold;
`