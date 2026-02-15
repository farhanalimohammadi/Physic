// // components/physics12/ConstantAccelerationCalculator.tsx
// "use client";

// import { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// export default function ConstantAccelerationCalculator() {
//   // حالت انتخاب کاربر (ابتدا 'none' – برای نمایش انتخاب اولیه)
//   const [selectedMode, setSelectedMode] = useState<string>('none'); // 'velocity-time', 'no-time', 'general'

//   // ورودی‌ها – بر اساس mode فیلتر می‌شن
//   const [x0, setX0] = useState<string>("");
//   const [x, setX] = useState<string>("");
//   const [v0, setV0] = useState<string>("");
//   const [v, setV] = useState<string>("");
//   const [a, setA] = useState<string>("");
//   const [t, setT] = useState<string>("");

//   // نتایج
//   const [result, setResult] = useState<string | null>(null);
//   const [missingVar, setMissingVar] = useState<string>("");
//   const [usedFormula, setUsedFormula] = useState<string>("");
//   const [formulaExplanation, setFormulaExplanation] = useState<string>("");
//   const [vAvg, setVAvg] = useState<string | null>(null);
//   const [filledCount, setFilledCount] = useState<number>(0);

//   const [preview, setPreview] = useState<string>("انتخاب نوع مسئله...");
//   const [showChart, setShowChart] = useState<boolean>(false);

//   // آپدیت تعداد پرشده‌ها (فقط فیلدهای مرتبط با mode)
//   useEffect(() => {
//     let relevantFields = [x0, x, v0, v, a, t];
//     if (selectedMode === 'velocity-time') {
//       relevantFields = [v0, v, a, t];  // فقط v, v₀, a, t
//     } else if (selectedMode === 'no-time') {
//       relevantFields = [v0, v, a, x0, x];  // v, v₀, a, Δx (بدون t)
//     } else if (selectedMode === 'general') {
//       relevantFields = [x0, x, v0, v, a, t];  // همه
//     }
//     const count = relevantFields.filter(val => val.trim() !== "").length;
//     setFilledCount(count);

//     // پیش‌نمایش بر اساس mode
//     if (selectedMode === 'velocity-time') {
//       const v0n = v0.trim() === "" ? "v₀" : v0;
//       const vn = v.trim() === "" ? "v" : v;
//       const an = a.trim() === "" ? "a" : a;
//       const tn = t.trim() === "" ? "t" : t;
//       setPreview(`${vn} = ${v0n} + ${an} × ${tn}`);
//     } else if (selectedMode === 'no-time') {
//       const v0n = v0.trim() === "" ? "v₀" : v0;
//       const vn = v.trim() === "" ? "v" : v;
//       const an = a.trim() === "" ? "a" : a;
//       const deltaxn = x.trim() === "" ? "Δx" : `(x - ${x0})`;
//       setPreview(`${vn}² = ${v0n}² + 2 ${an} ${deltaxn}`);
//     } else if (selectedMode === 'general') {
//       const x0n = x0.trim() === "" ? "x₀" : x0;
//       const xn = x.trim() === "" ? "x" : x;
//       const v0n = v0.trim() === "" ? "v₀" : v0;
//       const an = a.trim() === "" ? "a" : a;
//       const tn = t.trim() === "" ? "t" : t;
//       setPreview(`${xn} = ${x0n} + ${v0n} × ${tn} + ½ ${an} × ${tn}²`);
//     } else {
//       setPreview("انتخاب نوع مسئله...");
//     }
//   }, [selectedMode, x0, x, v0, v, a, t]);

//   const calculate = () => {
//     const x0n = x0.trim() === "" ? NaN : Number(x0);
//     const xn = x.trim() === "" ? NaN : Number(x);
//     const v0n = v0.trim() === "" ? NaN : Number(v0);
//     const vn = v.trim() === "" ? NaN : Number(v);
//     const an = a.trim() === "" ? NaN : Number(a);
//     const tn = t.trim() === "" ? NaN : Number(t);

//     let relevantFilled = filledCount;

//     let res: number;
//     let missing = "";
//     let formula = "";
//     let explanation = "";

//     if (selectedMode === 'none') {
//       setResult("ابتدا نوع مسئله را انتخاب کنید.");
//       return;
//     }

//     if (selectedMode === 'velocity-time') {
//       // فقط v, v₀, a, t – حداقل ۳ پر
//       if (relevantFilled !== 3) {
//         setResult("دقیقاً سه مقدار از v, v₀, a, t را وارد کنید.");
//         return;
//       }
//       if (isNaN(vn)) {
//         res = v0n + an * tn;
//         missing = "v";
//         formula = "v = v₀ + a t";
//         explanation = "فرمول سرعت بر حسب زمان انتخاب شد چون مسئله مربوط به متغیرهای v, v₀, a, t است.";
//       } else if (isNaN(v0n)) {
//         res = vn - an * tn;
//         missing = "v₀";
//         formula = "v₀ = v - a t";
//         explanation = "فرمول سرعت بازآرایی شد چون v, a, t معلوم هستند.";
//       } else if (isNaN(an)) {
//         if ((vn - v0n) === 0) {
//           setResult("تغییر سرعت صفر → شتاب صفر است.");
//           res = 0;
//           return;
//         }
//         res = (vn - v0n) / tn;
//         missing = "a";
//         formula = "a = (v - v₀) / t";
//         explanation = "فرمول شتاب از سرعت بازآرایی شد.";
//       } else if (isNaN(tn)) {
//         if (an === 0) {
//           setResult("شتاب صفر → زمان نامعین.");
//           return;
//         }
//         res = (vn - v0n) / an;
//         missing = "t";
//         formula = "t = (v - v₀) / a";
//         explanation = "فرمول زمان از سرعت بازآرایی شد.";
//       }
//     } else if (selectedMode === 'no-time') {
//       // v, v₀, a, x₀, x (Δx) – حداقل ۴ پر
//       if (relevantFilled !== 4) {
//         setResult("دقیقاً چهار مقدار از v, v₀, a, x₀, x را وارد کنید.");
//         return;
//       }
//       const deltaX = !isNaN(xn) && !isNaN(x0n) ? xn - x0n : NaN;
//       if (isNaN(an)) {
//         if (deltaX === 0) {
//           setResult("جابه‌جایی صفر → شتاب نامعین.");
//           return;
//         }
//         res = (vn * vn - v0n * v0n) / (2 * deltaX);
//         missing = "a";
//         formula = "a = (v² - v₀²) / (2 Δx)";
//         explanation = "فرمول مستقل از زمان انتخاب شد چون مسئله بدون زمان است و جابه‌جایی معلوم.";
//       } else if (isNaN(vn)) {
//         res = Math.sqrt(v0n * v0n + 2 * an * deltaX);
//         missing = "v";
//         formula = "v = √(v₀² + 2 a Δx)";
//         explanation = "فرمول سرعت از فرمول مستقل از زمان بازآرایی شد.";
//       } else if (isNaN(v0n)) {
//         res = Math.sqrt(vn * vn - 2 * an * deltaX);
//         missing = "v₀";
//         formula = "v₀ = √(v² - 2 a Δx)";
//         explanation = "فرمول سرعت اولیه از فرمول مستقل از زمان.";
//       } else if (isNaN(deltaX)) {
//         // محاسبه Δx از v, v₀, a
//         res = (vn * vn - v0n * v0n) / (2 * an);
//         missing = "Δx";
//         formula = "Δx = (v² - v₀²) / (2 a)";
//         explanation = "جابه‌جایی از فرمول مستقل از زمان محاسبه شد.";
//       }
//     } else if (selectedMode === 'general') {
//       // همه متغیرها – حداقل ۵ پر
//       if (relevantFilled !== 5) {
//         setResult("دقیقاً پنج مقدار از x₀, x, v₀, v, a, t را وارد کنید.");
//         return;
//       }
//       if (tn === 0) {
//         setResult("زمان نمی‌تواند صفر باشد.");
//         return;
//       }
//       if (isNaN(xn)) {
//         res = x0n + v0n * tn + 0.5 * an * tn * tn;
//         missing = "x";
//         formula = "x = x₀ + v₀ t + ½ a t²";
//         explanation = "فرمول کلی موقعیت انتخاب شد چون زمان (t) معلوم است.";
//       } else if (isNaN(x0n)) {
//         res = xn - v0n * tn - 0.5 * an * tn * tn;
//         missing = "x₀";
//         formula = "x₀ = x - v₀ t - ½ a t²";
//         explanation = "فرمول کلی بازآرایی شد.";
//       } else if (isNaN(tn)) {
//         // محاسبه t از فرمول‌های دیگر (پیچیده – از معادله درجه ۲)
//         // برای سادگی، از v استفاده می‌کنیم
//         if (an !== 0) {
//           res = (vn - v0n) / an;
//           missing = "t";
//           formula = "t = (v - v₀) / a";
//           explanation = "از فرمول سرعت برای محاسبه زمان استفاده شد.";
//         } else {
//           setResult("شتاب صفر → زمان از فرمول سرعت محاسبه می‌شود.");
//           res = (xn - x0n) / v0n;
//           formula = "t = (x - x₀) / v₀";
//           explanation = "حرکت یکنواخت – زمان از مسافت و سرعت.";
//         }
//       } else {
//         setResult("خطا");
//         return;
//       }
//     }

//     setResult(res.toFixed(3));
//     setMissingVar(missing);
//     setUsedFormula(formula);
//     setFormulaExplanation(explanation);

//     // سرعت متوسط
//     if (!isNaN(xn) && !isNaN(x0n) && !isNaN(tn) && tn !== 0) {
//       const vAvgRes = (xn - x0n) / tn;
//       setVAvg(vAvgRes.toFixed(3));
//     } else {
//       setVAvg(null);
//     }

//     setShowChart(true);
//   };

//   // داده‌های نمودارها (به‌روزرسانی‌شده با v₀ و a)
//   const timePoints = showChart && filledCount >= 4
//     ? Array.from({ length: 11 }, (_, i) => (i * Number(t || 1) / 10))
//     : [];

//   const positionData = showChart ? {
//     labels: timePoints.map(time => time.toFixed(1)),
//     datasets: [{
//       label: "مکان (m)",
//       data: timePoints.map(time => Number(x0 || 0) + Number(v0 || 0) * time + 0.5 * Number(a || 0) * time * time),
//       borderColor: "#1DCD9F",
//       backgroundColor: "rgba(29, 205, 159, 0.15)",
//       tension: 0.1,
//       fill: true,
//       pointRadius: 4,
//       pointHoverRadius: 8,
//     }]
//   } : null;

//   const velocityData = showChart ? {
//     labels: timePoints.map(time => time.toFixed(1)),
//     datasets: [{
//       label: "سرعت (m/s)",
//       data: timePoints.map(time => Number(v0 || 0) + Number(a || 0) * time),
//       borderColor: "#FFD166",
//       backgroundColor: "rgba(255, 209, 102, 0.15)",
//       tension: 0.1,
//       fill: true,
//       pointRadius: 4,
//       pointHoverRadius: 8,
//     }]
//   } : null;

//   const accelerationData = showChart ? {
//     labels: timePoints.map(time => time.toFixed(1)),
//     datasets: [{
//       label: "شتاب (m/s²)",
//       data: timePoints.map(() => Number(a || 0)),
//       borderColor: "#EF476F",
//       backgroundColor: "rgba(239, 71, 111, 0.15)",
//       tension: 0,
//       fill: true,
//       pointRadius: 4,
//       pointHoverRadius: 8,
//     }]
//   } : null;

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" as const, labels: { color: "#e0e0e0", font: { size: 13 } } },
//       title: { display: true, color: "#e0e0e0", font: { size: 15 } },
//       tooltip: { backgroundColor: "rgba(15, 23, 42, 0.9)", titleColor: "#fff", bodyColor: "#ddd" },
//     },
//     scales: {
//       x: {
//         title: { display: true, text: "زمان (s)", color: "#e0e0e0" },
//         grid: { color: "rgba(255,255,255,0.08)" },
//         ticks: { color: "#bbb" },
//       },
//       y: {
//         title: { display: true, color: "#e0e0e0" },
//         grid: { color: "rgba(255,255,255,0.08)" },
//         ticks: { color: "#bbb" },
//       },
//     },
//   };

//   // فیلدهای ورودی بر اساس mode
//   const renderInputs = () => {
//     if (selectedMode === 'velocity-time') {
//       return (
//         <>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">سرعت اولیه (v₀) [m/s]</label>
//             <input type="number" step="any" value={v0} onChange={(e) => setV0(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 5" />
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">سرعت نهایی (v) [m/s]</label>
//             <input type="number" step="any" value={v} onChange={(e) => setV(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 25" />
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">شتاب (a) [m/s²]</label>
//             <input type="number" step="any" value={a} onChange={(e) => setA(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 2" />
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">زمان (t) [s]</label>
//             <input type="number" step="any" value={t} onChange={(e) => setT(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 10" />
//           </div>
//         </>
//       );
//     } else if (selectedMode === 'no-time') {
//       return (
//         <>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">سرعت اولیه (v₀) [m/s]</label>
//             <input type="number" step="any" value={v0} onChange={(e) => setV0(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 5" />
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">سرعت نهایی (v) [m/s]</label>
//             <input type="number" step="any" value={v} onChange={(e) => setV(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 25" />
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">شتاب (a) [m/s²]</label>
//             <input type="number" step="any" value={a} onChange={(e) => setA(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 2" />
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">مکان اولیه (x₀) [m]</label>
//             <input type="number" step="any" value={x0} onChange={(e) => setX0(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 0" />
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">مکان نهایی (x) [m]</label>
//             <input type="number" step="any" value={x} onChange={(e) => setX(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 100" />
//           </div>
//         </>
//       );
//     } else if (selectedMode === 'general') {
//       // همه فیلدها
//       return (
//         <>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">مکان اولیه (x₀) [m]</label>
//             <input type="number" step="any" value={x0} onChange={(e) => setX0(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 0" />
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">مکان نهایی (x) [m]</label>
//             <input type="number" step="any" value={x} onChange={(e) => setX(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 100" />
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">سرعت اولیه (v₀) [m/s]</label>
//             <input type="number" step="any" value={v0} onChange={(e) => setV0(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 5" />
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">سرعت نهایی (v) [m/s]</label>
//             <input type="number" step="any" value={v} onChange={(e) => setV(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 25" />
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">شتاب (a) [m/s²]</label>
//             <input type="number" step="any" value={a} onChange={(e) => setA(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 2" />
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-400 font-medium">زمان (t) [s]</label>
//             <input type="number" step="any" value={t} onChange={(e) => setT(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 10" />
//           </div>
//         </>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="space-y-10">
//       {/* عنوان */}
//       <div className="text-center space-y-3">
//         <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--color-ThirdColor)] to-[var(--color-LastColor)] bg-clip-text text-transparent">
//           محاسبه‌گر حرکت با شتاب ثابت
//         </h2>
//         <p className="text-lg text-gray-300 font-mono">معادلات اصلی: v = v₀ + a t | x = x₀ + v₀ t + ½ a t² | v² = v₀² + 2 a Δx</p>
//       </div>

//       {/* بخش انتخاب نوع مسئله – قبل از فرم */}
//       {selectedMode === 'none' && (
//         <div className="bg-[var(--color-SecondColor)]/80 border border-[var(--color-ThirdColor)]/30 rounded-3xl p-8 md:p-12 text-center shadow-2xl backdrop-blur-xl">
//           <h3 className="text-2xl font-bold text-[var(--color-ThirdColor)] mb-6">
//             نوع مسئله را انتخاب کنید
//           </h3>
//           <div className="space-y-4 max-w-md mx-auto">
//             <button
//               onClick={() => setSelectedMode('velocity-time')}
//               className="w-full p-4 bg-gradient-to-r from-[var(--color-ThirdColor)]/20 to-[var(--color-LastColor)]/20 border border-[var(--color-ThirdColor)]/30 rounded-xl text-white font-medium hover:shadow-[0_0_15px_var(--color-ThirdColor)] transition-all duration-300"
//             >
//               مسئله مربوط به v, v₀, a, t (فرمول v = v₀ + a t)
//             </button>
//             <button
//               onClick={() => setSelectedMode('no-time')}
//               className="w-full p-4 bg-gradient-to-r from-[var(--color-ThirdColor)]/20 to-[var(--color-LastColor)]/20 border border-[var(--color-ThirdColor)]/30 rounded-xl text-white font-medium hover:shadow-[0_0_15px_var(--color-ThirdColor)] transition-all duration-300"
//             >
//               مسئله بدون زمان (v² = v₀² + 2 a Δx)
//             </button>
//             <button
//               onClick={() => setSelectedMode('general')}
//               className="w-full p-4 bg-gradient-to-r from-[var(--color-ThirdColor)]/20 to-[var(--color-LastColor)]/20 border border-[var(--color-ThirdColor)]/30 rounded-xl text-white font-medium hover:shadow-[0_0_15px_var(--color-ThirdColor)] transition-all duration-300"
//             >
//               مسئله کلی (x = x₀ + v₀ t + ½ a t²)
//             </button>
//           </div>
//         </div>
//       )}

//       {/* فرم ورودی‌ها – فقط بعد از انتخاب mode */}
//       {selectedMode !== 'none' && (
//         <div className="bg-[var(--color-SecondColor)]/80 border border-[var(--color-ThirdColor)]/30 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-xl">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {renderInputs()}
//           </div>

//           <div className="flex justify-center mt-10">
//             <button
//               onClick={calculate}
//               className="px-12 py-4 bg-gradient-to-r from-[var(--color-ThirdColor)] to-[var(--color-LastColor)] text-[var(--color-MainColor)] font-bold text-lg rounded-2xl shadow-xl hover:shadow-[0_0_30px_var(--color-ThirdColor)] hover:scale-105 active:scale-95 transition-all duration-300"
//             >
//               محاسبه کن
//             </button>
//           </div>

//           {result && (
//             <div className="mt-10 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl p-6 text-center space-y-4">
//               <p className="text-sm text-gray-400">متغیر محاسبه‌شده:</p>
//               <p className="text-4xl font-mono font-bold text-[var(--color-ThirdColor)]">
//                 {missingVar} = {result}
//               </p>
//               <div className="text-gray-300 space-y-2">
//                 <p className="font-medium">فرمول استفاده‌شده: <span className="text-[var(--color-ThirdColor)]">{usedFormula}</span></p>
//                 <p className="text-sm">{formulaExplanation}</p>
//               </div>
//             </div>
//           )}

//           <div className="mt-8 bg-black/60 border border-[var(--color-ThirdColor)]/20 rounded-2xl p-5 font-mono text-lg text-center text-gray-200">
//             <span className="text-[var(--color-ThirdColor)]">پیش‌نمایش فرمول:</span><br />
//             <span className="text-2xl">{preview}</span>
//           </div>
//         </div>
//       )}

//       {/* سرعت متوسط – بدون تغییر */}
//       {/* نمودارها – بدون تغییر */}

//       {/* دکمه تغییر mode – برای راحتی */}
//       {selectedMode !== 'none' && (
//         <div className="text-center">
//           <button
//             onClick={() => {
//               setSelectedMode('none');
//               // ریست همه ورودی‌ها
//               setX0(""); setX(""); setV0(""); setV(""); setA(""); setT("");
//               setResult(null); setMissingVar(""); setUsedFormula(""); setFormulaExplanation(""); setVAvg(null); setShowChart(false);
//             }}
//             className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition-colors"
//           >
//             تغییر نوع مسئله
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// components/physics12/ConstantAccelerationCalculator.tsx
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ConstantAccelerationCalculator() {
  // حالت انتخاب کاربر
  const [selectedMode, setSelectedMode] = useState<string>('none');

  // ورودی‌ها
  const [x0, setX0] = useState<string>("");
  const [x, setX] = useState<string>("");
  const [v0, setV0] = useState<string>("");
  const [v, setV] = useState<string>("");
  const [a, setA] = useState<string>("");
  const [t, setT] = useState<string>("");

  // نتایج
  const [result, setResult] = useState<string | null>(null);
  const [missingVar, setMissingVar] = useState<string>("");
  const [usedFormula, setUsedFormula] = useState<string>("");
  const [formulaExplanation, setFormulaExplanation] = useState<string>("");
  const [vAvg, setVAvg] = useState<string | null>(null);
  const [deltaX, setDeltaX] = useState<string | null>(null);  // جابه‌جایی جدید
  const [filledCount, setFilledCount] = useState<number>(0);

  const [preview, setPreview] = useState<string>("انتخاب نوع مسئله...");
  const [showChart, setShowChart] = useState<boolean>(false);

  // آپدیت تعداد پرشده‌ها و پیش‌نمایش
  useEffect(() => {
    let relevantFields = [x0, x, v0, v, a, t];
    if (selectedMode === 'velocity-time') {
      relevantFields = [v0, v, a, t];
    } else if (selectedMode === 'no-time') {
      relevantFields = [v0, v, a, x0, x];
    } else if (selectedMode === 'general') {
      relevantFields = [x0, x, v0, v, a, t];
    }
    const count = relevantFields.filter(val => val.trim() !== "").length;
    setFilledCount(count);

    // پیش‌نمایش بر اساس mode
    if (selectedMode === 'velocity-time') {
      const v0n = v0.trim() === "" ? "v₀" : v0;
      const vn = v.trim() === "" ? "v" : v;
      const an = a.trim() === "" ? "a" : a;
      const tn = t.trim() === "" ? "t" : t;
      setPreview(`${vn} = ${v0n} + ${an} × ${tn}`);
    } else if (selectedMode === 'no-time') {
      const v0n = v0.trim() === "" ? "v₀" : v0;
      const vn = v.trim() === "" ? "v" : v;
      const an = a.trim() === "" ? "a" : a;
      const deltaxn = x.trim() === "" ? "Δx" : `(x - ${x0})`;
      setPreview(`${vn}² = ${v0n}² + 2 ${an} ${deltaxn}`);
    } else if (selectedMode === 'general') {
      const x0n = x0.trim() === "" ? "x₀" : x0;
      const xn = x.trim() === "" ? "x" : x;
      const v0n = v0.trim() === "" ? "v₀" : v0;
      const an = a.trim() === "" ? "a" : a;
      const tn = t.trim() === "" ? "t" : t;
      setPreview(`${xn} = ${x0n} + ${v0n} × ${tn} + ½ ${an} × ${tn}²`);
    } else {
      setPreview("انتخاب نوع مسئله...");
    }
  }, [selectedMode, x0, x, v0, v, a, t]);

  const calculate = () => {
    const x0n = x0.trim() === "" ? NaN : Number(x0);
    const xn = x.trim() === "" ? NaN : Number(x);
    const v0n = v0.trim() === "" ? NaN : Number(v0);
    const vn = v.trim() === "" ? NaN : Number(v);
    const an = a.trim() === "" ? NaN : Number(a);
    const tn = t.trim() === "" ? NaN : Number(t);

    let relevantFilled = filledCount;

    let res: number;
    let missing = "";
    let formula = "";
    let explanation = "";

    if (selectedMode === 'none') {
      setResult("ابتدا نوع مسئله را انتخاب کنید.");
      return;
    }

    if (selectedMode === 'velocity-time') {
      if (relevantFilled !== 3) {
        setResult("دقیقاً سه مقدار از v, v₀, a, t را وارد کنید.");
        return;
      }
      if (isNaN(vn)) {
        res = v0n + an * tn;
        missing = "v";
        formula = "v = v₀ + a t";
        explanation = "فرمول سرعت بر حسب زمان انتخاب شد چون مسئله مربوط به متغیرهای v, v₀, a, t است.";
      } else if (isNaN(v0n)) {
        res = vn - an * tn;
        missing = "v₀";
        formula = "v₀ = v - a t";
        explanation = "فرمول سرعت بازآرایی شد چون v, a, t معلوم هستند.";
      } else if (isNaN(an)) {
        if ((vn - v0n) === 0) {
          res = 0;
          missing = "a";
          formula = "a = 0";
          explanation = "تغییر سرعت صفر → شتاب صفر است.";
        } else {
          res = (vn - v0n) / tn;
          missing = "a";
          formula = "a = (v - v₀) / t";
          explanation = "فرمول شتاب از سرعت بازآرایی شد.";
        }
      } else if (isNaN(tn)) {
        if (an === 0) {
          setResult("شتاب صفر → زمان از فرمول سرعت محاسبه می‌شود.");
          res = (vn - v0n) / an;
          formula = "t = (v - v₀) / a";
          explanation = "حرکت یکنواخت – زمان از مسافت و سرعت.";
        } else {
          res = (vn - v0n) / an;
          missing = "t";
          formula = "t = (v - v₀) / a";
          explanation = "فرمول زمان از سرعت بازآرایی شد.";
        }
      }
    } else if (selectedMode === 'no-time') {
      if (relevantFilled !== 4) {
        setResult("دقیقاً چهار مقدار از v, v₀, a, x₀, x را وارد کنید.");
        return;
      }
      const deltaX = !isNaN(xn) && !isNaN(x0n) ? xn - x0n : NaN;
      if (isNaN(an)) {
        if (deltaX === 0) {
          res = 0;
          missing = "a";
          formula = "a = 0";
          explanation = "جابه‌جایی صفر → شتاب نامعین.";
        } else {
          res = (vn * vn - v0n * v0n) / (2 * deltaX);
          missing = "a";
          formula = "a = (v² - v₀²) / (2 Δx)";
          explanation = "فرمول مستقل از زمان انتخاب شد چون مسئله بدون زمان است و جابه‌جایی معلوم.";
        }
      } else if (isNaN(vn)) {
        res = Math.sqrt(v0n * v0n + 2 * an * deltaX);
        missing = "v";
        formula = "v = √(v₀² + 2 a Δx)";
        explanation = "فرمول سرعت از فرمول مستقل از زمان بازآرایی شد.";
      } else if (isNaN(v0n)) {
        res = Math.sqrt(vn * vn - 2 * an * deltaX);
        missing = "v₀";
        formula = "v₀ = √(v² - 2 a Δx)";
        explanation = "فرمول سرعت اولیه از فرمول مستقل از زمان.";
      } else if (isNaN(deltaX)) {
        res = (vn * vn - v0n * v0n) / (2 * an);
        missing = "Δx";
        formula = "Δx = (v² - v₀²) / (2 a)";
        explanation = "جابه‌جایی از فرمول مستقل از زمان محاسبه شد.";
      }
    } else if (selectedMode === 'general') {
      if (relevantFilled !== 5) {
        setResult("دقیقاً پنج مقدار از x₀, x, v₀, v, a, t را وارد کنید.");
        return;
      }
      if (tn === 0) {
        setResult("زمان نمی‌تواند صفر باشد.");
        return;
      }
      if (isNaN(xn)) {
        res = x0n + v0n * tn + 0.5 * an * tn * tn;
        missing = "x";
        formula = "x = x₀ + v₀ t + ½ a t²";
        explanation = "فرمول کلی موقعیت انتخاب شد چون زمان (t) معلوم است.";
        // محاسبه Δx
        setDeltaX((res - x0n).toFixed(3));
      } else if (isNaN(x0n)) {
        res = xn - v0n * tn - 0.5 * an * tn * tn;
        missing = "x₀";
        formula = "x₀ = x - v₀ t - ½ a t²";
        explanation = "فرمول کلی بازآرایی شد.";
        // محاسبه Δx
        setDeltaX((xn - res).toFixed(3));
      } else if (isNaN(tn)) {
        if (an !== 0) {
          res = (vn - v0n) / an;
          missing = "t";
          formula = "t = (v - v₀) / a";
          explanation = "از فرمول سرعت برای محاسبه زمان استفاده شد.";
        } else {
          res = (xn - x0n) / v0n;
          missing = "t";
          formula = "t = (x - x₀) / v₀";
          explanation = "حرکت یکنواخت – زمان از مسافت و سرعت.";
        }
        setDeltaX((xn - x0n).toFixed(3));
      } else {
        setResult("خطا");
        return;
      }
    }

    setResult(res.toFixed(3));
    setMissingVar(missing);
    setUsedFormula(formula);
    setFormulaExplanation(explanation);

    // سرعت متوسط
    if (!isNaN(xn) && !isNaN(x0n) && !isNaN(tn) && tn !== 0) {
      const vAvgRes = (xn - x0n) / tn;
      setVAvg(vAvgRes.toFixed(3));
    } else {
      setVAvg(null);
    }

    setShowChart(true);
  };

  // داده‌های نمودارها – در همه modeها نمایش داده می‌شن
  const timePoints = showChart && !isNaN(Number(t))
    ? Array.from({ length: 11 }, (_, i) => (i * Number(t) / 10))
    : [];

  const positionData = showChart ? {
    labels: timePoints.map(time => time.toFixed(1)),
    datasets: [{
      label: "مکان (m)",
      data: timePoints.map(time => Number(x0 || 0) + Number(v0 || 0) * time + 0.5 * Number(a || 0) * time * time),
      borderColor: "#1DCD9F",
      backgroundColor: "rgba(29, 205, 159, 0.15)",
      tension: 0.1,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 8,
    }]
  } : null;

  const velocityData = showChart ? {
    labels: timePoints.map(time => time.toFixed(1)),
    datasets: [{
      label: "سرعت (m/s)",
      data: timePoints.map(time => Number(v0 || 0) + Number(a || 0) * time),
      borderColor: "#FFD166",
      backgroundColor: "rgba(255, 209, 102, 0.15)",
      tension: 0.1,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 8,
    }]
  } : null;

  const accelerationData = showChart ? {
    labels: timePoints.map(time => time.toFixed(1)),
    datasets: [{
      label: "شتاب (m/s²)",
      data: timePoints.map(() => Number(a || 0)),
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

  // رندر فیلدهای ورودی بر اساس mode
  const renderInputs = () => {
    if (selectedMode === 'velocity-time') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">سرعت اولیه (v₀) [m/s]</label>
            <input type="number" step="any" value={v0} onChange={(e) => setV0(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 5" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">سرعت نهایی (v) [m/s]</label>
            <input type="number" step="any" value={v} onChange={(e) => setV(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 25" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">شتاب (a) [m/s²]</label>
            <input type="number" step="any" value={a} onChange={(e) => setA(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 2" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">زمان (t) [s]</label>
            <input type="number" step="any" value={t} onChange={(e) => setT(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 10" />
          </div>
        </div>
      );
    } else if (selectedMode === 'no-time') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">سرعت اولیه (v₀) [m/s]</label>
            <input type="number" step="any" value={v0} onChange={(e) => setV0(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 5" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">سرعت نهایی (v) [m/s]</label>
            <input type="number" step="any" value={v} onChange={(e) => setV(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 25" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">شتاب (a) [m/s²]</label>
            <input type="number" step="any" value={a} onChange={(e) => setA(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 2" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">مکان اولیه (x₀) [m]</label>
            <input type="number" step="any" value={x0} onChange={(e) => setX0(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 0" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm text-gray-400 font-medium">مکان نهایی (x) [m]</label>
            <input type="number" step="any" value={x} onChange={(e) => setX(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 100" />
          </div>
        </div>
      );
    } else if (selectedMode === 'general') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">مکان اولیه (x₀) [m]</label>
            <input type="number" step="any" value={x0} onChange={(e) => setX0(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 0" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">مکان نهایی (x) [m]</label>
            <input type="number" step="any" value={x} onChange={(e) => setX(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 100" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">سرعت اولیه (v₀) [m/s]</label>
            <input type="number" step="any" value={v0} onChange={(e) => setV0(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 5" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">سرعت نهایی (v) [m/s]</label>
            <input type="number" step="any" value={v} onChange={(e) => setV(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 25" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-400 font-medium">شتاب (a) [m/s²]</label>
            <input type="number" step="any" value={a} onChange={(e) => setA(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 2" />
          </div>
          <div className="space-y-2 lg:col-span-3">
            <label className="block text-sm text-gray-400 font-medium">زمان (t) [s]</label>
            <input type="number" step="any" value={t} onChange={(e) => setT(e.target.value)} className="w-full px-5 py-4 bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl text-white text-lg focus:border-[var(--color-ThirdColor)] transition-all" placeholder="مثال: 10" />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-10">

      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--color-ThirdColor)] to-[var(--color-LastColor)] bg-clip-text text-transparent">
          محاسبه‌گر حرکت با شتاب ثابت
        </h2>
        <p className="text-lg text-gray-300 font-mono">
          معادلات اصلی: v = v₀ + a t | x = x₀ + v₀ t + ½ a t² | v² = v₀² + 2 a Δx
        </p>
      </div>

      {selectedMode === 'none' && (
        <div className="bg-[var(--color-SecondColor)]/80 border border-[var(--color-ThirdColor)]/30 rounded-3xl p-8 md:p-12 text-center shadow-2xl backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-[var(--color-ThirdColor)] mb-6">
            نوع مسئله را انتخاب کنید
          </h3>
          <div className="space-y-4 max-w-md mx-auto">
            <button onClick={() => setSelectedMode('velocity-time')} className="w-full p-4 bg-gradient-to-r from-[var(--color-ThirdColor)]/20 to-[var(--color-LastColor)]/20 border border-[var(--color-ThirdColor)]/30 rounded-xl text-white font-medium hover:shadow-[0_0_15px_var(--color-ThirdColor)] transition-all duration-300">
              مسئله مربوط به v, v₀, a, t
            </button>
            <button onClick={() => setSelectedMode('no-time')} className="w-full p-4 bg-gradient-to-r from-[var(--color-ThirdColor)]/20 to-[var(--color-LastColor)]/20 border border-[var(--color-ThirdColor)]/30 rounded-xl text-white font-medium hover:shadow-[0_0_15px_var(--color-ThirdColor)] transition-all duration-300">
              مسئله بدون زمان
            </button>
            <button onClick={() => setSelectedMode('general')} className="w-full p-4 bg-gradient-to-r from-[var(--color-ThirdColor)]/20 to-[var(--color-LastColor)]/20 border border-[var(--color-ThirdColor)]/30 rounded-xl text-white font-medium hover:shadow-[0_0_15px_var(--color-ThirdColor)] transition-all duration-300">
              مسئله کلی
            </button>
          </div>
        </div>
      )}

      {selectedMode !== 'none' && (
        <div className="bg-[var(--color-SecondColor)]/80 border border-[var(--color-ThirdColor)]/30 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-xl space-y-8">

          {renderInputs()}

          <div className="flex justify-center">
            <button
              onClick={calculate}
              className="px-12 py-4 bg-gradient-to-r from-[var(--color-ThirdColor)] to-[var(--color-LastColor)] text-[var(--color-MainColor)] font-bold text-lg rounded-2xl shadow-xl hover:shadow-[0_0_30px_var(--color-ThirdColor)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              محاسبه کن
            </button>
          </div>

          {result && (
            <div className="bg-black/40 border border-[var(--color-ThirdColor)]/30 rounded-2xl p-6 text-center space-y-4">
              <p className="text-sm text-gray-400">متغیر محاسبه‌شده:</p>
              <p className="text-4xl font-mono font-bold text-[var(--color-ThirdColor)]">
                {missingVar} = {result}
              </p>
              <div className="text-gray-300 space-y-2">
                <p className="font-medium">
                  فرمول استفاده‌شده:
                  <span className="text-[var(--color-ThirdColor)]"> {usedFormula}</span>
                </p>
                <p className="text-sm">{formulaExplanation}</p>
              </div>
            </div>
          )}

          {vAvg && (
            <div className="bg-black/40 border border-[var(--color-ThirdColor)]/20 rounded-2xl p-4 text-center text-gray-200 font-mono">
              سرعت متوسط: <span className="text-[var(--color-ThirdColor)]">{vAvg}</span>
            </div>
          )}

          {deltaX && (
            <div className="bg-black/40 border border-[var(--color-ThirdColor)]/20 rounded-2xl p-4 text-center text-gray-200 font-mono">
              جابه‌جایی (Δx): <span className="text-[var(--color-ThirdColor)]">{deltaX}</span>
            </div>
          )}

          {showChart && positionData && (
            <div className="space-y-8">
              <div className="h-80"><Line data={positionData} options={chartOptions} /></div>
              <div className="h-80"><Line data={velocityData!} options={chartOptions} /></div>
              <div className="h-80"><Line data={accelerationData!} options={chartOptions} /></div>
            </div>
          )}

          <div className="bg-black/60 border border-[var(--color-ThirdColor)]/20 rounded-2xl p-5 font-mono text-lg text-center text-gray-200">
            <span className="text-[var(--color-ThirdColor)]">پیش‌نمایش فرمول:</span><br />
            <span className="text-2xl">{preview}</span>
          </div>
        </div>
      )}

      {selectedMode !== 'none' && (
        <div className="text-center">
          <button
            onClick={() => {
              setSelectedMode('none');
              setX0(""); setX(""); setV0(""); setV(""); setA(""); setT("");
              setResult(null); setMissingVar(""); setUsedFormula(""); setFormulaExplanation(""); setVAvg(null); setDeltaX(null); setShowChart(false);
            }}
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition-colors"
          >
            تغییر نوع مسئله
          </button>
        </div>
      )}
    </div>
  );
}