import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">

      <h1 className="logo">
        Budget Buddy
      </h1>

      <ul>
        <li>
          <NavLink to="/">
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/transactions">
            Transactions
          </NavLink>
        </li>

        <li>
          <NavLink to="/reports">
            Reports
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;