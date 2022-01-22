import { useEffect, useMemo, useRef } from "react"
import bb, { bar, donut, pie, line,Chart, ChartOptions, ChartTypes } from "billboard.js";

export type BillboardChartProps = {
  options: ChartOptions;
}

const TypeMap = new Map<string, () => ChartTypes>([
  ['bar', bar],
  ['donut', donut],
  ['pie', pie],
  ['line', line],
]);

export default function BillboardChart({ options }: BillboardChartProps) {
  const chartElRef = useRef<HTMLDivElement>(null);
  let chartRef = useRef<Chart|null>();

  useEffect(() => {
    if (!options.data?.columns) {
      return;
    }

    if (!chartRef.current) {
      const { data, ...rest } = options;
      const { type = 'bar' } = data ?? {};
      let fn = TypeMap.get(type);
      if (!fn) {
        fn = bar;
      }

      chartRef.current = bb.generate({
        ...rest,
        data: {
          ...data,
          type: fn()
        },
        bindto: chartElRef.current
      })
    } else {
      chartRef.current.load({
        // unload: true,
        columns: options.data?.columns
      })
    }
  }, [options]);

  return (
    <div ref={chartElRef}></div>
  )
}
