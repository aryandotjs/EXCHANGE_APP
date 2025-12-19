"use client";
import { useState } from "react";

export default function Swapui() {
  const [buysell, setbuysell] = useState("buy");
  const [market, setmarket] = useState("limit");
  return (
    <div className="w-full">
      <div className="flex  cursor-pointer h-15 mb-3">
        <BuyButton buysell={buysell} setbuysell={setbuysell}></BuyButton>
        <SellButton buysell={buysell} setbuysell={setbuysell}></SellButton>
      </div>
      <div className=" flex  mx-6 gap-5 ">
        <div
          onClick={() => setmarket("limit")}
          className={` 
        ${
          market == "limit"
            ? "border-b-2 border-blue-500 hover"
            : "border-b border-transparent hover:border-white "
        }
         pb-1.5 mb-2   tracking-wider  text-xs cursor-pointer `}
        >
          Limit
        </div>
        <div
          onClick={() => setmarket("market")}
          className={` 
        ${
          market == "market"
            ? "border-b-2 border-blue-500"
            : "border-b border-transparent hover:border-white"
        }
           pb-1.5  mb-2   tracking-wider  text-xs cursor-pointer `}
        >
          Market
        </div>
      </div>
      <div className="flex justify-between  text-xs mx-6 mt-1">
        <div>Available Balance</div>
        <div>42.32 USDC</div>
      </div>
      <div className="mx-6">
        <div className="text-xs mt-4 mb-2 ">Price</div>
        <div className="relative w-full">
          <input
            type="number"
            readOnly
            value={"144.23"}
            className="  [&::-webkit-inner-spin-button]:hidden
          [&::-webkit-outer-spin-button]:hidden
          [appearance:textfield] h-12 rounded-lg border-2 w-full border-zinc-800 border-solid text-right text-l px-13 "
          ></input>
          <div className="absolute right-3 top-3">
            <img
              alt="SOL Logo"
              loading="lazy"
              decoding="async"
              data-nimg="1"
              className="z-10  rounded-full h-6 w-6 "
              src="/usdc2.png"
            />
          </div>
        </div>
      </div>
      <div className="mx-6">
        <div className="text-xs  mb-3 ">Quantity</div>
        <div className="relative w-full">
          <input
            type="number"
            readOnly
            value={"112"}
            className="  [&::-webkit-inner-spin-button]:hidden
          [&::-webkit-outer-spin-button]:hidden
          [appearance:textfield] h-12 rounded-lg border-2 w-full border-zinc-800 border-solid text-right text-l px-13 "
          ></input>
          <div className="absolute right-3 top-3">
            <img
              alt="SOL Logo"
              loading="lazy"
              decoding="async"
              data-nimg="1"
              className="z-10 rounded-full h-6 w-6 "
              src="/sol.png"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mx-6">
        <div className="text-xs p-2"> ≈ 0.00 USDC</div>
      </div>
      <div className="flex mt-2 gap-2 justify-center ">
        <div className="bg-zinc-800 rounded-full text-xs px-[16px] py-[6px]">
          25%
        </div>
        <div className="bg-zinc-800 rounded-full text-xs px-[16px] py-[6px]">
          50%
        </div>
        <div className="bg-zinc-800 rounded-full text-xs px-[16px] py-[6px]">
          75%
        </div>
        <div className="bg-zinc-800 rounded-full text-xs px-[16px] py-[6px]">
          Max
        </div>
      </div>
      <div>
        <div className="bg-green-400 rounded-xl font-semibold text-black text-center p-3 my-4 mx-6 h-12">
          Buy
        </div>
      </div>
      <div className="mx-6 flex gap-4">
        <div className="text-xs flex justify-center items-center">
          <input type="checkbox" className="mr-3 h-5 w-5"></input>
          <div>Post Only</div>
        </div>
        <div className="text-xs flex">
          <input type="checkbox" className="mr-3 h-5 w-5"></input>
          <div>IOC</div>
        </div>
      </div>
    </div>
  );
}

function BuyButton({ buysell, setbuysell }: any) {
  return (
    <div
      onClick={() => setbuysell("buy")}
      className={`border-b  flex justify-center items-center text-s w-full ${
        buysell == "buy" ? "border-green-500  bg-green-300/10" : "border-white"
      } `}
    >
      Buy
    </div>
  );
}
function SellButton({ buysell, setbuysell }: any) {
  return (
    <div
      className={`border-b  flex justify-center items-center  text-s w-full ${
        buysell == "sell" ? "border-red-700  bg-red-300/10" : "border-white"
      } `}
      onClick={() => setbuysell("sell")}
    >
      {" "}
      Sell
    </div>
  );
}
