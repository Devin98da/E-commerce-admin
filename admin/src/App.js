import SideBar from "./components/sidebar/SideBar";
import TopBar from "./components/topbar/TopBar";
import './App.css';
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  useNavigate
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useEffect } from "react";

function Layout() {
  const location = useLocation();
  const persistRoot = localStorage.getItem("persist:root");
  const navigate = useNavigate();
  let currentUser = null;
  let isAdmin = false;

  if (persistRoot) {
    const userData = JSON.parse(persistRoot).user;
    if (userData) {
      currentUser = JSON.parse(userData).currentUser;
      console.log(currentUser);
      isAdmin = currentUser?.isAdmin || false; // Safely check for isAdmin
    }
  }

  const isAuthenticated = currentUser?.token;

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/');
  //   } else {
  //     navigate('/login');
  //   }
  // }, [isAuthenticated, navigate])



  return (
    <div>
      {/* Conditionally render TopBar and SideBar only if the path is not '/login' */}
      {location.pathname !== "/login" && <TopBar />}
      <div className="container">
        {location.pathname !== "/login" && <SideBar />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/newProduct" element={<NewProduct />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
