import axios from "axios";
import { Depthtype, Klines, Ticker } from "./types";

const baseUrl = "/api/";

export async function getTicker(market: string): Promise<Ticker> {
  const ticker = await axios.get(`${baseUrl}ticker/${market}`);
  if (!ticker) {
    throw new Error(`cant find ticker for ${market}`);
  }
  return ticker.data;
}

export async function getDepth(market: string): Promise<Depthtype> {
  const depth = await axios.get(`${baseUrl}depth/${market}`);
  if (!depth) {
    throw new Error(`cant find ticker for ${market}`);
  }
  return depth.data;
}

export async function getKlines(market: string): Promise<Klines> {
  const depth = await axios.get(`${baseUrl}kline/${market}`);
  if (!depth) {
    throw new Error(`cant find ticker for ${market}`);
  }
  return depth.data;
}

export async function getMarkets() {
  const markets = await axios.get(`${baseUrl}markets`);
  if (!markets) {
    throw new Error(`cant find ticker for `);
  }
  return markets.data;
}
