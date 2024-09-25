import { useGetPosts } from "../hooks/useGetPosts";

const Posts = () => {
  const {
    posts,
    isLoading,
    error,
    page,
    handleNextPage,
    handlePreviousPage,
    handleSetPage,
    totalPages, // Assuming the hook also returns the total number of pages
  } = useGetPosts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handleSetPage={handleSetPage}
      />
    </div>
  );
};

export default Posts;

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handleSetPage: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  handleSetPage,
}: PaginationProps) => {
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <div className="flex justify-between mt-6 items-center">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex gap-2">
        {pageNumbers.map((pageNumber, index) => (
          <button
            key={index}
            onClick={() =>
              pageNumber !== "..." && handleSetPage(Number(pageNumber))
            }
            disabled={pageNumber === "..." || pageNumber === currentPage}
            className={`px-3 py-1 rounded-md ${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-200"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

/**
 * Generates an array of page numbers for pagination.
 * - Shows the next 5 pages from the current page.
 * - Shows ellipsis ("...") if there are more pages after the current 5.
 * - Shows the last 5 pages at the end.
 */
function generatePageNumbers(currentPage: number, totalPages: number) {
  const pages: (number | string)[] = [];

  // Always show the first page
  pages.push(1);

  // If the current page is far enough from the first page, show "..." after the first page
  if (currentPage > 6) {
    pages.push("...");
  }

  // Show the next 5 pages after the current page
  const startPage = Math.max(2, currentPage - 2);
  const endPage = Math.min(currentPage + 2, totalPages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // If there are more than 5 pages remaining, show an ellipsis before the last page
  if (totalPages - currentPage > 5) {
    pages.push("...");
  }

  // Always show the last page if it's not already shown
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}
