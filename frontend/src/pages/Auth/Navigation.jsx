import { useState } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <AiOutlineHome className="mr-2" size={26} />
          <span className="d-none d-md-inline">Home</span>
        </Link>
   

        { /*=============================================*/}
        
  
        <Link to="/movies" className="navbar-brand">
          <MdOutlineLocalMovies className="mr-2" size={26} />
          <span className="d-none d-md-inline">Search</span>
        </Link>
     
        
          {userInfo ? (
            <div className="dropdown">
              <button
                onClick={toggleDropdown}
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                aria-expanded="false"
              >
                {userInfo.username}
              </button>
              <ul
                className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
                aria-labelledby="dropdownMenuButton"
              >
                {userInfo.isAdmin && (
                  <li>
                    <Link to="/admin/movies/dashboard" className="dropdown-item">Dashboard</Link>
                  </li>
                )}
                <li>
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                </li>
                <li>
                  <button onClick={logoutHandler} className="dropdown-item">Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <AiOutlineLogin className="mr-2" size={26} />
                  <span className="d-none d-md-inline">LOGIN</span>
                </Link>
              </li>

            </ul>
          )}
        </div>
    </nav>
  );
};

export default Navigation;
