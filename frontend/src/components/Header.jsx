import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Hamburger from "hamburger-react";
import gsap from "gsap";
import useUserStore from "../store/UserStore";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const sidebarRef = useRef();
  const { isAuthenticated, logout } = useUserStore();

  const openSidebar = () => {
    gsap.to(sidebarRef.current, {
      left: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const closeSidebar = () => {
    gsap.to(sidebarRef.current, {
      left: "-100%",
      duration: 1.5,
      ease: "power2.out",
    });
  };
  useEffect(() => {
    if (isOpen) {
      openSidebar();
    } else {
      closeSidebar();
    }
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <>
      <div
        className=" flex-column flex-shrink-0 p-3 text-bg-dark hamMenu"
        ref={sidebarRef}
      >
        <NavLink
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/create-post"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              Create Post
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>mdo</strong>
          </a>
        </div>
      </div>
      <header className="p-3 text-bg-dark header ">
        <div className="d-flex align-items-center justify-content-center justify-content-lg-start navContainer">
          {/* <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 navUl">
            <li>
              <NavLink to="/" end className="nav-link px-2 text-white">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/create-post" className="nav-link px-2 text-white">
                Create Post
              </NavLink>
            </li>
          </ul> */}
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 navUl nav-pills mb-auto">
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
                to="/my-posts"
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active" : ""}`
                }
              >
                My Posts
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
          <div className="navTools">
            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 searchBar"
              role="search"
            >
              <input
                type="search"
                className="form-control form-control-dark text-bg-dark"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            <div className="text-end navBtn">
              {isAuthenticated ? (
                <>
                  <NavLink to="/profile" className="btn btn-outline-light me-2">
                    Profile
                  </NavLink>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="btn btn-outline-light me-2">
                    Login
                  </NavLink>
                  <NavLink to="/signup" className="btn btn-warning">
                    Sign-up
                  </NavLink>
                </>
              )}
            </div>
          </div>
          <div className="hamBtn">
            <Hamburger size={30} toggled={isOpen} toggle={setOpen} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
