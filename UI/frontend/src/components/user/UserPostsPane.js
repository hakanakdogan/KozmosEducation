import React, { Fragment, useEffect, useState } from 'react'
import SmallLoading from '../loading/SmallLoading';
import ProfileSocialCard from '../course/social/ProfileSocialCard';
import { getUsersPost } from '../../api/social';

const UserPostsPane = ({userId}) => {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadUserPosts = async () => {
        setLoading(true);
        try {
            const {data} = await getUsersPost(userId);
            setUserPosts(data);
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUserPosts();
    }, []);

  return loading ? <SmallLoading /> : (
   <Fragment>
     {
        userPosts && userPosts.reverse().map((userPost, index) => (
            <ProfileSocialCard post={userPost} key={index} />
        ))
    }
   </Fragment>
  )
}

export default UserPostsPane