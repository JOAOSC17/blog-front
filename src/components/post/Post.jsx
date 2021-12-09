import { Link } from "react-router-dom";
import "./Post.css";
export default function Post({post}) {
  const PF = 'https://blog-example-backend.herokuapp.com/images/'
  return (
    <div className="post">
      {post.photo && (<img
        className="postImg"
        src={PF + post.photo}
        alt=""
      />)}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((category)=>(
            <span className="postCat">{category.name}</span>
          ))}
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </span>
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Life
            </Link>
          </span>
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
          {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
      {post.desc}
      </p>
    </div>
  );
}