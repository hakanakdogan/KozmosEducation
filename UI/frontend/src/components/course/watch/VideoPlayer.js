import React from 'react'
import { Fragment } from 'react'
import { Image } from 'react-bootstrap';
import ReactPlayer from 'react-player'

const VideoPlayer = ({url, course}) => {
  console.log(course);
  return url === null ? (
    <div className='player-intro'>
      <Image rounded thumbnail src={"/images/ogrenci.jpg"} alt="..." className="landing-avatar" />
      <h3 className='mt-2'>{course.courseName}</h3>
      <small>{course.courseDescription}</small>
      <hr />
    </div>
  ) : (
    <Fragment>
        <ReactPlayer
            width="100%"
            height="100%"
            url={url}
            controls
          />
    </Fragment>
  )
}

export default VideoPlayer