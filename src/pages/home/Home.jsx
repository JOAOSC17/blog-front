import React from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import { useLocation } from "react-router-dom";
import './Home.css'
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
    const [posts, setPosts] = useState([])
    const {search} = useLocation()
    useEffect(()=> {
    const fetchPosts = async () => {
    const { data } = await axios.get("https://blog-example-backend.herokuapp.com/api/posts" + search)
    setPosts(data)
    }
    fetchPosts()
    }, [search])
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
