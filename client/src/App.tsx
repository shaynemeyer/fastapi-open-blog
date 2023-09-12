import { useEffect, useState } from 'react';
import NewPost from './components/post/NewPost';
import axios from 'axios';
import Post from './components/post/Post';

const BASE_URL = 'http://localhost:8000/';

interface Post {
  image_url: string;
  title: string;
  creator: string;
  content: string;
}

function App() {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    async function fetchAllPosts() {
      const { data } = await axios.get(`${BASE_URL}post/all`);

      setPosts(data);
    }
    fetchAllPosts();
  }, []);
  return (
    <div>
      {/* blog title */}
      <div className="flex w-2/3 ml-auto mr-auto text-6xl justify-center p-4">
        Open City Blog
      </div>
      <div>
        {' '}
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
      <div className="flex w-2/3 ml-auto mr-auto justify-center">
        <NewPost />
      </div>
    </div>
  );
}

export default App;
