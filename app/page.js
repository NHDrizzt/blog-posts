'use client'
import { useEffect, useState } from "react";
import PostsCard from "./PostsCard.jsx";
import { API_URL, API_URL_POSTS } from "./constants.jsx";
import Header from "./Header.jsx";

export default function Home() {
  const [data, setData] = useState({});
  const [listOfComments, setListOfComments] = useState([])
  const [filterValue, setFilterValue] = useState('')
  
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
      jsonData.items.map((item) => {
        item.replies['comments'] = []
      })
      setPosts(jsonData);
    };
    apiCall();
  },[]);



  return (
    <div>
      <Header  />
       <div className="flex flex-col justify-center items-center pt-4">
          <h1>{data.description}</h1>
          <div>
          <h2>Filter your blog post by title</h2>
          <input onChange={(e) => setFilterValue(e.target.value)} value={filterValue} className='border' type="text" />
          </div>
        
          <div>

            <PostsCard posts={posts} filterValue={filterValue}/>
          </div>
    </div>
    </div>
   
  );
}
