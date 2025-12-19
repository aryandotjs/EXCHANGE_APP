import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    const result = await axios("https://api.backpack.exchange/api/v1/markets?marketType=SPOT")
     return NextResponse.json(result.data)
}