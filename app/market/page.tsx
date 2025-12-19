"use client";
import { useEffect, useState } from "react";
import { Allmarkets } from "../comp/allmarkets";
import { getMarkets } from "../utils/httpinitials";

export default function Market() {
  const [Markets, setMarkets] = useState<any | null>("");
  useEffect(() => {
    getMarkets().then((a) => {
      setMarkets(a);
    });
  }, []);

  if (!Markets) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="flex w-full ">
      <Allmarkets markets={Markets}></Allmarkets>
    </div>
  );
}
