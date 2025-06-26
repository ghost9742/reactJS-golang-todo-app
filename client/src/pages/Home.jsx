import { useEffect, useState } from "react";
import { createPost, deletePost, fetchPosts, updatePost } from "../api/posts";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Home() {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // connect loadPosts with API
  const loadPosts = async () => {
    setLoading((l) => !l);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  // load posts on mount
  useEffect(() => {
    loadPosts();
  }, []);

  // connect handleCreateOrUpdate with API
  const handleCreateOrUpdate = async (data) => {
    try {
      if (editPost) {
        await updatePost(editPost.ID, data);
        setEditPost(null);
      } else {
        await createPost(data);
      }
      loadPosts();
    } catch (err) {
      setError("Failed to save post", err);
    }
  };

  // connect handleDelete with API
  const handleDelete = async (id) => {
    await deletePost(id);
    loadPosts();
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      {loading && (
        <Backdrop
          open={loading}
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      {error && <p>{error}</p>}

      <PostForm
        onSubmit={handleCreateOrUpdate}
        editPost={editPost}
        showForm={showForm}
        setShowForm={setShowForm}
      />
      <PostList
        posts={posts}
        onDelete={handleDelete}
        onEdit={setEditPost}
        setShowForm={setShowForm}
      />
    </div>
  );
}
export default Home;
