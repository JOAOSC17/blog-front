import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Sidebar.css";
export default function Sidebar() {
  const [cats, setCats] = useState([])
  useEffect(() => {
    const getCats = async () => {
      const { data } = await axios.get('https://blog-example-backend.herokuapp.com/api/categories')
      setCats(data)
    }
    getCats()
  }, [])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((cat) => (
          <li className="sidebarListItem" key={cat._id}>
            <Link className="link" to={`/?cat=${cat.name}`}>
              {cat.name}
            </Link>
          </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}