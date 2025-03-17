const Pagination = ({ page, totalPages, setPage }) => {
    return (
        <div className="flex justify-center mt-4">
            <button
                className={`px-4 py-2 mx-1 ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
            >
                Prev
            </button>

            <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>

            <button
                className={`px-4 py-2 mx-1 ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
