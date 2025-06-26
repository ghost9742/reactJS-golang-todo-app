const API_URL = "http://localhost:8000/posts";

// read
const fetchPosts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

// create
const createPost = async (post) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
};

// update
const updatePost = async (id, post) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
};

// delete
const deletePost = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
};

export { fetchPosts, createPost, updatePost, deletePost };
