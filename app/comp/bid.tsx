export function Bid({ data }: any) {
  // console.log(data[0]);
  if (!data || data.length === 0) return <div>Loading...</div>;

  let total = 0;
  const bars = [...data].map((row: any) => {
    total += Number(row[1]);
    return [row[0], row[1], total];
  });

  const maxTotal = total;

  return (
    <div className="w-full pr-1">
      {bars.map((row: any, index: any) => (
        <div key={index} className="relative h-5 my-0.5">
          <div
            className="bg-green-500/40 absolute top-0 right-0 h-5 transition-[width] duration-500 ease-in-out"
            style={{ width: `${(row[1] / maxTotal) * 100}%` }}
          />
          <div
            className="bg-green-400/20 absolute top-0 right-0 h-5 transition-[width] duration-500 ease-in-out"
            style={{ width: `${(row[2] / maxTotal) * 100}%` }}
          />
          <div className="flex justify-between text-xs px-2 relative z-10">
            <div className="text-green-600">{row[0]}</div>
            <div>{row[1]}</div>
            <div>{row[2].toFixed(5)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
