// components/physics12/VelocityConstantCalculator.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// ثبت کامپوننت‌های Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export default function VelocityConstantCalculator() {
  const [x, setX] = useState<string>("");
  const [x0, setX0] = useState<string>("");
  const [v, setV] = useState<string>("");
  const [t, setT] = useState<string>("");

  const [result, setResult] = useState<string | null>(null);
  const [missingVar, setMissingVar] = useState<string>("");
  const [vAvg, setVAvg] = useState<string | null>(null);
  const [filledCount, setFilledCount] = useState<number>(0);

  const [preview, setPreview] = useState<string>("x = x₀ + v × t");
  const [showCharts, setShowCharts] = useState<boolean>(false);

  // آپدیت تعداد پرشده‌ها و پیش‌نمایش زنده
  useEffect(() => {
    const values = [x, x0, v, t];
    const count = values.filter(val => val.trim() !== "").length;
    setFilledCount(count);

    const xn = x.trim() === "" ? "x" : x;
    const x0n = x0.trim() === "" ? "x₀" : x0;
    const vn = v.trim() === "" ? "v" : v;
    const tn = t.trim() === "" ? "t" : t;
    setPreview(`${xn} = ${x0n} + ${vn} × ${tn}`);
  }, [x, x0, v, t]);

  const calculate = () => {
    const xn = x.trim() === "" ? NaN : Number(x);
    const x0n = x0.trim() === "" ? NaN : Number(x0);
    const vn = v.trim() === "" ? NaN : Number(v);
    const tn = t.trim() === "" ? NaN : Number(t);

    if (filledCount !== 3) {
      setResult(null);
      setMissingVar("");
      setVAvg(null);
      setShowChart(false);
      return;
    }

    let res: number;
    let missing = "";

    if (isNaN(xn)) {
      res = x0n + vn * tn;
      missing = "x";
    } else if (isNaN(x0n)) {
      res = xn - vn * tn;
      missing = "x₀";
    } else if (isNaN(vn)) {
      if (tn === 0) {
        setResult("زمان نمی‌تواند صفر باشد");
        setVAvg(null);
        setShowChart(false);
        return;
      }
      res = (xn - x0n) / tn;
      missing = "v";
    } else if (isNaN(tn)) {
      if (vn === 0) {
        setResult("سرعت نمی‌تواند صفر باشد");
        setVAvg(null);
        setShowChart(false);
        return;
      }
      res = (xn - x0n) / vn;
      missing = "t";
    } else {
      setResult("خطا");
      setShowChart(false);
      return;
    }

    setResult(res.toFixed(3));
    setMissingVar(missing);

    // سرعت متوسط
    if (!isNaN(xn) && !isNaN(x0n) && !isNaN(tn) && tn !== 0) {
      const deltaX = xn - x0n;
      const vAvgRes = deltaX / tn;
      setVAvg(vAvgRes.toFixed(3));
    } else {
      setVAvg(null);
    }

    if (res !== undefined && !isNaN(res)) {
        setShowCharts(true);
        } else {
        setShowCharts(false);
        }
  };


  // داده‌های نمودار – فقط بعد از محاسبه
  const chartData = showCharts && filledCount === 3 ? {
    labels: Array.from({ length: 11 }, (_, i) => (i * Number(t || 1) / 10).toFixed(1)), // ۰ تا t با ۱۰ نقطه
    datasets: [
      {
        label: "مکان (x)",
        data: Array.from({ length: 11 }, (_, i) => {
          const timePoint = (i * Number(t || 1) / 10);
          return Number(x0 || 0) + Number(v || 0) * timePoint;
        }),
        borderColor: "rgb(29, 205, 159)", // ThirdColor
        backgroundColor: "rgba(29, 205, 159, 0.1)",
        tension: 0.1,
        fill: true,
      },
    ],
  } : null;

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top" as const,
//         labels: { color: "#ededed" },
//       },
//       title: {
//         display: true,
//         text: "نمودار مکان بر حسب زمان (حرکت با سرعت ثابت)",
//         color: "#ededed",
//         font: { size: 16 },
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "زمان (s)",
//           color: "#ededed",
//         },
//         grid: { color: "rgba(255,255,255,0.1)" },
//         ticks: { color: "#ededed" },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "مکان (m)",
//           color: "#ededed",
//         },
//         grid: { color: "rgba(255,255,255,0.1)" },
//         ticks: { color: "#ededed" },
//       },
//     },
//   };
  // داده مشترک زمان (برای هر سه نمودار)
  const timePoints = showCharts && filledCount === 3
    ? Array.from({ length: 11 }, (_, i) => (i * Number(t || 1) / 10))
    : [];

  // داده نمودار مکان-زمان (x-t)
  const positionData = showCharts && filledCount === 3 ? {
    labels: timePoints.map(t => t.toFixed(1)),
    datasets: [{
      label: "مکان (m)",
      data: timePoints.map(time => Number(x0 || 0) + Number(v || 0) * time),
      borderColor: "#1DCD9F",        // ThirdColor
      backgroundColor: "rgba(29, 205, 159, 0.15)",
      tension: 0,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 8,
    }]
  } : null;

  // داده نمودار سرعت-زمان (v-t) → خط افقی
  const velocityData = showCharts && filledCount === 3 ? {
    labels: timePoints.map(t => t.toFixed(1)),
    datasets: [{
      label: "سرعت (m/s)",
      data: timePoints.map(() => Number(v || 0)),
      borderColor: "#FFD166",
      backgroundColor: "rgba(255, 209, 102, 0.15)",
      tension: 0,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 8,
    }]
  } : null;

  // داده نمودار شتاب-زمان (a-t) → همیشه صفر
  const accelerationData = showCharts && filledCount === 3 ? {
    labels: timePoints.map(t => t.toFixed(1)),
    datasets: [{
      label: "شتاب (m/s²)",
      data: timePoints.map(() => 0),
      borderColor: "#EF476F",
      backgroundColor: "rgba(239, 71, 111, 0.15)",
      tension: 0,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 8,
    }]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const, labels: { color: "#e0e0e0", font: { size: 13 } } },
      title: { display: true, color: "#e0e0e0", font: { size: 15 } },
      tooltip: { backgroundColor: "rgba(15, 23, 42, 0.9)", titleColor: "#fff", bodyColor: "#ddd" },
    },
    scales: {
      x: {
        title: { display: true, text: "زمان (s)", color: "#e0e0e0" },
        grid: { color: "rgba(255,255,255,0.08)" },
        ticks: { color: "#bbb" },
      },
      y: {
        title: { display: true, color: "#e0e0e0" },
        grid: { color: "rgba(255,255,255,0.08)" },
        ticks: { color: "#bbb" },
      },
    },
  };

  return (
    <div className="space-y-10">
      {/* عنوان داخلی کامپوننت */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl tablet-size:text-4xl font-bold bg-gradient-to-r from-[var(--color-ThirdColor)] to-[var(--color-LastColor)] bg-clip-text text-transparent">
          محاسبه‌گر حرکت با سرعت ثابت
        </h2>
        <p className="text-lg text-gray-300 font-mono">x = x₀ + v t</p>
      </div>

      {/* فرم ورودی‌ها */}
      <div className="bg-[var(--color-SecondColor)]/80 border border-[var(--color-ThirdColor)]/30 rounded-3xl p-6 tablet-size:p-10 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-1 tablet-size:grid-cols-2 laptop-size:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="block text-textSize-third text-gray-400 font-medium">مکان نهایی (x) [m]</label>
            <input
              type="number"
              step="any"
              value={x}
              onChange={(e) => setX(e.target.value)}
              className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all"
              placeholder="مثال: 120"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">مکان اولیه (x₀) [m]</label>
            <input
              type="number"
              step="any"
              value={x0}
              onChange={(e) => setX0(e.target.value)}
              className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all"
              placeholder="مثال: 0"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">سرعت (v) [m/s]</label>
            <input
              type="number"
              step="any"
              value={v}
              onChange={(e) => setV(e.target.value)}
              className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all"
              placeholder="مثال: 15"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">زمان (t) [s]</label>
            <input
              type="number"
              step="any"
              value={t}
              onChange={(e) => setT(e.target.value)}
              className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all"
              placeholder="مثال: 8"
            />
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={calculate}
            className="px-12 py-4 bg-gradient-to-r from-[var(--color-ThirdColor)] to-[var(--color-LastColor)] text-[var(--color-MainColor)] font-bold text-lg rounded-2xl shadow-xl hover:shadow-[0_0_30px_var(--color-ThirdColor)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            محاسبه کن
          </button>
        </div>

        {result && (
          <div className="mt-10 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-400 mb-2">متغیر محاسبه‌شده:</p>
            <p className="text-4xl font-mono font-bold text-[var(--color-ThirdColor)]">
              {missingVar} = {result}
            </p>
          </div>
        )}

        <div className="mt-8 bg-black/60 border border-[var(--color-ThirdColor)]/20 rounded-2xl p-5 font-mono text-lg text-center text-gray-200">
          <span className="text-[var(--color-ThirdColor)]">پیش‌نمایش فرمول:</span><br />
          <span className="text-2xl">{preview}</span>
        </div>
      </div>

      {/* بخش سرعت متوسط */}
      <div className="bg-[var(--color-SecondColor)]/80 border border-[var(--color-LastColor)]/30 rounded-3xl p-6 tablet-size:p-10 shadow-2xl backdrop-blur-xl">
        <h2 className="text-2xl tablet-size:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[var(--color-LastColor)] to-[var(--color-ThirdColor)] bg-clip-text text-transparent">
          سرعت متوسط متحرک
        </h2>
        <p className="text-center text-gray-300 text-lg mb-6 font-mono">
          v_avg = Δx / Δt = (x - x₀) / t
        </p>
        <p className="text-gray-400 text-sm tablet-size:text-base text-center mb-8 leading-relaxed">
          سرعت متوسط تغییرات مکان بر تغییرات زمان است. این مقدار بر اساس ورودی‌های بالا محاسبه می‌شود (وقتی x، x₀ و t معلوم باشند).
        </p>

        {vAvg ? (
          <div className="text-center bg-black/40 border border-[var(--color-LastColor)]/30 rounded-2xl p-6">
            <p className="text-sm text-gray-400 mb-2">سرعت متوسط:</p>
            <p className="text-4xl font-mono font-bold text-[var(--color-LastColor)]">
              v_avg = {vAvg} m/s
            </p>
          </div>
        ) : filledCount >= 3 ? (
          <p className="text-center text-yellow-400 text-sm">
            پس از محاسبه اصلی، سرعت متوسط نمایش داده می‌شود (اگر x، x₀ و t موجود باشند).
          </p>
        ) : (
          <p className="text-center text-gray-500 text-sm">
            برای دیدن سرعت متوسط، حداقل سه مقدار (x، x₀، t) را وارد کنید.
          </p>
        )}
      </div>

      {showCharts && filledCount === 3 && (
        <div className="space-y-10">
          <h2 className="text-2xl tablet-size:text-3xl font-bold text-center bg-gradient-to-r from-[var(--color-ThirdColor)] to-[var(--color-LastColor)] bg-clip-text text-transparent">
            نمودارهای حرکت با سرعت ثابت
          </h2>

          <div className="grid grid-cols-1 laptop-size:grid-cols-3 gap-6 laptop-size:gap-8">
            {/* نمودار مکان-زمان */}
            <div className="bg-[var(--color-SecondColor)]/70 border border-[var(--color-ThirdColor)]/20 rounded-2xl p-5 tablet-size:p-6 shadow-xl h-80 tablet-size:h-96">
              <Line
                data={positionData!}
                options={{
                  ...chartOptions,
                  plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: "مکان بر حسب زمان (x-t)" } },
                }}
              />
              <p className="text-center text-sm text-gray-400 mt-3">
                خط مستقیم با شیب برابر سرعت ثابت (v)
              </p>
            </div>

            {/* نمودار سرعت-زمان */}
            <div className="bg-[var(--color-SecondColor)]/70 border border-[var(--color-ThirdColor)]/20 rounded-2xl p-5 tablet-size:p-6 shadow-xl h-80 tablet-size:h-96">
              <Line
                data={velocityData!}
                options={{
                  ...chartOptions,
                  plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: "سرعت بر حسب زمان (v-t)" } },
                }}
              />
              <p className="text-center text-sm text-gray-400 mt-3">
                سرعت ثابت است → خط افقی
              </p>
            </div>

            {/* نمودار شتاب-زمان */}
            <div className="bg-[var(--color-SecondColor)]/70 border border-[var(--color-ThirdColor)]/20 rounded-2xl p-5 tablet-size:p-6 shadow-xl h-80 tablet-size:h-96">
              <Line
                data={accelerationData!}
                options={{
                  ...chartOptions,
                  plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: "شتاب بر حسب زمان (a-t)" } },
                }}
              />
              <p className="text-center text-sm text-gray-400 mt-3">
                شتاب صفر است → خط روی محور افقی
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}