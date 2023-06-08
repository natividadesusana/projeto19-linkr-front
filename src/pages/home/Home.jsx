import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import Header from "../../components/Header/Header";
import {
  Container,
  Title,
  PublicationBox,
  BoxImage,
  BoxInfos,
  UserImage,
  PostBox,
  BoxInfosPost,
  Text,
  Box,
  StyledTooltip,
  ButtonLikeContainer,
  LikeAndImage,
  TimelineContainer,
  TrendingBox,
  MetaData,
  TextMetaData,
  NewPostsButton,
  Icon,
  ButtonRepost,
  ContainerRepostBy,
  Encapsulation,
} from "./styled";
import AuthContext from "../../context/AuthContext";
import userIcon from "../../assets/images/userIcon.jpeg";
import react from "../../assets/images/react.png";
import axios from "axios";
import { AiFillDelete, AiOutlineEdit as GrEdit } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import loadingImage from "../../assets/images/loadingImage.gif";
import { Link, useNavigate } from "react-router-dom";
import LikeButton from "../../components/LikeButton";
import { Tagify } from "react-tagify";
import useInterval from "use-interval";
import RepostModal from "../../components/RepostModal/RepostModal";

export default function Home() {
  const { user, token } = useContext(AuthContext);
  const picture_url = user.pictureUrl;
  const [posts, setPosts] = useState([]);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [emptyPosts, setEmptyPosts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editingDescription, setEditingDescription] = useState(null);
  const [userLiked, setUserLiked] = useState({});
  const [tooltipText, setTooltipText] = useState("");
  const [trendings, setTrendings] = useState([]);
  const [newPostsCount, setNewPostsCount] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(
    new Date().toISOString()
  );
  const descriptionRefs = useRef({});
  const navigate = useNavigate();
  const [showRepostModal, setShowRepostModal] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [repostCount, setRepostCount] = useState({});

  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Carregar posts ao carregar a página
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`, config)
      .then((res) => {
        const sortedPosts = res.data.sort((a, b) => b.id - a.id);
        const recentPosts = sortedPosts.slice(0, 20);
        setPosts(recentPosts);
        setEmptyPosts(recentPosts.length === 0);
        setLoading(false);

        getRepostCount();
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
        alert(
          "An error occurred while trying to fetch the posts, please refresh the page"
        );
      });
    // eslint-disable-next-line
  }, []);

  // Busca Re-posts
  const getRepostCount = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/repost`,
        config
      );
      const reposts = response.data;

      const repostCountMap = {};
      reposts.forEach((repost) => {
        const { postId, reposts } = repost;
        repostCountMap[postId] = reposts;
      });

      setRepostCount(repostCountMap);
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching repost counts");
    }
  }, [config]);

  // Lidar com a publicação de um post
  const handlePublish = useCallback(async () => {
    if (url === "") {
      alert("Please fill in the URL");
      return;
    }

    setPublishing(true);

    try {
      console.log(url, description, config);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/posts`,
        {
          url: url,
          description: description,
        },
        config
      );

      setUrl("");
      setDescription("");

      // Buscar os posts atualizados do servidor
      const updatedPostsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts`,
        config
      );
      const sortedPosts = updatedPostsResponse.data.sort((a, b) => b.id - a.id);
      const recentPosts = sortedPosts.slice(0, 20);

      setPosts(recentPosts);
      setEmptyPosts(recentPosts.length === 0);
      setUrl("");
      setDescription("");

      await getRepostCount();

      // Extrair hashtags da descrição
      const hashtags = description.match(/#\S+/g);
      if (hashtags) {
        const newTrendings = [
          ...trendings,
          ...hashtags.map((tag) => tag.slice(1)),
        ];
        setTrendings(Array.from(new Set(newTrendings)));
      }
      setPosts(recentPosts);
      setEmptyPosts(recentPosts.length === 0);
      setUrl("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("There was an error while publishing your link");
    } finally {
      setPublishing(false);
    }
    // eslint-disable-next-line
  }, [url, description, config, getRepostCount]);

  // Lidar com a exclusão de um post
  const handleDeletePost = useCallback(async () => {
    setDeleting(true);

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/posts/${selectedPostId}`,
        config
      );

      const updatedPosts = posts.filter((post) => post.id !== selectedPostId);
      setPosts(updatedPosts);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the post");
    } finally {
      setDeleting(false);
    }
    // eslint-disable-next-line
  }, [posts, selectedPostId]);

  // Lidar com o clique no botão de editar
  const handleEditClick = useCallback(
    (postId) => {
      if (editingDescription === postId) {
        setEditingDescription(null);
      } else {
        setEditingDescription(postId);
      }
    },
    [editingDescription]
  );

  // Lidar com a tecla pressionada
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handlePublish();
      }
    },
    [handlePublish]
  );

  // Focar na caixa de edição ao iniciar a edição
  useEffect(() => {
    if (editingDescription && descriptionRefs.current[editingDescription]) {
      descriptionRefs.current[editingDescription].focus();
    }
  }, [editingDescription, descriptionRefs]);

  // Salvar a edição de um post
  const handleSaveEdit = useCallback(
    async (postId) => {
      const updatedDescription = descriptionRefs.current[postId].value;

      descriptionRefs.current[postId].disabled = true;

      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/posts/${postId}`,
          {
            url: posts.find((post) => post.id === postId).url,
            description: updatedDescription,
          },
          config
        );
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) => {
            if (prevPost.id === postId) {
              return {
                ...prevPost,
                description: updatedDescription,
              };
            }
            return prevPost;
          })
        );
        setEditingDescription(null);
      } catch (error) {
        console.error(error);
        alert("An error occurred while saving the edit");
        descriptionRefs.current[postId].disabled = false;
      }
    },
    // eslint-disable-next-line
    [posts]
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/hashtags`, config)
      .then((res) => {
        setTrendings(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while trying to fetch the trending hashtags");
      });
    // eslint-disable-next-line
  }, []);

  const fetchNewPostsCount = async () => {
    console.log(lastUpdateTime);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/new-posts`,
        {
          params: {
            lastUpdate: lastUpdateTime, // Passa a data/hora da última atualização
          },
        }
      );
      const countPosts = Number(response.data.countPosts);
      console.log(countPosts);
      setNewPostsCount(countPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useInterval(fetchNewPostsCount, 15000);

  const handleNewPosts = () => {
    window.location.reload();
  };

  // Re-posts
  const handleRepostPost = useCallback(async () => {
    setSharing(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/posts/repost/${selectedPostId}`,
        {},
        config
      );

      setRepostCount((prevRepostCount) => ({
        ...prevRepostCount,
        [selectedPostId]: (prevRepostCount[selectedPostId] || 0) + 1,
      }));

      setShowRepostModal(false);
    } catch (error) {
      console.error(error);
      alert("An error occurred while reposting the post");
    } finally {
      setSharing(false);
    }
  }, [config, selectedPostId]);

  return (
    <>
      <Header />
      <TimelineContainer>
        <Container>
          <Title>timeline</Title>

          <PublicationBox data-test="publish-box">
            <BoxImage>
              <UserImage
                src={!picture_url ? userIcon : picture_url}
                alt="User Image"
              />
            </BoxImage>

            <BoxInfos>
              <h1>What are you going to share today?</h1>
              <input
                data-test="link"
                className="url"
                type="text"
                placeholder="http://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={publishing}
              />
              <input
                data-test="description"
                className="description"
                type="text"
                placeholder="Awesome article about #javascript"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={publishing}
              />
              <button
                data-test="publish-btn"
                onClick={handlePublish}
                disabled={publishing}
              >
                {publishing ? "Publishing..." : "Publish"}
              </button>
            </BoxInfos>
          </PublicationBox>
          {newPostsCount > 0 && (
            <NewPostsButton onClick={handleNewPosts}>
              {newPostsCount} new posts, load more!
              <Icon />
            </NewPostsButton>
          )}

          {loading ? (
            <img src={loadingImage} alt="Loading..." />
          ) : error ? (
            <p>
              An error occurred while trying to fetch the posts, please refresh
              the page
            </p>
          ) : emptyPosts ? (
            <p data-test="message">There are no posts yet</p>
          ) : (
            posts.map((post) => (
              <PostBox data-test="post" key={post.id}>
                {repostCount[post.id] > 0 && (
                  <ContainerRepostBy>
                    <p>
                      <BiRepost className="repost-icon" /> Re-post by&nbsp;
                      <span className="username">{post.userName}</span>
                    </p>
                  </ContainerRepostBy>
                )}

                <Encapsulation>
                  <LikeAndImage>
                    <BoxImage>
                      <UserImage
                        src={!post.img ? userIcon : post.img}
                        alt="User Image"
                      />

                      <ButtonLikeContainer>
                        <LikeButton
                          setUserLiked={(isLiked) => {
                            setUserLiked((prevUserLiked) => ({
                              ...prevUserLiked,
                              [post.id]: isLiked,
                            }));
                            setTooltipText(isLiked ? "Você" : "Fulano");
                          }}
                          isLiked={userLiked[post.id] || false}
                          postId={post.id}
                          userId={post.userId}
                        />
                        <span id="likes-tooltip" data-test="counter">
                          {post.likes} likes
                        </span>
                        <StyledTooltip
                          anchorSelect="#likes-tooltip"
                          place="bottom"
                          effect="solid"
                        >
                          <p data-test="tooltip">
                            {tooltipText}, Beltrano e outras{" "}
                            {Math.max(0, post.likes - 2)} pessoas curtiram
                          </p>
                        </StyledTooltip>
                      </ButtonLikeContainer>

                      <ButtonRepost>
                        <BiRepost
                          onClick={() => {
                            setSelectedPostId(post.id);
                            setShowRepostModal(true);
                          }}
                        />
                        <p>{repostCount[post.id] || 0} re-posts</p>
                      </ButtonRepost>
                    </BoxImage>
                  </LikeAndImage>

                  <BoxInfosPost>
                    <Text>
                      <Box>
                        <Link to={`/user/${post.userId}`}>
                          <h1 data-test="username">
                            {post.userName ? post.userName : "Anonymous"}
                          </h1>
                        </Link>

                        {post.userId !== user.id ? (
                          <></>
                        ) : (
                          <div>
                            <GrEdit onClick={() => handleEditClick(post.id)} />
                            <AiFillDelete
                              onClick={() => {
                                setSelectedPostId(post.id);
                                setShowDeleteModal(true);
                              }}
                            />
                          </div>
                        )}
                      </Box>
                      <Tagify
                        onClick={(text, type) => navigate(`/hashtags/${text}`)}
                      >
                        {editingDescription === post.id ? (
                          <input
                            className="textarea"
                            defaultValue={post.description}
                            ref={(ref) =>
                              (descriptionRefs.current[post.id] = ref)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleSaveEdit(post.id);
                              } else if (e.key === "Escape") {
                                handleEditClick(post.id);
                              }
                            }}
                          />
                        ) : (
                          <p data-test="description">{post.description}</p>
                        )}
                      </Tagify>
                    </Text>

                    <a
                      data-test="link"
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.length > 0 ? (
                        <>Go to page</>
                      ) : (
                        <MetaData>
                          <TextMetaData>
                            <p>{post.urlDescr}</p>
                            <p>{post.url}</p>
                          </TextMetaData>
                          <>
                            <img src={react} alt="" />
                          </>
                        </MetaData>
                      )}
                    </a>
                  </BoxInfosPost>
                </Encapsulation>
              </PostBox>
            ))
          )}
        </Container>
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

        <DeleteModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeletePost}
          deleting={deleting}
        />

        <RepostModal
          show={showRepostModal}
          onClose={() => setShowRepostModal(false)}
          onConfirm={handleRepostPost}
          sharing={sharing}
        />
      </TimelineContainer>
    </>
  );
}
