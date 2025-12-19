import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import { getKlines } from "../utils/httpinitials";
// import { useParams } from "next/navigation";

export function Chart({ market }: { market: string }) {
  const [realdata, setrealdata] = useState<any[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);
  const seriesref = useRef<any>(null);

  useEffect(() => {
    getKlines(market).then((d) => {
      const newarr = d.map((a) => {
        return {
          open: parseFloat(a.open),
          high: parseFloat(a.high),
          low: parseFloat(a.low),
          close: parseFloat(a.close),
          time: new Date(a.end).getTime() / 1000,
        };
      });
      setrealdata(newarr);
    });
  }, [market]);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      layout: {
        textColor: "white",
        background: { type: "solid", color: "black" },
      },
      width: chartRef.current.clientWidth,
      height: 500,
    } as any);

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    series.setData(realdata);
    return () => chart.remove();
  }, [realdata]);

  return <div ref={chartRef} />;
}
