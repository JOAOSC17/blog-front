import { useState, useContext } from "react";
import axios from "axios";
import { Context } from '../../context/Context'
import "./Write.css";

export default function Write() {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const { user } = useContext(Context)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      username:user.username,
      title,
      desc,
    };
    if(file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name", filename)
      data.append("file", file)
      newPost.photo = filename
      try {
        await axios.post('https://blog-example-backend.herokuapp.com/api/upload/', data)
      } catch (err) {}
    }
    try {
      const res = await axios.post('https://blog-example-backend.herokuapp.com/api/posts/', newPost)
      window.location.replace("/post/" + res.data._id)
      } catch (err) {}
  }
  return (
    <div className="write">
      {file && (<img
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      />)}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input 
            id="fileInput" 
            onChange={(e) => setFile(e.target.files[0])} 
            type="file" 
            style={{ display: "none" }} 
          />
          <input
            className="writeInput"
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Title"
            type="text"
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)} 
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}