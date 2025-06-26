import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

// form CSS transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function PostForm({ onSubmit, editPost, showForm, setShowForm }) {
  const [formData, setFormData] = useState({ title: "", body: "" });

  // if editPost changes, set form data to the title and body of post being edited
  useEffect(() => {
    if (editPost) setFormData({ title: editPost.title, body: editPost.body });
  }, [editPost]);

  // set form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", body: "" });
    setShowForm((sF) => !sF);
  };

  // todo form close - clears the form inputs and closes the form
  function closeForm() {
    console.log("clicked");
    setFormData({ title: "", body: "" });
    setShowForm((sF) => !sF);
  }

  return (
    <>
      <Fab
        color='#dad7cd'
        aria-label='add'
        sx={{ position: "absolute", bottom: "20px", right: "20px" }}
        onClick={() => setShowForm((sF) => !sF)}>
        <AddIcon />
      </Fab>

      {showForm && (
        <Dialog
          fullWidth
          slots={{
            transition: Transition,
          }}
          sx={{
            color: "#fff",
          }}
          open={true}>
          <IconButton
            onClick={closeForm}
            type=''
            color='error'
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              backgroundColor: "#d3000029",
            }}>
            <CloseIcon></CloseIcon>
          </IconButton>
          <Container
            maxWidth='sm'
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "500px",
              marginTop: "50px",
              borderRadius: 2,
              padding: 4,
            }}>
            <form onSubmit={handleSubmit}>
              <FormControl
                sx={{
                  gap: "10px",
                }}>
                <TextField
                  type='text'
                  name='title'
                  id='outlined-basic'
                  label='Title'
                  variant='outlined'
                  value={formData.title}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: "#fff" }}
                />
                <TextField
                  type='text'
                  name='body'
                  id='outlined-multiline-static'
                  label='Multiline'
                  multiline
                  rows={2}
                  value={formData.body}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: "#fff" }}
                />
                <Button
                  type='submit'
                  variant='contained'
                  startIcon={<AddIcon />}>
                  {editPost ? "Update Todo" : "Create Todo"}
                </Button>
              </FormControl>
            </form>
          </Container>
        </Dialog>
      )}
    </>
  );
}
export default PostForm;
