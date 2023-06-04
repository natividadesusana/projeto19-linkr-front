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
  Box
} from './styled'
import AuthContext from '../../context/AuthContext'
import userIcon from '../../assets/images/userIcon.jpeg'
import axios from 'axios'
import { AiFillDelete, AiOutlineEdit as GrEdit } from 'react-icons/ai'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import loadingImage from '../../assets/images/loadingImage.gif'

export default function Home() {
  const { user, token } = useContext(AuthContext)
  const picture_url = user.pictureUrl
  const [posts, setPosts] = useState([])
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)
  const [emptyPosts, setEmptyPosts] = useState(false)
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [editingDescription, setEditingDescription] = useState(null)
  const descriptionRefs = useRef({})
  const config = { headers: { Authorization: `Bearer ${token}` } }

  // Carregar posts ao carregar a página
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`, config)
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

  // Lidar com a publicação de um post
  const handlePublish = useCallback(async () => {
    if (url === '') {
      alert('Please fill in the URL')
      return
    }

    setPublishing(true)

    try {
      console.log(url, description, config)
      await axios.post(
        `${process.env.REACT_APP_API_URL}/posts`,
        {
          url: url,
          description: description
        },
        config
      )

      // Buscar os posts atualizados do servidor
      const updatedPostsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts`,
        config
      )
      const sortedPosts = updatedPostsResponse.data.sort((a, b) => b.id - a.id)
      const recentPosts = sortedPosts.slice(0, 20)

      setPosts(recentPosts)
      setEmptyPosts(recentPosts.length === 0)
      setUrl('')
      setDescription('')
    } catch (error) {
      console.error(error)
      alert('There was an error while publishing your link')
    } finally {
      setPublishing(false)
    }
  }, [url, description])

  // Lidar com a exclusão de um post
  const handleDeletePost = useCallback(async () => {
    setDeleting(true)

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/posts/${selectedPostId}`,
        config
      )

      const updatedPosts = posts.filter(post => post.id !== selectedPostId)
      setPosts(updatedPosts)
      setShowDeleteModal(false)
    } catch (error) {
      console.error(error)
      alert('An error occurred while deleting the post')
    } finally {
      setDeleting(false)
    }
  }, [posts, selectedPostId])

  // Lidar com o clique no botão de editar
  const handleEditClick = useCallback(
    postId => {
      if (editingDescription === postId) {
        setEditingDescription(null)
      } else {
        setEditingDescription(postId)
      }
    },
    [editingDescription]
  )

  // Lidar com a tecla pressionada
  const handleKeyPress = useCallback(
    event => {
      if (event.key === 'Enter') {
        handlePublish()
      }
    },
    [handlePublish]
  )

  // Focar na caixa de edição ao iniciar a edição
  useEffect(() => {
    if (editingDescription && descriptionRefs.current[editingDescription]) {
      descriptionRefs.current[editingDescription].focus()
    }
  }, [editingDescription, descriptionRefs])

  // Salvar a edição de um post
  const handleSaveEdit = useCallback(
    async postId => {
      const updatedDescription = descriptionRefs.current[postId].value

      descriptionRefs.current[postId].disabled = true

      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/posts/${postId}`,
          {
            url: posts.find(post => post.id === postId).url,
            description: updatedDescription
          },
          config
        )
        setPosts(prevPosts =>
          prevPosts.map(prevPost => {
            if (prevPost.id === postId) {
              return {
                ...prevPost,
                description: updatedDescription
              }
            }
            return prevPost
          })
        )
        setEditingDescription(null)
      } catch (error) {
        console.error(error)
        alert('An error occurred while saving the edit')
        descriptionRefs.current[postId].disabled = false
      }
    },
    [posts]
  )

  return (
    <>
      <Header />
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
              onChange={e => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={publishing}
            />
            <input
              data-test="description"
              className="description"
              type="text"
              placeholder="Awesome article about #javascript"
              value={description}
              onChange={e => setDescription(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={publishing}
            />
            <button
              data-test="publish-btn"
              onClick={handlePublish}
              disabled={publishing}
            >
              {publishing ? 'Publishing...' : 'Publish'}
            </button>
          </BoxInfos>
        </PublicationBox>

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
                  src={!post.img ? userIcon : post.img}
                  alt="User Image"
                />
              </BoxImage>

              <BoxInfosPost>
                <Text>
                  <Box>
                    <h1 data-test="username">
                      {post.userName ? post.userName : 'Anonymous'}
                    </h1>
                    {post.userId !== user.id ? (
                      <></>
                    ) : (
                      <div>
                        <GrEdit onClick={() => handleEditClick(post.id)} />
                        <AiFillDelete
                          onClick={() => {
                            setSelectedPostId(post.id)
                            setShowDeleteModal(true)
                          }}
                        />
                      </div>
                    )}
                  </Box>

                  {editingDescription === post.id ? (
                    <input
                      className="textarea"
                      defaultValue={post.description}
                      ref={ref => (descriptionRefs.current[post.id] = ref)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          handleSaveEdit(post.id)
                        } else if (e.key === 'Escape') {
                          handleEditClick(post.id)
                        }
                      }}
                    />
                  ) : (
                    <p data-test="description">{post.description}</p>
                  )}
                </Text>
                <a
                  data-test="link"
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
  )
}
