import { useEffect, useRef, useState } from "react";
import { getDepth, getTicker } from "../utils/httpinitials";
import { Depthtype } from "../utils/types";
import { data } from "react-router-dom";
import { signalingManager } from "../utils/signalingmanager";
import { Ask } from "./ask";
import { Bid } from "./bid";

export function OrderBook({ market }: { market: string }) {
  const [bid, setbid] = useState<any[]>([]);
  const [ask, setask] = useState<any[]>([]);

  const bidref = useRef<any[]>([]);
  const Askref = useRef<any[]>([]);

  const [price, setprice] = useState();

  useEffect(() => {
    getDepth(market).then((data: any) => {
      setask(data.asks);
      setbid(data.bids);
      Askref.current = data.asks;
      bidref.current = data.bids;
    });
    getTicker(market).then((d: any) => {
      setprice(d.lastPrice);
    });

    signalingManager.getInstance().regesterCallback(
      "depth",
      (cask: any, cbids: any) => {
        if (cask) {
          const copy = [...(Askref.current || [])];

          let found = 1;

          for (let i = 0; i < copy.length; i++) {
            if (Number(copy[i][0]) == Number(cask[0])) {
              if (Number(cask[1]) === 0) {
                copy.splice(i, 1);
                found = 0;
                break;
              }
              copy[i][1] = cask[1];
              found = 0;
              break;
            }
          }

          if (found && !(Number(cask[1]) == 0)) {
            copy.push(cask);
          }
          copy.sort((a, b) => Number(a[0]) - Number(b[0]));

          Askref.current = copy;
        }
        if (cbids) {
          const copy2 = [...(bidref.current || [])];

          let found2 = 1;

          for (let i = 0; i < copy2.length; i++) {
            if (Number(copy2[i][0]) == Number(cbids[0])) {
              if (Number(cbids[1]) === 0) {
                copy2.splice(i, 1);
                found2 = 0;
                break;
              }
              copy2[i][1] = cbids[1];
              found2 = 0;
              break;
            }
          }

          if (found2 && !(Number(cbids[1]) == 0)) {
            copy2.push(cbids);
          }
          copy2.sort((a, b) => Number(a[0]) - Number(b[0]));

          bidref.current = copy2;
        }
      },
      market
    );
    signalingManager
      .getInstance()
      .sendmessages({ method: "SUBSCRIBE", params: [`depth.${market}`] });
    return () => {
      signalingManager.getInstance().deRegesterCallback("depth", market);
      signalingManager
        .getInstance()
        .sendmessages({ method: "UNSUBSCRIBE", params: [`depth.${market}`] });
    };
  }, [market]);

  useEffect(() => {
    const interval = setInterval(() => {
      const bidlength = bidref.current.length;
      const startofnewarr = bidlength - 21;
      const top20bids = [...bidref.current].slice(startofnewarr, bidlength - 1);
      const top20ask = [...Askref.current].slice(0, 20);
      setask(top20ask);
      setbid(top20bids);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [market]);
  return (
    <div className="w-full">
      <div>
        <div className="flex text-xs justify-between mr-2">
          <p>Price</p>
          <p>Size</p>
          <p>Total</p>
        </div>
        <div className="h-140   overflow-scroll ">
          <div>
            <Ask data={ask}></Ask>
            <div>{price}</div>
            <Bid data={bid}></Bid>
          </div>
        </div>
      </div>
    </div>
  );
}
