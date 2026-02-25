import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Home from "./pages/Home";
import Navbar from "./componets/Navbar/Navbar";
import Footer from "./componets/Footer/Footer";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import ViewBookDetails from "./componets/ViewBookDetails/ViewBookDetails";
import Favourites from "./componets/Profile/Favourites";
import UserOrderHistory from "./componets/Profile/UserOrderHistory";
import Settings from "./componets/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddBook from "./componets/Profile/AddBooks";
import UpdateBook from "./pages/UpdateBook";
import ContactUs from "./pages/ContactUs";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />}>
            {role === "user" ? (
              <Route index element={<Favourites />} />
            ) : (
              <Route index element={<AllOrders />} />
            )}
            {role === "admin" && <Route path="add-book" element={<AddBook />} />}
            <Route path="settings" element={<Settings />} />
            <Route path="orderHistory" element={<UserOrderHistory />} />
          </Route>
          <Route path="/updateBook/:id" element={<UpdateBook />} />
          <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
          <Route path="/ContactUs" element={<ContactUs />} />
        </Routes>


        <Footer />
      </Router>
    </div>
  );
};

export default App;
