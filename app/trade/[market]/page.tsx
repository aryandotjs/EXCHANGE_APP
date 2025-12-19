"use client";
import { useParams } from "next/navigation";
import { TickerBar } from "../../comp/marketbar";
import Swapui from "../../comp/swapui";
import { OrderBook } from "@/app/comp/orderbook";
import { Chart } from "@/app/comp/chart";

export default function Trade() {
  const { market } = useParams();
  return (
    <div className="flex justify-between w-full">
      <div className="w-[80%] border-r  border-zinc-800 h-screen">
        <TickerBar market={market as string}></TickerBar>
        <div className="flex  justify-between w-full">
          <div className="w-[74%] ">
            <Chart market={market as string}></Chart>
          </div>
          <div className="w-[26%]">
            <OrderBook market={market as string}></OrderBook>
          </div>
        </div>
      </div>
      <div className="w-[20%]">
        <Swapui></Swapui>
      </div>
    </div>
  );
}
