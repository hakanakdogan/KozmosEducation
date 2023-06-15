import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineSmile,
  AiFillSmile,
} from "react-icons/ai";
import { HiOutlineEmojiSad, HiEmojiSad } from "react-icons/hi";
import {
  MdOutlineCelebration,
  MdCelebration,
  MdOutlineComment,
  MdInsertComment,
} from "react-icons/md";
import ReactionTypeEnum from "../../../enums/ReactionTypeEnum";
import { useUserId } from "../../../hooks/useUserId";
import { GoCommentDiscussion } from "react-icons/go";

const SocialCardFooter = ({
  reactions,
  postId,
  upsertReaction,
  setShowComments,
  showComments,
}) => {
  const [selectedType, setSelectedType] = useState(null);
  const [counts, setCounts] = useState({
    like: 0,
    haha: 0,
    sad: 0,
    clap: 0,
  });

  const userId = useUserId();

  useEffect(() => {
    const reaction = reactions.find(
      (reaction) => reaction.appUserId === userId
    );
    if (reaction) {
      setSelectedType(reaction.reactionType);
    } else {
      setSelectedType(null);
    }

    const likeC = reactions.filter(
      (x) => x.reactionType === ReactionTypeEnum.Like
    ).length;
    const hahaC = reactions.filter(
      (x) => x.reactionType === ReactionTypeEnum.Haha
    ).length;
    const sadC = reactions.filter(
      (x) => x.reactionType === ReactionTypeEnum.Sad
    ).length;
    const clapC = reactions.filter(
      (x) => x.reactionType === ReactionTypeEnum.Clap
    ).length;

    setCounts({
      like: likeC,
      haha: hahaC,
      sad: sadC,
      clap: clapC,
    });
  }, [reactions, userId]);

  return (
    <Row>
      <Col
        onClick={() =>
          upsertReaction({
            userPostId: postId,
            reactionType: ReactionTypeEnum.Like,
            selectedType: selectedType,
          })
        }
        className="emotion-box cursor-pointer"
      >
        {selectedType === ReactionTypeEnum.Like ? (
          <AiFillLike className="cursor-pointer" size={24} />
        ) : (
          <AiOutlineLike className="cursor-pointer" size={24} />
        )}
        <small className="mx-2">Beğen: {counts.like}</small>
      </Col>
      <Col
        onClick={() =>
          upsertReaction({
            userPostId: postId,
            reactionType: ReactionTypeEnum.Haha,
            selectedType: selectedType,
          })
        }
        className="emotion-box cursor-pointer"
      >
        {selectedType === ReactionTypeEnum.Haha ? (
          <AiFillSmile className="cursor-pointer" size={24} />
        ) : (
          <AiOutlineSmile className="cursor-pointer" size={24} />
        )}
        <small className="mx-2">Haha: {counts.haha}</small>
      </Col>
      <Col
        onClick={() =>
          upsertReaction({
            userPostId: postId,
            reactionType: ReactionTypeEnum.Sad,
            selectedType: selectedType,
          })
        }
        className="emotion-box cursor-pointer"
      >
        {selectedType === ReactionTypeEnum.Sad ? (
          <HiEmojiSad className="cursor-pointer" size={24} />
        ) : (
          <HiOutlineEmojiSad className="cursor-pointer" size={24} />
        )}
        <small className="mx-2">Üzücü: {counts.sad}</small>
      </Col>
      <Col
        onClick={() =>
          upsertReaction({
            userPostId: postId,
            reactionType: ReactionTypeEnum.Clap,
            selectedType: selectedType,
          })
        }
        className="emotion-box cursor-pointer"
      >
        {selectedType === ReactionTypeEnum.Clap ? (
          <MdCelebration className="cursor-pointer" size={24} />
        ) : (
          <MdOutlineCelebration className="cursor-pointer" size={24} />
        )}
        <small className="mx-2">Kutla: {counts.clap}</small>
      </Col>
      <Col className="align-right cursor-pointer">
        {showComments ? (
          <MdInsertComment
            onClick={() => setShowComments((old) => !old)}
            size={24}
          />
        ) : (
          <MdOutlineComment
            onClick={() => setShowComments((old) => !old)}
            size={24}
          />
        )}
      </Col>
    </Row>
  );
};

export default SocialCardFooter;
