import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../store/UserStore";


const Sidebar = () => {
  const { user, logout, isAuthenticated } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar">
      <NavLink
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">THE WALL</span>
      </NavLink>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
            end
          >
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
           Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/create-post"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            Create Post
          </NavLink>
        </li>
      </ul>
      <hr />
      <div className="d-flex align-items-center">
        <img
          src={user?.profilePic || "https://via.placeholder.com/32"}
          alt=""
          width="32"
          height="32"
          className="rounded-circle me-2"
        />
        <strong className="me-2">{user?.name || "Guest"}</strong>
        {isAuthenticated ? (
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login" className="btn btn-outline-light btn-sm me-2">
              Login
            </NavLink>
            <NavLink to="/signup" className="btn btn-warning btn-sm">
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
