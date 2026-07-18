import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../components/container/Container";
import PostForm from "../components/PostForm/PostForm";
import appwriteService from "../appwrite/config";

function EditPost() {
  const [post, setPost] = useState(null);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    appwriteService.getPost(slug).then((response) => {
      if (response) {
        setPost(response);
      } else {
        navigate("/");
      }
    });
  }, [slug, navigate]);

  if (!post) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
