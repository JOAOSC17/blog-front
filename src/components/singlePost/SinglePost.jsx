import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Context } from '../../context/Context'
import { Link, useLocation } from "react-router-dom";
import "./SinglePost.css";
export default function SinglePost() {
  const PF = 'http://localhost:5000/images/'
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const { user } = useContext(Context)
  const [post, setPost] = useState([])
  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get('http://localhost:5000/api/posts/' + path)
      setPost(data)
  }
    getPost()
  }, [path])
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        data:{ username:user.username },
      })
      window.location.replace("/")
    } catch (err) {}
  }
  console.log(post.username === user.username)
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
        <img
          className="singlePostImg"
          src={PF + post.photo}
          alt=""
        />)}
        <h1 className="singlePostTitle">
          {post.title}
          {post.username === user.username && 
          (<div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i onClick={handleDelete} className="singlePostIcon far fa-trash-alt"></i>
          </div>)}
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {post.desc}
        </p>
      </div>
    </div>
  );
}