import React from 'react'
import Avatar from "../../Avatar";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

const ProfileSocialCard = ({post}) => {
  return (
    <Card className="social-card shadow-sm">
      <Card.Header className="p-3" style={{backgroundColor:"white", border:"none"}}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <div className="mr-2">
              <Avatar name={post.displayName} />
            </div>
            <div className="mx-3">
              <div className="h5 m-0">{post.displayName}</div>
              <Link to={`/courses/${post.courseId}`}><small className='cursor-pointer'>{post.courseName}</small></Link>
            </div>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <p className="card-text">
          {post.text}
        </p>
        { post.imageUrl && <div className="social-img-container mt-3"><img src={post.imageUrl} className="img-fluid social-img" alt="..." /></div> }
      </Card.Body>
    </Card>
  );
}

export default ProfileSocialCard