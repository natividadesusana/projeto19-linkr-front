import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Tooltip } from "react-tooltip";

export default function TooltipLike({ likes, postId, tooltipText, config }) {

    /* const [likedBy, setLikedBy] = useState([]);
    console.log(likedBy)

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/posts/${postId}/liked-by`, config)
            .then((res) => setLikedBy(res.data))
            .catch((err) => console.log(err))
    }, [postId, config]) */


    return (
        <>

            <span id="likes-tooltip" data-test="counter">
                {likes} likes
            </span>
            <StyledTooltip anchorSelect="#likes-tooltip" place="bottom" effect="solid">

                <p>
                    {tooltipText}, Beltrano e outras x pessoas curtiram
                </p>

            </StyledTooltip>
        </>
    )

}

export const StyledTooltip = styled(Tooltip)`
  background-color: white;
  color: black;
  text-align: center;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 13px;

    color: #505050;
  }
`;