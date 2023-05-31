import styled from "styled-components";

export const Container = styled.div`
  width: 90vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: left;
  margin: 150px auto 0;

  p {
    color: white;
    font-size: 30px;
  }

  @media screen and (min-width: 480px) {
    width: 45vw;
  }
`;

export const Title = styled.h2`
  color: white;
  font-size: 35px;
  font-family: "Noto Sans Thai", sans-serif;
  margin-bottom: 50px;
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
`;

export const BoxImage = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 10px;

  @media screen and (min-width: 480px) {
    margin-bottom: 0;
  }
`;

export const UserImage = styled.img`
  height: 4vw;
  max-height: 100px;
  border-radius: 100%;
  border: 1px solid black;

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
    .url:focus,
    .description:focus {
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
    width: 37vw;
  }
`;

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
`;

export const BoxInfosPost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
  height: 100%;
  width: 100%;
  padding: 10px;
  font-weight: 400;
  font-family: "Assistant", sans-serif;
  color: white;

  a {
    height: auto;
    min-height: 20vh;
    border-radius: 8px;
    border: 1px solid #b9b9b9;
    cursor: pointer;
  }

  @media screen and (min-width: 480px) {
    width: 37vw;
    padding: 20px;
  }
`;

export const Text = styled.div`
  h1 {
    font-size: 25px;
    padding-bottom: 10px;
    margin-top: -20px;

    @media screen and (min-width: 480px) {
      font-size: 20px;
      padding-bottom: 15px;
    }
  }

  h2 {
    font-size: 25px;
    padding-bottom: 20px;
    color: #b9b9b9;

    @media screen and (min-width: 480px) {
      font-size: 20px;
      padding-bottom: 15px;
    }
  }
`;
