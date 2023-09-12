import { useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:8000';

interface PostItem {
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

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
  };

  return (
    <div className="flex w-1/2 ml-auto mr-auto bg-white max-w-1/2 mb-12">
      <img className="block w-1/3 object-contain pr-2 mb-auto" src={imageUrl} />
      <div className="block">
        <div className="text-3xl">{title}</div>
        <div className="text-sm italic m-1 ml-2">by {creator}</div>
        <div className="whitespace-pre-line">{content}</div>
        <div className="m-2">
          <button onClick={handleDelete}>Delete post</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
