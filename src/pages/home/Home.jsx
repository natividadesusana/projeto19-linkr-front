import React, { useContext, useEffect, useState, useCallback } from 'react'
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
  Text
} from './styled'
import userIcon from '../../assets/images/userIcon.jpeg'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'

export default function Home() {
  const { user, token } = useContext(AuthContext)
  const picture_url = user.pictureUrl
  const username = user.userName
  const [posts, setPosts] = useState([])
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  console.log(url, description)
  const [error, setError] = useState(false)
  const [emptyPosts, setEmptyPosts] = useState(false)
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)

  const config = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`)
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

  const handlePublish = useCallback(() => {
    if (url === '') {
      alert('Please fill in the URL')
      return
    }

    setPublishing(true)

    setTimeout(() => {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/posts`,
          {
            url: url,
            description: description
          },
          config
        )
        .then(res => {
          setUrl('')
          setDescription('')
          setPosts([res.data, ...posts])
          window.location.reload()
        })
        .catch(err => {
          console.error(err)
          alert('There was an error while publishing your link')
        })
        .finally(() => {
          setPublishing(false)
        })
    }, 1000)
  }, [url, description, posts])

  const handleKeyPress = useCallback(
    event => {
      if (event.key === 'Enter') {
        handlePublish()
      }
    },
    [handlePublish]
  )

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
              onChange={e => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={publishing}
            />
            <input
              className="description"
              type="text"
              placeholder="Awesome article about #javascript"
              value={description}
              onChange={e => setDescription(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={publishing}
            />
            <button onClick={handlePublish} disabled={publishing}>
              {publishing ? 'Publishing...' : 'Publish'}
            </button>
          </BoxInfos>
        </PublicationBox>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <script>{`alert("An error occurred while trying to fetch the posts, please refresh the page")`}</script>
        ) : emptyPosts ? (
          <script>{`alert("There are no posts yet")`}</script>
        ) : (
          posts.map(post => (
            <PostBox key={post.id}>
              <BoxImage>
                <UserImage
                  src={!picture_url ? userIcon : picture_url}
                  alt="User Image"
                />
              </BoxImage>

              <BoxInfosPost>
                <Text>
                  <h1>{username ? username : 'Anonymous'}</h1>
                  <h2>{post.description}</h2>
                </Text>
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  Go to page
                </a>
              </BoxInfosPost>
            </PostBox>
          ))
        )}
      </Container>
    </>
  )
}
