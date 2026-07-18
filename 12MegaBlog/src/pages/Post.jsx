import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);

  const { slug } = useParams();

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

      appwriteService.getPost(slug).then((response) => {
        console.log(response); // <-- Add this
        if (response) {
          setPost(response);
        } else {
          navigate("/");
        }
      });
  }, [slug, navigate]);

  const deletePost = async () => {
    console.log("Deleting:", post.$id);

    const status = await appwriteService.deletePost(post.$id);

    console.log("Delete status:", status);

    if (status) {
      console.log("Deleting image:", post.featuredImage);

      await appwriteService.deleteFile(post.featuredImage);

      navigate("/");
    } else {
      console.log("Delete failed");
    }
  };

  if (!post) return null;

  return (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)?.toString()}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.slug}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>

              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold">{post.title}</h1>
        </div>

        <div>{parse(post.content)}</div>
      </Container>
    </div>
  );
}
