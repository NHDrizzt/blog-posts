import React, { useState } from "react";

export default function PostsCard({ posts }) {

  const [isPostsDetail, setIsPostsDetail] = useState(false)
  const [closePostModal, setClosePostModal] = useState(false)
  const [currentPost, setCurrentPost] = useState(0)
  const [value, setValue] = useState('');


  console.log(posts)
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

  return (
    <div className="p-2 shadow-md">
      <div className="p-2 shadow-md">
      {posts.items ? posts.items.map((post, idx) => (
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
            <div className="container mx-auto w-11/12 md:w-[600px] md:h-[600px] bg-white rounded-md p-5">
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
              <div className="flex flex-col">
                <h3>Replies: </h3>
                {posts.items[currentPost].replies.comments.map((comment, idx) => <p key={idx}>{comment.content}</p>)}
                <p className="border m-2"></p>
              </div>
              <textarea onChange={(e) => setValue(e.target.value)} value={value} className="flex justify-center border w-[300px] h-[120px]" name="addComment" id=""></textarea> 
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

//props validation
