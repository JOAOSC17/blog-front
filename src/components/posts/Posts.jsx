import Post from "../post/Post";
import "./Posts.css";

export default function Posts({posts}) {
  return (
    <div className="posts">
      {posts.map((post, index)=> <Post post={post} key={index}/>)}
    </div>
  )
}