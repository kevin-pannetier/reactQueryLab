import { useCreatePost } from "../hooks/useCreatePost";

const CreatePost = () => {
  const {
    title,
    setTitle,
    body,
    setBody,
    isPending,
    isSuccess,
    isError,
    error,
    handleSubmit,
  } = useCreatePost();

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Create a New Post
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the post title"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter the post body"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className={`w-full p-3 text-white font-medium rounded-md ${
          isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>

      {isError && <p className="mt-4 text-red-600">Error: {error?.message}</p>}
      {isSuccess && (
        <p className="mt-4 text-green-600">Post created successfully!</p>
      )}
    </div>
  );
};

export default CreatePost;
