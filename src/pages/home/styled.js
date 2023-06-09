import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import FONTS from "../../constants/Fonts";
import { FiRefreshCcw } from "react-icons/fi";

export const TimelineContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 170px;
  height: 100vh;
  overflow-y: scroll;
  flex-direction: row;
`;

export const Container = styled.div`
  width: 90vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: left;
  margin: 150px 80px;
  a {
    text-decoration: none;
    color: #fff;
  }
  p {
    color: white;
  }

  @media (max-width: 480px) {
    width: 98.5vw;
  }

  @media screen and (min-width: 650px) {
    width: 45vw;
  }
`;

export const Title = styled.h2`
  color: white;
  font-size: 35px;
  font-family: "Noto Sans Thai", sans-serif;
  margin-bottom: 50px;

  @media (max-width: 650px) {
    margin-top: 80px;
  }
  @media screen and (max-width: 480px) {
    margin-top: 20px;
  }
`;

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
    width: 400px;
  }
`;

export const BoxImage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 480px) {
    margin-bottom: 0;
  }
`;

export const UserImage = styled.img`
  width: 4.5vw;
  height: 4.5vw;
  max-height: 100px;
  border-radius: 50%;
  margin-bottom: -80px;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

export const BoxInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
  height: 100%;
  width: 100%;
  font-family: "Assistant", sans-serif;
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
    font-family: "Assistant", sans-serif;
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
    font-family: "Assistant", sans-serif;
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
`;

export const PostBox = styled.div`
  background-color: black;
  height: 100%;
  border-radius: 15px;
  margin-bottom: 50px;
  /* display: flex;
  flex-direction: column; */
  padding: 20px;
  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
`;

export const ContainerRepostBy = styled.div`
  background-color: #1e1e1e;
  width: 100%;
  height: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  flex-shrink: 0;

  p {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  .repost-icon {
    margin-right: 5px;
    font-size: 20px;
    font-weight: bold;
  }

  .username {
    font-weight: bold; 
  }
`;

export const Encapsulation = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
`;

export const BoxInfosPost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
  height: 100%;
  padding: 10px;
  margin-top: -10px;
  font-weight: 400;
  font-family: "Assistant", sans-serif;
  color: white;

  > a:last-child {
    height: auto;
    min-height: 20vh;
    border-radius: 8px;
    width: 36vw;
    border: 1px solid #b9b9b9;
    color: #cecece;
    cursor: pointer;
  }

  @media screen and (min-width: 480px) {
    width: 100vw;
    padding: 20px;
  }
`;

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
    font-family: "Assistant", sans-serif;
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
`;

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
`;
export const StyledTooltip = styled(Tooltip)`
  background-color: white;
  color: black;
  text-align: center;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  p {
    font-family: "Lato";
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
  font-family: "Lato";
  cursor: pointer;

  span {
    color: #fff;
    font-weight: 400;
    font-size: 13px;
    font-family: "Lato";
    font-style: normal;
  }
`;

export const LikeAndImage = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TrendingBox = styled.div`
  background-color: #000000;
  height: auto;
  min-height: 50vh;
  width: 23vw;
  border-radius: 15px;
  padding: 20px;
  position: relative;
  margin-top: 200px;

  h1 {
    color: white;
    font-size: 30px;
    font-family: "Noto Sans Thai", sans-serif;
    margin-bottom: 20px;
    padding-bottom: 10px;
  }

  div {
    display: flex;
    flex-direction: column;
    height: auto;
  }

  span {
    color: white;
    font-family: "Noto Sans Thai", sans-serif;
    cursor: pointer;
  }

  ::before {
    content: "";
    position: absolute;
    top: 65px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: gray;
  }

  a {
    text-decoration: none;
    color: inherit;
    padding-bottom: 10px;
  }

  @media screen and (max-width: 480px) {
    flex-direction: row;
    display: none;
  }
`;

export const MetaData = styled.div`
  display: flex;
  img {
    height: 100%;
  }
`;

export const TextMetaData = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  word-break: break-all;
`;
export const NewPostsButton = styled.button`
  background-color: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.45);
  border-radius: 16px;
  border: 1px solid #1877f2;
  height: 61px;
  font-family: ${FONTS.LINKS}, normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const Icon = styled(FiRefreshCcw)`
  font-size: 22px;
  font-weight: bold;
`;

export const ButtonRepost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 30px;
  cursor: pointer;
  font-family: "Lato";
  p {
    color: #fff;
    font-weight: 400;
    font-size: 13px;
    font-family: "Lato";
    font-style: normal;
  }
`;
