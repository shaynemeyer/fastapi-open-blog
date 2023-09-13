import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { config } from '../../../libs/constants';

interface NewPostProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function NewPost({ setIsOpen }: NewPostProps) {
  const [image, setImage] = useState<string | null>(null);
  const [creator, setCreator] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectedFiles = files as FileList;
    if (selectedFiles) {
      setImage(selectedFiles?.[0] as unknown as string);
    }
  };

  const createPost = async (imageUrl: string) => {
    const result = await axios.post(`${config.BASE_URL}post`, {
      image_url: imageUrl,
      title,
      content: text,
      creator,
    });

    if (result.data) {
      window.location.reload();
      window.scrollTo(0, 0);
    }
    // todo: handle error here
  };

  const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }

    const header = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    };

    const result = await axios.post(
      `${config.BASE_URL}post/images`,
      formData,
      header
    );
    if (result.data) {
      createPost(result.data?.filename);
    }
    // TODO: handle error here

    setImage(null);

    // TODO: handle reseting fileInput here with React.refs
    // document?.getElementById('fileInput')?.value = null;
    setIsOpen(false);
  };

  return (
    <div className="mb-5">
      <div className="m-4">
        <input type="file" id="fileInput" onChange={handleImageUpload} />
      </div>
      <div className="text-sm w-full p-4">
        <input
          className="w-full"
          type="text"
          id="creator_input"
          placeholder="Creator"
          onChange={(event) => setCreator(event.target.value)}
          value={creator}
        />
      </div>
      <div className="text-lg w-full p-4">
        <input
          className="text-lg w-full"
          type="text"
          id="title_input"
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
      </div>
      <div className="text-md w-full p-4">
        <textarea
          className="text-md w-full"
          rows={10}
          id="content_input"
          placeholder="Content"
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
      </div>
      <div className="flex w-full ml-auto mr-auto justify-center">
        <button className="text-md ml-6 btn-primary" onClick={handleCreate}>
          Save
        </button>
        <button className="text-md ml-6 btn-bordered" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default NewPost;
