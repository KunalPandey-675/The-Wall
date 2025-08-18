import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Hamburger from "hamburger-react";
import gsap from "gsap";
import useUserStore from "../store/UserStore";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
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
      duration: 0.5, // Changed from 1.5 to 0.5 for consistency
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

  // Auto-hide logout popup after 3 seconds
  useEffect(() => {
    if (showLogoutPopup) {
      const timer = setTimeout(() => {
        setShowLogoutPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLogoutPopup]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    // ensure the ham menu closes when logout is triggered from it
    setOpen(false);
    const result = await logout();
    
    if (result.success) {
      setShowLogoutPopup(true);
    }
  };

  // Add this handler to properly sync hamburger state
  const handleHamburgerToggle = (toggled) => {
    setOpen(toggled);
  };

  return (
    <>
      {/* Logout Success Popup */}
      {showLogoutPopup && (
        <div 
          className="position-fixed top-0 start-50 translate-middle-x mt-3 alert alert-success alert-dismissible fade show" 
          style={{ zIndex: 9999, minWidth: '300px' }}
          role="alert"
        >
          <i className="bi bi-check-circle-fill me-2"></i>
          Logged out successfully!
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setShowLogoutPopup(false)}
            aria-label="Close"
          ></button>
        </div>
      )}

      <div
        className=" flex-column flex-shrink-0 p-3 text-bg-dark hamMenu"
        ref={sidebarRef}
      >
        <NavLink
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          onClick={handleClose}
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
              onClick={handleClose}
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
              onClick={handleClose}
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
              onClick={handleClose}
            >
              Create Post
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className="d-flex justify-content-center">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className="btn btn-outline-light me-2"
                onClick={handleClose}
              >
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
              <NavLink
                to="/login"
                className="btn btn-outline-light me-2"
                onClick={handleClose}
              >
                Login
              </NavLink>
              
              <NavLink
                to="/signup"
                className="btn btn-warning"
                onClick={handleClose}
              >
                Sign-up
              </NavLink>
            </>
          )}
        </div>
      </div>
      <header className="p-3 text-bg-dark header">
        <div
          className="d-flex align-items-stretch gap-20 justify-content-between navContainer"
          style={{ height: "40px" }}
        >
          <h2 className="me-4 align-items-center h-100 mb-0">THE WALL</h2>
          <ul
            className="nav navUl col-lg-auto mb-2 justify-content-center nav-pills mb-auto h-100 align-items-center"
            style={{ marginBottom: 0 }}
          >
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
          <div className="navTools ms-4 d-flex align-items-center h-100">
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
                </>
              )}
            </div>
          </div>
          <div className="hamBtn align-items-center">
            <Hamburger 
              size={30} 
              toggled={isOpen} 
              toggle={handleHamburgerToggle} 
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
