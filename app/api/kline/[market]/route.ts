import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req :NextRequest, context :any) {
    const params= await context.params
    const market = params.market
    const interval = 1
    const startTime = 1764260000
  try {
    const res = await axios(
     `https://api.backpack.exchange/api/v1/klines?symbol=${market}&interval=${interval}h&startTime=${startTime}`
    );
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message, status: "500" });
  }
}
