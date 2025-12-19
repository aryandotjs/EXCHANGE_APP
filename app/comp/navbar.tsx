"use client";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const route = usePathname();
  return (
    <div>
      <div className=" flex justify-between  h-16 border-b border-zinc-800 px-6 cursor-pointer ">
        <div className=" flex items-center gap-8 ">
          <div onClick={() => router.push("/")}>Exchnage</div>
          <div
            className={` text-xs ${
              route.startsWith("/market") ? "text-zinc-600" : "text-white"
            }`}
            onClick={() => router.push("/market")}
          >
            Markets
          </div>
          <div
            className={` text-xs ${
              route.startsWith("/trade") ? "text-zinc-600" : "text-white"
            }`}
            onClick={() => router.push("/trade/BTC_USDC")}
          >
            Trade
          </div>
        </div>
        <div className=" flex  items-center  ">
          <div className="bg-green-300/10 rounded-lg items-center flex font-semibold h-8 px-4 text-xs text-green-400 mx-2">
            Deposit
          </div>
          <div className="bg-blue-500/10 rounded-lg items-center flex font-semibold h-8 px-4 text-xs text-blue-500 mx-2">
            Withdraw
          </div>
        </div>
      </div>
    </div>
  );
}
