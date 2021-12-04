import React from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './Home.css'
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
    const [posts, setPosts] = useState([])
    useEffect(()=> {
    const fetchPosts = async () => {
    const { data } = await axios.get("http://localhost:5000/api/posts")
    setPosts(data)
    console.log(posts)
    }
    fetchPosts()
    }, [])
    return (
        <>
        <Header/>
        <div className="home">
            <Posts posts={posts}/>
            <Sidebar/>
        </div>
        </>
    )
}
