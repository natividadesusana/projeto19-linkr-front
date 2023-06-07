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
  StyledTooltip,
  ButtonLikeContainer,
  LikeAndImage
} from './styled'
import AuthContext from '../../context/AuthContext'
import userIcon from '../../assets/images/userIcon.jpeg'
import react from '../../assets/images/react.png'
import axios from 'axios'
import { AiFillDelete, AiOutlineEdit as GrEdit } from 'react-icons/ai'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import loadingImage from '../../assets/images/loadingImage.gif'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LikeButton from '../../components/LikeButton'
import { Tagify } from 'react-tagify';
import { MoonLoader } from 'react-spinners'


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
  const [userLiked, setUserLiked] = useState({})
  const [tooltipText, setTooltipText] = useState('')
  const descriptionRefs = useRef({})
  const [nextPage, setNextPage] = useState('')
  const config = { headers: { Authorization: `Bearer ${token}` } }

  const PAGE_LIMIT = 5

  // Carregar posts ao carregar a página
  useEffect(() => {
    //scroll para o topo
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    })
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`, {
        params: {
          limit: PAGE_LIMIT,
          offset: 0,
        }
      })
      .then(res => {
        console.log('next',res.data.nextUrl)
        setNextPage(res.data.nextUrl)
        setPosts(res.data.results)
        // setEmptyPosts(recentPosts.length === 0)
        setLoading(false)
      })
      .catch(err => {
        setError(true)
        setLoading(false)
        alert(
          'An error occurred while trying to fetch the posts, please refresh the page'
        )
      })
  }, [])

  // Lidar com a publicação de um post
  const handlePublish = useCallback(async () => {
    if (url === '') return alert('Please fill in the URL')

    setPublishing(true)

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/posts`, { url: url, description: description }, config)

      // Buscar os posts atualizados do servidor
      const updatedPostsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, config)
      const sortedPosts = updatedPostsResponse.data.sort((a, b) => b.id - a.id)
      const recentPosts = sortedPosts.slice(0, 20)

      setPosts(recentPosts)
      setEmptyPosts(recentPosts.length === 0)
      setUrl('')
      setDescription('')
    } catch (error) {
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

  //scroll infinito

  async function goNextPage() {
  
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}${nextPage}`);
      const newPosts = res.data.results;
      setNextPage(res.data.nextUrl)
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setNextPage(res.data.nextUrl);
    } catch (error) {
      return alert("acabou os posts :D")
    }
  }

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          goNextPage();
        }
      },
      { threshold: 1 }
    );
  
    const sentinel = document.querySelector(".sentinel");
    if (sentinel) {
      intersectionObserver.observe(sentinel);
    }
  
    return () => {
      intersectionObserver.disconnect();
    };
  }, [nextPage]);
  
  
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
          <LoaderDiv>
            <MoonLoader />
          </LoaderDiv>
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
              <LikeAndImage>
                <BoxImage>
                  <UserImage
                    src={!post.img ? userIcon : post.img}
                    alt="User Image"
                  />
                </BoxImage>
                <ButtonLikeContainer>
                  <LikeButton
                    setUserLiked={(isLiked) => {
                      setUserLiked((prevUserLiked) => ({
                        ...prevUserLiked,
                        [post.id]: isLiked,
                      }));
                      setTooltipText(isLiked ? 'Você' : 'Fulano');
                    }}
                    isLiked={userLiked[post.id] || false}
                    postId={post.id}
                    userId={post.userId}
                  />
                  <span id="likes-tooltip" data-test="counter">
                    {post.likes} likes
                  </span>
                  <StyledTooltip anchorSelect="#likes-tooltip" place="bottom" effect="solid">
                    <p data-test="tooltip">
                      {tooltipText}, Beltrano e outras {Math.max(0, post.likes - 2)} pessoas curtiram
                    </p>
                  </StyledTooltip>
                </ButtonLikeContainer>
              </LikeAndImage>
              <BoxInfosPost>
                <Text>
                  <Box>
                    <Link to={`/user/${post.userId}`}>
                      <h1 data-test="username">
                        {post.userName ? post.userName : 'Anonymous'}
                      </h1>
                    </Link>

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
                  <Tagify onClick={(text, type) => console.log(text, type)}>
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
                      </TextMetaData >
                      <>
                        <img src={post.urlImg ? post.urlImg : react} alt="imagem" />
                      </>
                    </MetaData >
                  )}
                </a >
              </BoxInfosPost >
            </PostBox >
          ))
        )}
      </Container>

      <Sentinel>
        <li className='sentinel'></li>
      </Sentinel>

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeletePost}
        deleting={deleting}
      />
    </>
  )
}

const MetaData = styled.div`
  display: flex;
  img {
    height: 100%;
  }
`

const TextMetaData = styled.div`
  width: 65%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`
const Sentinel = styled.ul`
  height: 1px;
  width: 1px;
`
const LoaderDiv = styled.div`
  width: 100%;
  height: 50vh;

  display: flex;
  align-items: baseline;
  justify-content: center;
`