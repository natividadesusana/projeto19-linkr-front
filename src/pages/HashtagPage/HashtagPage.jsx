import React, { useEffect, useState, useMemo, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import {
  Container,
  Title,
  BoxImage,
  UserImage,
  PostBox,
  BoxInfosPost,
  Text,
  Box,
  TrendingBox,
  TrendingContainer,
} from "./styled";
import userIcon from "../../assets/images/userIcon.jpeg";
import axios from "axios";
import loadingImage from "../../assets/images/loadingImage.gif";
import AuthContext from "../../context/AuthContext";

export default function HashtagPage() {
  const { token } = useContext(AuthContext);
  const { hashtag } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [emptyPosts, setEmptyPosts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trendings, setTrendings] = useState([]);
  const [loadingTrendings, setLoadingTrendings] = useState(true);

  const config = useMemo(
    () => ({ headers: { Authorization: `Bearer ${token}` } }),
    [token]
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hashtags/${hashtag}`, config)
      .then((res) => {
        const sortedPosts = res.data.sort((a, b) => b.id - a.id);
        const recentPosts = sortedPosts.slice(0, 20);
        setPosts(recentPosts);
        setEmptyPosts(recentPosts.length === 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
        alert(
          "An error occurred while trying to fetch the posts, please refresh the page"
        );
      });
  }, [hashtag, config]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/hashtags`, config)
      .then((res) => {
        setTrendings(res.data);
        setLoadingTrendings(false);
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while trying to fetch the trending hashtags");
        setLoadingTrendings(false);
      });
    // eslint-disable-next-line
  }, []);

  const containsHashtag = (description, hashtag) => {
    const words = description.split(" ");
    return words.some((word) =>
      word.toLowerCase().includes(hashtag.toLowerCase())
    );
  };

  return (
    <>
      <Header />
      <TrendingContainer>
        <Container>
          <Title data-test="hashtag-title">{`# ${hashtag}`}</Title>
          {loading ? (
            <img src={loadingImage} alt="Loading..." />
          ) : error ? (
            <p>
              An error occurred while trying to fetch the posts, please refresh
              the page
            </p>
          ) : emptyPosts ? (
            <p>There are no posts yet</p>
          ) : (
            posts.map((post) => {
              if (containsHashtag(post.description, hashtag)) {
                return (
                  <PostBox data-test="post" key={post.id}>
                    <BoxImage>
                      <UserImage
                        src={!post.pictureUrl ? userIcon : post.pictureUrl}
                        alt="User Image"
                      />
                    </BoxImage>

                    <BoxInfosPost>
                      <Text>
                        <Box>
                          <h1>{post.userName ? post.userName : "Anonymous"}</h1>
                        </Box>
                        <p>{post.description}</p>
                      </Text>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Go to page
                      </a>
                    </BoxInfosPost>
                  </PostBox>
                );
              } else {
                return null;
              }
            })
          )}
        </Container>
        {!loadingTrendings && (
          <TrendingBox>
            <h1>trending</h1>
            <div>
              {trendings.map((hashtag, index) => (
                <Link to={`/hashtags/${hashtag}`} key={index}>
                  <span key={index}># {hashtag}</span>
                </Link>
              ))}
            </div>
          </TrendingBox>
        )}
      </TrendingContainer>
    </>
  );
}
