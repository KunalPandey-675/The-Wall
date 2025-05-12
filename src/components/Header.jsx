import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Hamburger from "hamburger-react";
import gsap from "gsap";
const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const sidebarRef = useRef();
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

  return (
    <>
      <div
        className=" flex-column flex-shrink-0 p-3 text-bg-dark hamMenu"
        ref={sidebarRef}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">THE WALL</span>
        </a>
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
      <header className="p-3 text-bg-dark header">
        <div className="d-flex align-items-center justify-content-center justify-content-lg-start navContainer">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 navUl">
            <li>
              <a href="#" className="nav-link px-2 text-secondary">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                About
              </a>
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
              <button type="button" className="btn btn-outline-light me-2">
                Login
              </button>
              <button type="button" className="btn btn-warning">
                Sign-up
              </button>
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
