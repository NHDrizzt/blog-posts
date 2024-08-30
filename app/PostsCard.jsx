import React, { useState } from "react";

export default function PostsCard({ posts, filterValue }) {

  const [isPostsDetail, setIsPostsDetail] = useState(false)
  const [currentPost, setCurrentPost] = useState(0)
  const [value, setValue] = useState('');

  const handlePostsDetail = (index) => {
    setIsPostsDetail(!isPostsDetail);
    setCurrentPost(index);
  }

  const handleClosePostModal = () => {
    setIsPostsDetail(false);
  } 

  const handleAddCommentToPost = () => {
    const newPosts = posts;
    newPosts.items[currentPost].replies.comments.push({content: value});
    const commentLength = newPosts.items[currentPost].replies.comments.length;
    newPosts.items[currentPost].replies.totalItems = commentLength;
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddCommentToPost();
    }
  }

  return (
    <div className="p-2 shadow-md">
      <div className="p-2 shadow-md">
      {posts.items ? posts.items
      .filter((post) => post.title.toLowerCase().includes(filterValue.toLowerCase()))
      .map((post, idx) => (
        <div className="p-2 shadow-md w-[400px] mt-4 rounded-md border" key={post.id}>
          <h2 className="">Title: {post.title}</h2>
          <div className="">
            <div className="flex justify-between">
              <h3>Author: {post.author.displayName}</h3>
              <h3>Replies: {post.replies.totalItems}</h3>
            </div>
            <button onClick={() => handlePostsDetail(idx)} className="rounded-md shadow-md border hover:shadow-xl p-1"> Ver detalhes</button>
          </div>
     
        </div>
      )) : (<> </>)}

      {isPostsDetail && (
        <>  
          <div className="fixed inset-0 flex justify-center items-center z-50 outline-none focus:outline-none">
            <div className="container mx-auto w-11/12 max-h-[820px] flex-1 bg-white rounded-md p-5">
            <div className='flex justify-between'> 
              <h2 className="">Title: {posts.items[currentPost].title}</h2>
              <button className="" onClick={handleClosePostModal}>X</button>
            </div> 
            
            <div className="">
              <div className="flex justify-between">
                <h3>Author: {posts.items[currentPost].author.displayName}</h3>
              </div>
              <div>
                <h3>Coments: {posts.items[currentPost].replies.totalItems} </h3>
              </div>
              <div className="flex flex-col max-h-[500px]">
                <h3>Replies: </h3>
                <p className="border m-2"></p>
               
               <div className="overflow-y-scroll">
               {posts.items[currentPost].replies.comments.map((comment, idx) => 
                <div key={idx} className="border rounded-md p-4 my-2 max-w-[50px]"> 
                  <p>{posts.items[currentPost].author.displayName}: </p>
                  <div className="">
                    <p className="pl-2" key={idx}>{comment.content}</p>
                  </div>
                </div>)}
               </div>
                <p className="border m-2"></p>
              </div>
              <textarea onChange={(e) => setValue(e.target.value)} value={value} onKeyDown={handleKeyDown} className="flex justify-center border w-[300px] h-[120px]" name="addComment" id=""></textarea> 
              <button className={'mt-2 border p-2 rounded-md hover:bg-gray-100'} onClick={handleAddCommentToPost}>Add Comment</button>
            </div>
            </div>
            
          </div>
          <div className="opacity-25 fixed inset-0 z-30 bg-black" onClick={handleClosePostModal} ></div>
        </>
      )}
    </div>
    </div>
  );
}