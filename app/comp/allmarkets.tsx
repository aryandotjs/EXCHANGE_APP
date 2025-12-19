import { useRouter } from "next/navigation";

export function Allmarkets({ markets }: any) {
  const router = useRouter();
  return (
    <div>
      {markets.map((a: any) => {
        const icon = a.baseSymbol.toLowerCase();
        return (
          <div>
            <div
              onClick={() => {
                router.push(`trade/${a.baseSymbol}_USDC`);
              }}
              className="flex border border-gray-800 p-2 rounded-full gap-3 m-2 items-center cursor-pointer"
            >
              <img
                className="h-7 w-7 rounded-full"
                src={`https://backpack.exchange/coins/${icon}.png`}
              ></img>
              <div>{a.baseSymbol}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
