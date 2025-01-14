type SearchDataProps = {
  handleSearchKeyword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  deleteSearchQuery: () => void;
};

export default function SearchData({
  handleSearchKeyword,
  searchQuery,
  deleteSearchQuery,
}: SearchDataProps) {
  return (
    <div className="p-4 relative">
      <input
        onChange={handleSearchKeyword}
        value={searchQuery}
        className="w-full bg-transparent p-4 rounded-full border-2 border-gray-600"
        placeholder="Cari film di sini"
      />
      {searchQuery && (
        <div
          className="absolute right-10 top-7 text-2xl cursor-pointer"
          onClick={deleteSearchQuery}
        >
          x
        </div>
      )}
    </div>
  );
}
