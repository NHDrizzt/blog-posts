'use client'
import { useEffect, useState } from "react";
import PostsCard from "./PostsCard.jsx";
import { API_URL, API_URL_POSTS } from "./constants.jsx";

export default function Home() {
  const [data, setData] = useState({});
  
  const [posts, setPosts] = useState({});
  useEffect(() => {
    const apiCall = async () => {
      const response = await fetch(API_URL);
      const jsonData = await response.json();
      setData(jsonData);
    };
    apiCall();
  },[]);

  useEffect(() => {
    const apiCall = async () => {
      const response = await fetch(API_URL_POSTS);
      const jsonData = await response.json();
      console.log(jsonData)
      setPosts(jsonData);
    };
    apiCall();
  },[]);

  return (
    <div className="flex flex-col justify-center items-center pt-4">
      <h1>{data.description}</h1>
      <div>
        <PostsCard posts={posts} />
      </div>
    </div>
  );
}
