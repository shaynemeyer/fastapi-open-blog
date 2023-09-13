import { useEffect, useState } from 'react';
import NewPost from './components/post/NewPost';
import axios from 'axios';
import Post from './components/post/Post';
import Modal from './components/Modal';

const BASE_URL = 'http://localhost:8000/';

interface Post {
  id: number;
  image_url: string;
  title: string;
  creator: string;
  content: string;
}

function App() {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [newPostOpen, setNewPostOpen] = useState(false);

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
        {posts.map((post) => (
          <Post key={`${post.id}`} post={post} />
        ))}
      </div>
      <div className="flex w-full ml-auto mr-auto justify-center">
        <Modal
          isOpen={newPostOpen}
          setIsOpen={setNewPostOpen}
          title="Create Post"
          buttonText="Create Post"
        >
          <NewPost setIsOpen={setNewPostOpen} />
        </Modal>
      </div>
    </div>
  );
}

export default App;
