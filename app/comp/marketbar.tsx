"use client";
import { useEffect, useState } from "react";
import { getTicker } from "../utils/httpinitials";
import { Ticker } from "../utils/types";
import { signalingManager } from "../utils/signalingmanager";

export function TickerBar({ market }: { market: string }) {
  const [ticker, setTicker] = useState<Ticker | null>(null);
  const [icon, seticon] = useState("usdc");
  useEffect(() => {
    getTicker(market).then((data) => {
      setTicker(data);
    });
    let captial = market.split("_")[0];
    const lower = captial.toLocaleLowerCase();
    seticon(lower);

    signalingManager.getInstance().regesterCallback(
      "ticker",
      (a: any) => {
        setTicker((us) => ({
          firstPrice: a.firstPrice ?? us?.firstPrice ?? "",
          high: a.high ?? us?.high ?? "",
          lastPrice: a.lastPrice ?? us?.lastPrice ?? "",
          low: a.low ?? us?.low ?? "",
          priceChange: a.us ?? us?.priceChange ?? "",
          priceChangePercent:
            a.priceChangePercent ?? us?.priceChangePercent ?? "",
          quoteVolume: a.quoteVolume ?? us?.quoteVolume ?? "",
          symbol: a.fax ?? us?.symbol ?? "",
          trades: a.trades ?? us?.trades ?? "",
          volume: a.volume ?? us?.volume ?? "",
        }));
      },
      market
    );

    signalingManager.getInstance().sendmessages({
      method: "SUBSCRIBE",
      params: [`ticker.${market}`],
    });

    return () => {
      console.log("UNSUBSCRIBE ingggg");
      signalingManager.getInstance().sendmessages({
        method: "UNSUBSCRIBE",
        params: [`ticker.${market}`],
      });
      signalingManager.getInstance().deRegesterCallback("ticker", market);
    };
  }, [market]);

  const name = market.replace("_", " / ");
  return (
    <div className="w-full flex  h-15 border-b border-zinc-800 items-center">
      <div className="flex justify-between w-140 items-center ml-2">
        <div className="flex gap-7 items-center">
          <div className="flex relative">
            <img
              className="h-6 w-6 rounded-full z-4 relative"
              src={`https://backpack.exchange/coins/${icon}.png`}
            ></img>
            <img
              className="h-6 w-6 rounded-full absolute left-4"
              src={"/usdc2.png"}
            ></img>
          </div>
          <div className="font-medium text-sm tracking-tighter ">{name}</div>
        </div>
        <div>
          <div className="font-medium tabular-nums text-greenText text-md text-green-500">
            ${ticker?.lastPrice}
          </div>
          <div className="font-medium text-sm  tabular-nums">
            {" "}
            ${ticker?.firstPrice}
          </div>
        </div>
        <div>
          <div className="font-medium text-slate-400 text-xs">24H Change</div>
          <div
            className={`text-sm font-medium ${
              Number(ticker?.priceChangePercent) > 0
                ? "text-green-500"
                : "text-red-600"
            }`}
          >
            {" "}
            {ticker?.priceChange} %
          </div>
        </div>
        <div>
          <div className=" text-slate-400 text-xs">24H High</div>
          <div className="font-medium text-sm ">{ticker?.high}</div>
        </div>
        <div>
          <div className=" text-slate-400 text-xs">24H Low</div>
          <div className="font-medium text-sm ">{ticker?.low}</div>
        </div>
        <div>
          <div className=" text-slate-400 text-xs">24H Volume</div>
          <div className="tabular-nums font-medium text-sm ">
            {ticker?.volume}
          </div>
        </div>
        {/* <div>
          <div className=" text-slate-400 text-xs">24H Volume</div>
          <div className="tabular-nums font-medium text-sm ">
            {ticker?.symbol}
          </div>
        </div> */}
      </div>
    </div>
  );
}
