import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#588157",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  width: "90%", // adjust width for responsiveness
  maxWidth: "700px", // set a max width for larger screens
  margin: "3px auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "10px",
  color: "#dad7cd",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

// PostList - showing posts - props, deleting posts - props, showForm on edit

function PostList({ posts, onDelete, onEdit, setShowForm }) {
  const onEditPost = (post) => {
    setShowForm((sf) => !sf);
    onEdit(post);
  };

  return (
    <>
      {posts.map((post) => (
        <Stack key={post.ID}>
          <Item
            sx={{ ":hover": { cursor: "pointer" } }}
            onClick={() => onEditPost(post)}>
            <div>
              <h3>
                {
                  //if the length is bigger than 25 characters show the shortened note header
                  post.title.length > 25
                    ? `${post.title.substring(0, 25)}...`
                    : post.title
                }
              </h3>
              <p>
                {
                  //if the length is bigger than 35 characters show the shortened note body
                  post.body.length > 35
                    ? `${post.body.substring(0, 35)}...`
                    : post.body
                }
              </p>
            </div>
            <div>
              <Fab
                sx={{ margin: "7.5px" }}
                size='small'
                onClick={(event) => {
                  // prevents opening the form once delete button is clicked
                  event.stopPropagation();

                  onDelete(post.ID);
                }}>
                <DeleteIcon sx={{ color: "#d11d1d" }} />
              </Fab>
            </div>
          </Item>
        </Stack>
      ))}
    </>
  );
}
export default PostList;
