import React from "react";
import CommentCard from "./CommentCard";
import CreateComment from "./CreateComment";
import {
  createComment,
  deleteComment,
  getPostComments,
  updateComment,
} from "../../../api/social";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import SmallLoading from "../../loading/SmallLoading";
import UpdateCommentModal from "./UpdateComment";

const CommentsArea = ({ userPostId, isMember }) => {
  const [postComments, setPostComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadPostComments = async () => {
    setLoading(true);
    try {
      const response = await getPostComments(userPostId);
      console.log(response);
      setPostComments(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPostComments();
  }, [userPostId]);

  const deleteCommentFunc = async (id) => {
    try {
      await deleteComment(id);
      await loadPostComments();
      toast.success("Yorum başarıyla silindi!");
    } catch (error) {
      toast.error("Yorum silinirken bir hatayla karşılaşıldı!");
    }
  };

  const createCommentFunc = async ({ text }) => {
    try {
      await createComment({ userPostId, text });
      await loadPostComments();
      toast.success("Yorum başarıyla oluşturuldu!");
    } catch (error) {
      toast.error("Yorum oluşturulurken bir hatayla karşılaşıldı!");
    }
  };

  const updateCommentFunc = async (values) => {
    try {
      await updateComment(values);
      await loadPostComments();
      setSelectedComment(null);
      toast.success("Yorum başarıyla güncellendi!");
    } catch (error) {
      toast.error("Yorum güncellenirken bir hatayla karşılaşıldı!");
    }
  };

  const openUpdateCommentModal = (comment) => {
    setSelectedComment(comment);
    handleShow();
  }

  return (
    <div className="comments-area pt-4">
      <UpdateCommentModal comment={selectedComment} show={show} handleClose={handleClose} updateComment={updateCommentFunc} />
      {isMember && <CreateComment createComment={createCommentFunc} /> }
      {loading ? (
        <SmallLoading />
      ) : postComments.reverse().map((postComment,index) => (
          <CommentCard key={index} comment={postComment} deleteComment={deleteCommentFunc} openUpdateCommentModal={openUpdateCommentModal} />
      ))}
    </div>
  );
};

export default CommentsArea;
