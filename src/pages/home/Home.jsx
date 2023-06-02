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
} from "./styled";
import AuthContext from "../../context/AuthContext";
import userIcon from "../../assets/images/userIcon.jpeg";
import axios from "axios";
import { AiFillDelete, AiOutlineEdit as GrEdit } from "react-icons/ai";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import loadingImage from "../../assets/images/loadingImage.gif";

export default function Home() {
  const { picture_url, userName } = useContext(AuthContext);
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
  const descriptionRefs = useRef({});


  // Carregar posts ao carregar a página
  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
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
  }, []);


  // Lidar com a publicação de um post
  const handlePublish = useCallback(() => {
    if (url === "") {
      alert("Please fill in the URL");
      return;
    }

    setPublishing(true);

    setTimeout(() => { // timeout para mostrar os requisitos mais devagar
      axios
        .post(`${process.env.REACT_APP_API_URL}/posts`, {
          url: url,
          description: description,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setUrl("");
          setDescription("");
          setPosts([res.data, ...posts]);
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
          alert("There was an error while publishing your link");
        })
        .finally(() => {
          setPublishing(false);
        });
    }, 1000);
  }, [url, description, posts]);


  // Lidar com a exclusão de um post
  const handleDeletePost = useCallback(() => {
    setDeleting(true);

    setTimeout(() => {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/posts/${selectedPostId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          const updatedPosts = posts.filter(
            (post) => post.id !== selectedPostId
          );
          setPosts(updatedPosts);
          setShowDeleteModal(false);
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while deleting the post");
        })
        .finally(() => {
          setDeleting(false);
        });
    }, 1000);
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
  const handleSaveEdit = (postId) => {
    const updatedDescription = descriptionRefs.current[postId].value;

    descriptionRefs.current[postId].disabled = true;

    axios
      .put(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
        url: posts.find((post) => post.id === postId).url,
        description: updatedDescription,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
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
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while saving the edit");
        descriptionRefs.current[postId].disabled = false;
      });
  };


  return (
    <>
      <Header />
      <Container>
        <Title>timeline</Title>

        <PublicationBox>
          <BoxImage>
            <UserImage
              src={!picture_url ? userIcon : picture_url}
              alt="User Image"
            />
          </BoxImage>

          <BoxInfos>
            <h1>What are you going to share today?</h1>
            <input
              className="url"
              type="text"
              placeholder="http://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={publishing}
            />
            <input
              className="description"
              type="text"
              placeholder="Awesome article about #javascript"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={publishing}
            />
            <button onClick={handlePublish} disabled={publishing}>
              {publishing ? "Publishing..." : "Publish"}
            </button>
          </BoxInfos>
        </PublicationBox>

        {loading ? (
          <img src={loadingImage} alt="Loading..." />
        ) : error ? (
          <script>{`alert("An error occurred while trying to fetch the posts, please refresh the page")`}</script>
        ) : emptyPosts ? (
          <script>{`alert("There are no posts yet")`}</script>
        ) : (
          posts.map((post) => (
            <PostBox key={post.id}>
              <BoxImage>
                <UserImage
                  src={!picture_url ? userIcon : picture_url}
                  alt="User Image"
                />
              </BoxImage>

              <BoxInfosPost>
                <Text>
                  <Box>
                    <h1>{userName ? userName : "Anonymous"}</h1>
                    <div>
                      <GrEdit onClick={() => handleEditClick(post.id)} />
                      <AiFillDelete
                        onClick={() => {
                          setSelectedPostId(post.id);
                          setShowDeleteModal(true);
                        }}
                      />
                    </div>
                  </Box>

                  {editingDescription === post.id ? (
                    <input
                      className="textarea"
                      defaultValue={post.description}
                      ref={(ref) => (descriptionRefs.current[post.id] = ref)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveEdit(post.id);
                        } else if (e.key === "Escape") {
                          handleEditClick(post.id);
                        }
                      }}
                    />
                  ) : (
                    <p>{post.description}</p>
                  )}
                </Text>
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  Go to page
                </a>
              </BoxInfosPost>
            </PostBox>
          ))
        )}
      </Container>

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeletePost}
        deleting={deleting}
      />
    </>
  );
}

