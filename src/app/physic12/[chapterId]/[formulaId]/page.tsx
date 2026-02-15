// app/physic12/[chapterId]/[formulaId]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import VelocityConstantCalculator from './_formule-1';
import ConstantAccelerationCalculator from './_formule-2';
import Link from 'next/link';

interface FormulaPageProps {
  params: Promise<{ chapterId: string; formulaId: string }>;
}

export async function generateMetadata({ params }: FormulaPageProps): Promise<Metadata> {
  const { chapterId, formulaId } = await params;

  // فقط برای فصل ۱ و فرمول‌های ۱ و ۲ فعلاً
  if (chapterId !== 'chapter-1' || !['formula-1', 'formula-2'].includes(formulaId)) {
    return { title: 'صفحه یافت نشد' };
  }

  const titles = {
    'formula-1': 'حرکت با سرعت ثابت',
    'formula-2': 'حرکت با شتاب ثابت',
  };

  return {
    title: `محاسبه‌گر ${titles[formulaId as keyof typeof titles]} – فصل ۱ فیزیک دوازدهم`,
    description: `ابزار تعاملی و آموزشی حل فرمول‌های ${titles[formulaId as keyof typeof titles]} برای دانش‌آموزان فیزیک ۱۲ ریاضی – با نمودارها و توضیح گام‌به‌گام`,
  };
}

export default async function FormulaPage({ params }: FormulaPageProps) {
  const { chapterId, formulaId } = await params;

  // اعتبارسنجی مسیر
  if (chapterId !== 'chapter-1' || !['formula-1', 'formula-2'].includes(formulaId)) {
    notFound();
  }

  const chapterNum = chapterId.replace('chapter-', '');
  const formulaNum = formulaId.replace('formula-', '');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-MainColor)] via-[var(--color-SecondColor)] to-[var(--color-LastColor)]/5 py-8 px-4 moblet-size:px-6 tablet-size:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* عنوان مشترک صفحه */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl tablet-size:text-4xl font-bold bg-gradient-to-r from-[var(--color-ThirdColor)] to-[var(--color-LastColor)] bg-clip-text text-transparent">
            فرمول {formulaNum} – فصل {chapterNum}
          </h1>
          <p className="text-lg text-gray-300">
            ابزار تعاملی حل فرمول‌های فیزیک دوازدهم – با نمودارها و توضیح آموزشی
          </p>
        </div>

        {/* نمایش کامپوننت درست بر اساس formulaId */}
        {formulaId === 'formula-1' && <VelocityConstantCalculator />}
        {formulaId === 'formula-2' && <ConstantAccelerationCalculator />}

        {/* لینک‌های بازگشت */}
        <div className="flex flex-wrap justify-center gap-6 pt-8">
          <Link
            href={`/physic12/chapter-${chapterNum}`}
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white transition-colors"
          >
            ← بازگشت به صفحه فصل
          </Link>
          <Link
            href="/physic12"
            className="px-8 py-3 bg-[var(--color-ThirdColor)] hover:bg-[var(--color-LastColor)] text-black font-medium rounded-xl transition-colors"
          >
            بازگشت به لیست فصل‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}