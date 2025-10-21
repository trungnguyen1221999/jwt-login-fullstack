import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
