type VoteProps = {
  customClass?: string;
  value: string;
};

export default function Vote({ customClass, value }: VoteProps) {
  return (
    <div
      className={`border-green-500 rounded-full bg-[#081C22] text-white font-bold flex items-center justify-center ${customClass}`}
    >
      {value}
      <span className="text-[10px] mb-4">%</span>
    </div>
  );
}
