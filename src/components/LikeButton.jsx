import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

export default function LikeButton({ setUserLiked, isLiked, postId, userId }) {

    const [liked, setLiked] = useState(isLiked);
    const { token } = useContext(AuthContext);
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = { userId, postId };

    const handleLike = () => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/posts/like`, body, config)
            .then()
            .catch((err) => {
                console.error(err);
                alert("There was an error while liking the post");
            });
    };

    const handleUnlike = () => {

        axios
            .post(`${process.env.REACT_APP_API_URL}/posts/unlike`, body, config)
            .then()
            .catch((err) => {
                console.error(err);
                alert("There was an error while unliking the post");
            });
    };

    const handleClick = () => {
        setLiked(!liked);
        setUserLiked(!liked);

        if (!liked) {
            handleLike();
        } else {
            handleUnlike();
        }
    };

    return (
        <span onClick={handleClick} data-test="like-btn">
            {liked ? <AiFillHeart color="red" size={30} /> : <AiOutlineHeart size={30} />}
        </span>
    );
}