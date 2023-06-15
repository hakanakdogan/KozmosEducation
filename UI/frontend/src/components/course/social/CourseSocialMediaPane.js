import React, { useEffect, useState } from "react";
import SocialCard from "./SocialCard";
import CreatePost from "./CreatePost";
import SmallLoading from "../../loading/SmallLoading";
import { deletePost, getPost, getUserPosts, updatePost, upsertReaction } from "../../../api/social";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UpdatePost from "./UpdatePost";

const CourseSocialMediaPane = ({isMember}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const params = useParams();

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await getUserPosts(params.id);
      setPosts(response.data);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  }

  const deletePostFunc = async (id) => {
    try {
      await deletePost(id);
      setPosts(old => {
        const posts = [];
        old.forEach(post => {
          if(post.id !== id) posts.push(post);
        })
        return posts;
      })
      toast.success("Gönderi başarıyla silindi!");
    } catch (error) {
      toast.error("Gönderi silinirken bir hatayla karşılaşıldı!");
    }
  }

  const openUpdateModal = (post) => {
    setSelectedPost(post);
    handleShow();
  }

  const updatePostFunc = async (data) => {
    try {
      await updatePost({ postId: data.id, text: data.text });
      setPosts(old => {
        const posts = [];
        old.forEach(post => {
          if(post.id === data.id) posts.push(data);
          else posts.push(post);
        })
        return posts;
      })
      setSelectedPost(null);
      toast.success("Gönderi başarıyla güncellendi!");
    } catch (error) {
      toast.error("Gönderi güncellenirken bir hatayla karşılaşıldı!");
    }
  }

  const upsertReact = async (data) => {
    try {
      if(data.selectedType && data.selectedType !== data.reactionType) {
        await upsertReaction(data);
      }
      await upsertReaction(data);
      const {data : newPost} = await getPost(data.userPostId);
      setPosts(old => {
        const posts = [];
        old.forEach(post => {
          if(post.id === data.userPostId) {
            posts.push(newPost)
          }
          else {
            posts.push(post);
          };
        })
        return posts.reverse();
      })
  } catch (error) {
      console.log(error);
  }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return loading ? <SmallLoading /> : (
    <>
    {selectedPost !== null && <UpdatePost post={selectedPost} show={show} handleClose={handleClose} updatePost={updatePostFunc}  /> }
      {
        isMember && <CreatePost setPosts={setPosts} />
      }
      <hr />
      {
        posts && posts.length > 0 && posts.reverse().map((post, index) => (
          <SocialCard isMember={isMember} setPosts={setPosts} upsertReaction={upsertReact} openUpdateModal={openUpdateModal} deletePost={deletePostFunc} post={post} key={index} />
        ))
      }
    </>
  );
};

export default CourseSocialMediaPane;
