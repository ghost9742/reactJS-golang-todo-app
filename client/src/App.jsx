import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <CssBaseline /> {/*CssBaseline -> CSS reset in Material UI*/}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#344e41",
          padding: 0,
        }}>
        <Home />
      </Box>
    </>
  );
}

export default App;
