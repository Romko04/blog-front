import Container from "@mui/material/Container";

import { Header } from "./components";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Home, FullPost, Registration, AddPost, Login } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
      <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<Login />} />
          <Route path="/auth/login" element={<Registration />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/create" element={<AddPost />} />
        </Routes>
      </Container>
      </BrowserRouter>

    </>
  );
}

export default App;
