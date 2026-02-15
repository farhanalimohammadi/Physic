// app/physic12/layout.tsx
import type { ReactNode, Metadata } from 'react';
import PhysicCompon from "@/components/layout/home-page/first-component"; // فرض: هدرت اینجاست

export const metadata: Metadata = {
  title: 'فیزیک دوازدهم – محاسبه‌گر آموزشی | جشنواره ریاضی-فیزیک',
  description: 'محاسبه‌گر تعاملی فرمول‌های ولتاژ، جریان الکتریکی و مقاومت برای دانش‌آموزان فیزیک ۱۲ تجربی/ریاضی – گام‌به‌گام و آموزشی.',
};

export default function Physic12Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
      <div className="bg-MainColor text-white antialiased min-h-screen">
        <main className=" flex flex-col jsutify-start items-center gap-y-4 px-4 py-8 tablet-size:px-8 laptop-size:px-12">
          {/* <PhysicCompon /> */}
          {children}
        </main>
        <footer className="mt-16 py-8 text-center text-slate-500 border-t border-slate-800">
          <p>مدرسه علامه حلی پایه دوازدهم رشته ریاضی ، همایش ریاضی شهرستان سلطانیه.</p>
        </footer>
      </div>

  );
}