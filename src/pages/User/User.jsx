import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef
} from 'react'
import Header from '../../components/Header/Header'
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
  FollowButton,
  Menu
} from './styled'
import AuthContext from '../../context/AuthContext'
import userIcon from '../../assets/images/userIcon.jpeg'
import axios from 'axios'
import { AiFillDelete, AiOutlineEdit as GrEdit } from 'react-icons/ai'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import loadingImage from '../../assets/images/loadingImage.gif'
import { Link, useParams } from 'react-router-dom'

export default function User() {
  const { user, token } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)
  const [emptyPosts, setEmptyPosts] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editingDescription, setEditingDescription] = useState(null)
  const [isFollowing, setIsFollowing] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const descriptionRefs = useRef({})
  const { id } = useParams()
  const config = { headers: { Authorization: `Bearer ${token}` } }

  // Carregar posts ao carregar a página
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${id}`, config)
      .then(res => {
        const sortedPosts = res.data.sort((a, b) => b.id - a.id)
        const recentPosts = sortedPosts.slice(0, 20)
        setPosts(recentPosts)
        setEmptyPosts(recentPosts.length === 0)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(true)
        setLoading(false)
        alert(
          'An error occurred while trying to fetch the posts, please refresh the page'
        )
      })
  }, [])
  // Atualizar isCurrentUser
  useEffect(() => {
    if (Number(id) === Number(user.id)) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  }, [id, user.id]);

  // Carregar status de seguidor
  useEffect(() => {
    const fetchData = async () => {
      try {
        setDisabled(true);

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}/followers/${user.id}`, config);
        setDisabled(false);
        setIsFollowing(response.data);
        console.log(response.data)
      } catch (error) {
        setDisabled(false);
        alert('Unable to perform followers operation');
      }
    }
    fetchData()

  }, [id, user.id]);


  const toggleFollow = (event) => {
    const body = { userId: user.id, id }
    setDisabled(true)
    if (event === "Follow") {
      axios
        .post(`${process.env.REACT_APP_API_URL}/users/followers`, body, config)
        .then(() => {
          setDisabled(false)
          setIsFollowing(!isFollowing)
        })
        .catch((err) => {
          setDisabled(false)
          alert(`Error: ${err.response.data}`)
        })
    }
    if (event === "Unfollow") {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/users/${id}/followers/${user.id}`, config)
        .then(() => {
          setDisabled(false)
          setIsFollowing(!isFollowing)
        })
        .catch((err) => {
          setDisabled(false)
          alert(`Error: ${err.response.data}`)
        })
    }
  }
  return (
    <>
      <Header />
      <Container>
        <Menu>
          {posts.length > 0 ? (
            <Title>{posts[0].post.userName}' posts</Title>
          ) : (
            <Title>LULA</Title>
          )}
          {!isCurrentUser ? (
            <FollowButton data-test="follow-btn" onClick={() => toggleFollow(!isFollowing ? "Follow" : "Unfollow")} isFollowing={isFollowing} disabled={disabled}>
              {!isFollowing ? "Follow" : "Unfollow"}
            </FollowButton>
          ) : (
            ""
          )}
        </Menu>
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
          posts.map(post => (
            <PostBox data-test="post">
              <BoxImage>
                <UserImage
                  src={!post.post.img ? userIcon : post.post.img}
                  alt="User Image"
                />
              </BoxImage>

              <BoxInfosPost>
                <Text>
                  <Box>
                    <h1 data-test="username">
                      {post.post.userName ? post.post.userName : 'Anonymous'}
                    </h1>
                  </Box>
                  <p data-test="description">{post.post.description}</p>
                </Text>
                <a
                  data-test="link"
                  href={post.post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to page
                </a>
              </BoxInfosPost>
            </PostBox>
          ))
        )}
      </Container >
    </>
  )
}
