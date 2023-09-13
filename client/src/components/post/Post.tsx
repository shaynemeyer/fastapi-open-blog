import { useEffect, useState } from 'react';
import Card from '../card/Card';
import { config } from '../../../libs/constants';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

interface PostItem {
  id: number;
  image_url: string;
  title: string;
  creator: string;
  content: string;
}

interface PostProps {
  post: PostItem;
}

function Post({ post }: PostProps) {
  const { image_url, title, content, creator } = post;
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setImageUrl(BASE_URL + image_url);
  }, []);

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();

    const result = await axios.delete(`${config.BASE_URL}post/${post.id}`);
    console.log(JSON.stringify(result));
    // todo: handle error here
    if (result.status === 200) {
      window.location.reload();
    }
  };

  return (
    <div className="w-1/2 ml-auto mr-auto max-w-1/2 mb-8">
      <Card>
        <div className="flex">
          <img
            className="block rounded-lg w-1/3 object-contain pr-2 mb-auto"
            src={imageUrl}
          />
          <div className="block p-2">
            <div className="text-3xl">{title}</div>
            <div className="text-sm italic m-1 ml-2">by {creator}</div>
            <div className="whitespace-pre-line">{content}</div>
            <div className="m-2">
              <button className="btn-warning" onClick={handleDelete}>
                Delete post
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Post;
