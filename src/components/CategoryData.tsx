import { CategoryType } from "@/types";

type SearchDataProps = {
  handleCategoryChange: (newCategory: CategoryType) => void;
  category: string;
};

const categoryOption = ["now_playing", "popular", "top_rated", "upcoming"];

export default function CategoryData({
  handleCategoryChange,
  category,
}: SearchDataProps) {
  return (
    <div className="flex gap-4 px-4 text-xs md:text-base">
      {categoryOption.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryChange(cat as CategoryType)}
          className={`flex-1 md:flex-none px-2 md:px-4 py-2 rounded capitalize ${
            category === cat ? "bg-blue-600 text-white" : "bg-gray-500"
          }`}
        >
          {cat.replace("_", " ")}
        </button>
      ))}
    </div>
  );
}
