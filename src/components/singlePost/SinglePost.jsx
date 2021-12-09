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
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [updateMode, setUpdateMode] = useState(false)
  const [post, setPost] = useState([])
  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get('http://localhost:5000/api/posts/' + path)
      setPost(data)
      setTitle(data.title)
      setDesc(data.desc)
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
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
          username:user.username,
          title,
          desc 
        })
      window.location.reload()
    } catch (err) {}
  }
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
        <img
          className="singlePostImg"
          src={PF + post.photo}
          alt=""
        />)}
        {updateMode ? (
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          autoFocus 
          className="singlePostTitleInput"
          />
          ) : (
        <h1 className="singlePostTitle">
          {post.title}
          {post.username === user.username && 
          (<div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
            <i onClick={handleDelete} className="singlePostIcon far fa-trash-alt"></i>
          </div>)}
        </h1>
        ) }
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
        {updateMode ? (
        <textarea 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)}
          className="singlePostDescInput"
          />
          ) : (
        <p className="singlePostDesc">
          {post.desc}
        </p>
        )}
        <button className="singlePostButton" onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}