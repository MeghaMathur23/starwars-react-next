
import Cookies from "js-cookie";
import Router  from "next/router";

const Navigation = (props) => {

  const logout = () => {
    Cookies.remove("username");
    Router.push("/")
  };
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <span className="logo">
          {/* <Link to="/" >Logo</Link> */}
        </span>



        <div className="collapse navbar-collapse" id="collapsibleNavbar"></div>
        <ul className="nav navbar-nav navbar-right">
          <li style={{ color: "white" }}>
            <span>{Cookies.get("username")}</span>
          </li>

          <li style={{ color: "white",marginLeft:"10px" }}>
            <span onClick={logout}>Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
