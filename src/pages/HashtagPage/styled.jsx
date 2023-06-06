import styled from "styled-components";

export const TrendingContainer = styled.div`
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
  justify-content: flex-start;
  align-content: left;
  margin: 150px 80px;
  p {
    color: white;
  }

  @media screen and (min-width: 480px) {
    width: 45vw;
  }
`;

export const Title = styled.h2`
  color: white;
  font-size: 35px;
  font-family: "Noto Sans Thai", sans-serif;
  margin-bottom: 45px;
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
  width: 4.5vw;
  height: 4.5vw;
  max-height: 100px;
  border-radius: 50%;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

export const PostBox = styled.div`
  background-color: black;
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
  width: 100%;
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
