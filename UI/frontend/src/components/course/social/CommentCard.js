import React from "react";
import Avatar from "../../Avatar";
import { Card } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import {useUserId} from "../../../hooks/useUserId";

const CommentCard = ({comment, deleteComment, openUpdateCommentModal}) => {
  const userId = useUserId();

  return (
    <Card className="comment-card mt-3">
      <Card.Header className="p-3" style={{backgroundColor:"white", border:"none"}}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <div className="mr-2">
              <Avatar name={comment.displayName} />
            </div>
            <div className="mx-3">
              <div className="h5 m-0">{comment.displayName}</div>
              <small>@{comment.userName}</small>
            </div>
          </div>

          {
            userId === comment.appUserId &&
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-basic">
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => openUpdateCommentModal(comment)}>Güncelle</Dropdown.Item>
                <Dropdown.Item onClick={() => deleteComment(comment.id)}>Sil</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
        </div>
      </Card.Header>
      <Card.Body>
        <p className="card-text">
          {comment.text}
        </p>
      </Card.Body>
    </Card>
  );
};

export default CommentCard;
