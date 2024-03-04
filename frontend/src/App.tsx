import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import "react-toastify/ReactToastify.css";


function App() {

  return (
    <>
      <ToastContainer position="bottom-left" autoClose={3000} />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
}

export default App;
