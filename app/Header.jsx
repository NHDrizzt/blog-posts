import React, { useState } from "react";

export default function PostsCard({ posts, filterValue }) {

  return (
    <div className="shadow-lg flex justify-center items-center h-[50px] text-black gap-x-2">
        <button>Home</button>
        <p>|</p>
        <button>Blog Posts</button>
    </div>
  );
}

//props validation
