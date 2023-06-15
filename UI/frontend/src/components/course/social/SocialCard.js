import React from "react";
import Avatar from "../../Avatar";
import { Card } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import {useUserId} from "../../../hooks/useUserId";
import SocialCardFooter from "./SocialCardFooter";
import CommentsArea from "./CommentsArea";
import { useState } from "react";

const SocialCard = ({post, deletePost, openUpdateModal, upsertReaction, setPosts, isMember}) => {
  const [showComments, setShowComments] = useState(false);
  const userId = useUserId();
  console.log(post);
  return (
    <div className="post-card">
      <Card className="shadow-sm">
      <Card.Header className="p-3" style={{backgroundColor:"white", border:"none"}}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <div className="mr-2">
              <Avatar name={post.displayName}  />
            </div>
            <div className="mx-3">
              <div className="h5 m-0">{post.displayName}</div>
              <small>@{post.userName}</small>
            </div>
          </div>

          {
            userId === post.appUserId &&
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-basic">
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => openUpdateModal(post)}>Güncelle</Dropdown.Item>
                <Dropdown.Item onClick={() => deletePost(post.id)}>Sil</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
        </div>
      </Card.Header>
      <Card.Body>
        <p className="card-text">
          {post.text}
        </p>
        { post.imageUrl && <div className="social-img-container mt-3"><img src={post.imageUrl} className="img-fluid social-img" alt="..." /></div> }
      </Card.Body>
      <Card.Footer style={{backgroundColor:"#fff !important", border:"none"}}>
        <SocialCardFooter upsertReaction={upsertReaction} reactions={post.userReactions} postId={post.id} setShowComments={setShowComments} showComments={showComments} />
      </Card.Footer>
    </Card>

    {
      showComments && <CommentsArea isMember={isMember} userPostId={post.id} setPosts={setPosts} />
    }
    </div>
  );
};

export default SocialCard;
