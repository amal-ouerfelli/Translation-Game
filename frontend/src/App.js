import "./App.css";
import Home from "./pages/home.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { SocketProvider } from "./utils/soketContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound.tsx";

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SocketProvider>
    </BrowserRouter>

  );
}

export default App;
