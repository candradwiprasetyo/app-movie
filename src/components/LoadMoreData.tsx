type LoadMoreDataProps = {
  isLoading: boolean;
  isReloading: boolean;
};

export default function LoadMoreData({
  isLoading,
  isReloading,
}: LoadMoreDataProps) {
  return (
    isLoading &&
    !isReloading && (
      <div className="flex items-center justify-center w-full h-16">
        <span>Memuat data baru ...</span>
      </div>
    )
  );
}
