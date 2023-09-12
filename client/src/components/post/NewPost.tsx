import { ChangeEvent, useState } from 'react';

function NewPost() {
  const [image, setImage] = useState<string | null>(null);
  const [creator, setCreator] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectedFiles = files as FileList;
    if (selectedFiles) {
      setImage(selectedFiles?.[0] as unknown as string);
    }
  };

  const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }

    // const requestOptions = {
    //   method: 'POST',
    //   body: formData,
    // };
  };

  return (
    <div className="w-2/3 mb-12">
      <div className="m-4">
        <input type="file" id="fileInput" onChange={handleImageUpload} />
      </div>
      <div className="text-sm w-full m-4 p-4">
        <input
          className="newpost_creator"
          type="text"
          id="creator_input"
          placeholder="Creator"
          onChange={(event) => setCreator(event.target.value)}
          value={creator}
        />
      </div>
      <div className="text-lg w-full m-4 ">
        <input
          className="text-lg w-full p-4"
          type="text"
          id="title_input"
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
      </div>
      <div className="text-md w-full m-4 p-4">
        <textarea
          className="text-md w-full"
          rows={10}
          id="content_input"
          placeholder="Content"
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
      </div>
      <div>
        <button className="text-md ml-6 btn-primary" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
}

export default NewPost;
