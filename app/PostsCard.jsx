export default function PostsCard({ posts }) {

  const handlePostsDetail = () => {
    console.log('handlePostsDetail')
  }

  return (
    <div className="p-2 shadow-md">
      {posts && posts.items.map((post) => (
        <div className="p-2 shadow-md w-[400px] mt-4 rounded-md border" key={post.id}>
          <h2 className="">Title: {post.title}</h2>
          <div className="">
            <div className="flex justify-between">
              <h3>Author: {post.author.displayName}</h3>
              <h3>Replies: {post.replies.totalItems}</h3>
            </div>
      
            <button onClick={handlePostsDetail} className="rounded-md shadow-md border hover:shadow-xl p-1"> Ver detalhes</button>
          </div>
     
        </div>
      ))}
    </div>
  );
}

//props validation
