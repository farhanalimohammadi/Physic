// app/physic12/[chapterId]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface ChapterPageProps {
  params: Promise<{ chapterId: string }>;
}

// metadata داینامیک برای SEO – هر فصل عنوان و توضیح جداگانه
export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const chapterId = resolvedParams.chapterId;

  const validChapters = ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-4', 'chapter-5', 'chapter-6'];
  if (!validChapters.includes(chapterId)) {
    return { title: 'صفحه یافت نشد' };
  }

  const chapterTitles = {
    'chapter-1': 'حرکت بر خط راست',
    'chapter-2': 'دینامیک و حرکت دایره‌ای',
    'chapter-3': 'نوسان و موج',
    'chapter-4': 'برهم‌کنش‌های موج',
    'chapter-5': 'آشنایی با فیزیک اتمی',
    'chapter-6': 'آشنایی با فیزیک هسته‌ای',
  };

  const title = chapterTitles[chapterId as keyof typeof chapterTitles] || 'فصل ناشناخته';
  return {
    title: `${title} – محاسبه‌گر آموزشی فیزیک دوازدهم | گام‌به‌گام برای دانش‌آموزان`,
    description: `محاسبه‌گر تعاملی و توضیحات آموزشی فصل ${title} فیزیک دوازدهم ریاضی – فرمول‌های کلیدی با حل گام‌به‌گام، مناسب جشنواره ریاضی-فیزیک و یادگیری دانش‌آموزی. وارد کن و محاسبه کن!`,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const resolvedParams = await params;
  const chapterId = resolvedParams.chapterId;

  const validChapters = ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-4', 'chapter-5', 'chapter-6'];

  if (!validChapters.includes(chapterId)) {
    notFound();
  }

  const chapterNumber = parseInt(chapterId.replace('chapter-', ''), 10);
const chapterTitles: Record<number, string> = {
  1: 'فیزیک پایه',
  2: 'مکانیک',
  3: 'الکتریسیته',
  4: 'مغناطیس',
  5: 'ترمودینامیک',
  6: 'آشنایی با فیزیک هسته‌ای',
};

const chapterTitle = chapterTitles[chapterNumber] || 'فصل ناشناخته';

  // توضیحات تکمیلی هر فصل – آموزشی و گام‌به‌گام، با تمرکز روی محاسبه‌گر
  const chapterDescriptions = {
    1: 'فصل اول فیزیک دوازدهم ریاضی: حرکت بر خط راست. در این فصل با مفاهیم پایه‌ای حرکت یک‌بعدی آشنا می‌شیم – از موقعیت، سرعت و شتاب گرفته تا معادلات حرکت. محاسبه‌گرها بهت کمک می‌کنن تا مسافت، زمان و سرعت رو سریع حل کنی و بفهمی چطور اشیا در خط راست حرکت می‌کنن. ایده‌آل برای درک پایه‌ای کینماتیک و تمرین‌های جشنواره!',
    2: 'فصل دوم: دینامیک و حرکت دایره‌ای. اینجا نیروها وارد بازی می‌شن! قانون نیوتن، نیروی گریز از مرکز و حرکت دایره‌ای رو یاد می‌گیریم. با ابزارهای تعاملی، نیرو، جرم و شعاع رو وارد کن و ببین چطور سرعت زاویه‌ای محاسبه می‌شه – گام‌به‌گام برای حل مسائل پیچیده‌تر.',
    3: 'فصل سوم: نوسان و موج. دنیای ارتعاشات: پاندول، فنر و امواج مکانیکی. محاسبه‌گرها نشون می‌دن چطور فرکانس و دامنه رو حساب کنی – برای درک چگونگی انتقال انرژی در نوسانات و موج‌ها.',
    4: 'فصل چهارم: برهم‌کنش‌های موج. تداخل، شکست و دوپلر: چطور موج‌ها با هم تعامل دارن؟ ابزارها بهت کمک می‌کنن سرعت موج و طول موج رو محاسبه کنی – آموزشی برای مسائل واقعی مثل صدا و نور.',
    5: 'فصل پنجم: آشنایی با فیزیک اتمی. مدل‌های اتمی، طیف‌ها و فوتوالکتریک: سفر به دنیای کوانتومی. محاسبه‌گرها انرژی فوتون و سطوح اتمی رو حل می‌کنن – برای علاقه‌مندان به فیزیک مدرن.',
    6: 'فصل ششم: آشنایی با فیزیک هسته‌ای. واپاشی، نیمه‌عمر و انرژی بستگی: هسته اتم رو کاوش کن. ابزارها نرخ واپاشی رو پیش‌بینی می‌کنن – توضیحات ایمن و علمی برای انرژی اتمی.',
  };

  // محتوای خاص فصل اول (فعلاً فقط این – بعداً فصل‌های دیگه اضافه می‌شه)
  const chapter1Sections = [
    {
      title: 'حرکت با سرعت ثابت',
      description: 'در این بخش، حرکت یکنواخت رو بررسی می‌کنیم – جایی که سرعت ثابت می‌مونه و شتاب صفره. محاسبه‌گرها بهت کمک می‌کنن مسافت طی‌شده رو بر اساس زمان و سرعت محاسبه کنی.',
      formulas: [
        'x = x₀ + v × t (موقعیت)',
        'v = Δx / Δt (سرعت متوسط)',
        's = v × t (مسافت)',
      ],
    },
    {
      title: 'حرکت با شتاب ثابت',
      description: 'حرکت شتاب‌دار: شتاب ثابت و تغییرات سرعت. با ابزار تعاملی، سرعت نهایی، مسافت و زمان رو وارد کن و ببین چطور معادلات کار می‌کنن – گام‌به‌گام برای حل مسائل.',
      formulas: [
        'v = v₀ + a × t (سرعت نهایی)',
        'x = x₀ + v₀ × t + ½ a × t² (موقعیت)',
        'v² = v₀² + 2a × Δx (سرعت بدون زمان)',
      ],
    },
    {
      title: 'سقوط آزاد',
      description: 'نوع خاصی از حرکت شتاب‌دار: سقوط تحت جاذبه (g ≈ ۹.۸ m/s²). محاسبه‌گرها ارتفاع، سرعت و زمان سقوط رو حل می‌کنن – آموزشی برای درک شتاب گرانشی.',
      formulas: [
        'v = g × t (سرعت)',
        'h = ½ g × t² (ارتفاع)',
        'v² = 2 g h (سرعت نهایی)',
      ],
    },
  ];

  return (
    <div className="min-h-screen space-y-10">
      {/* هدر فصل – با عنوان و توضیح کلی */}
      <header className="text-center space-y-6">
        <h1 className="text-[var(--text-textSize-logoBig)] md:text-[var(--text-textSize-logoBig)] font-bold bg-gradient-to-r from-[var(--color-ThirdColor)] to-[var(--color-LastColor)] bg-clip-text text-transparent">
          فصل {chapterNumber}: {chapterTitle}
        </h1>
        <p className="max-w-3xl mx-auto text-[var(--text-textSize-second)] text-gray-300 leading-relaxed">
          {chapterDescriptions[chapterNumber]}
        </p>
      </header>


      


{chapterNumber === 1 && (
  <section className="space-y-8">
    <h2 className="text-[var(--text-textSize-first)] font-bold text-center text-[var(--color-ThirdColor)]">
      بخش‌های کلیدی فصل ۱: حرکت بر خط راست
    </h2>
    <div className="
      grid grid-cols-1 moblet-size:grid-cols-2 laptop-size:grid-cols-3 
      gap-6 max-[500px]:gap-4 max-[320px]:gap-3
    ">
      {chapter1Sections.map((section, index) => (
        <div
          key={index}
          className="
            relative bg-[var(--color-SecondColor)]/80 hover:bg-[var(--color-SecondColor)] 
            border border-[var(--color-ThirdColor)]/20 hover:border-[var(--color-ThirdColor)]/50 
            rounded-2xl p-6 tablet-size:p-8 transition-all duration-500 flex flex-col h-full 
            shadow-xl hover:shadow-[var(--color-ThirdColor)]/20 hover:-translate-y-1 overflow-hidden
            group
          "
        >

          <div className="
            absolute inset-0 bg-gradient-to-br from-[var(--color-ThirdColor)]/5 to-[var(--color-LastColor)]/5 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500
          " />

          <div className="relative z-10 flex flex-col space-y-4 flex-grow">
            <h3 className="
              text-xl tablet-size:text-2xl font-bold text-white 
              group-hover:text-[var(--color-ThirdColor)] transition-colors
            ">
              {section.title}
            </h3>
            <p className="text-[var(--text-textSize-second)] text-gray-300 leading-relaxed flex-grow">
              {section.description}
            </p>

            {/* لیست فرمول‌ها */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-[var(--color-ThirdColor)]">فرمول‌های کلیدی:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-200">
                {section.formulas.map((formula, fIndex) => (
                  <li key={fIndex}>{formula}</li>
                ))}
              </ul>
            </div>


            <div className="mt-auto pt-4">
              <Link
                href={`/physic12/chapter-${chapterNumber}/formula-${index + 1}`}
                className="
                  inline-flex items-center justify-center w-full 
                  px-6 py-3 mt-2 rounded-xl font-medium text-base
                  bg-gradient-to-r from-[var(--color-ThirdColor)] to-[var(--color-LastColor)]
                  text-[var(--color-MainColor)] shadow-md
                  hover:shadow-[0_0_20px_var(--color-ThirdColor)] hover:scale-[1.03]
                  active:scale-[0.98] transition-all duration-300
                "
              >
                محاسبه‌گر این بخش →
              </Link>
            </div>


            <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-ThirdColor)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity mt-4" />
          </div>
        </div>
      ))}
    </div>
  </section>
)}


      {/* باکس اطلاعات بیشتر – لینک جدید */}
      {chapterNumber === 1 && (
        <div className="
          w-full flex justify-center items-center p-6 tablet-size:p-8 rounded-[8px] 
          bg-[var(--color-SecondColor)]/80 border border-[var(--color-ThirdColor)]/20 
          hover:border-[var(--color-ThirdColor)]/50 transition-all duration-500
        ">
          <div className="
            w-full py-6 flex flex-col justify-center items-center rounded-[8px] gap-y-4 
            text-center max-w-lg mx-auto
          ">
            <h4 className="text-[var(--text-textSize-first)] font-bold text-[var(--color-ThirdColor)]">
              اطلاعات بیشتر و راهنمای استفاده
            </h4>
            <p className="text-[var(--text-textSize-second)] text-gray-300 leading-relaxed">
              اگر می‌خوای اطلاعات کاملی از فصل «حرکت بر خط راست» داشته باشی،  
              نحوه کار با محاسبه‌گرها رو یاد بگیری و نکات آموزشی بیشتری ببینی، اینجا کلیک کن.
            </p>
            <Link
              href={`/physic12/chapter-${chapterNumber}/information`}
              className="
                inline-flex items-center px-7 py-3.5 mt-2 
                bg-gradient-to-r from-[var(--color-ThirdColor)]/90 to-[var(--color-LastColor)]/90
                hover:from-[var(--color-ThirdColor)] hover:to-[var(--color-LastColor)]
                text-[var(--color-MainColor)] font-bold text-base rounded-xl
                shadow-lg hover:shadow-[0_0_25px_var(--color-ThirdColor)/60]
                transition-all duration-300 hover:scale-105 active:scale-98
              "
            >
              مشاهده راهنما و نکات آموزشی →
            </Link>
          </div>
        </div>
      )}

      <div className="pt-6 text-center">
        <Link 
          href="/physic12" 
          className="text-[var(--color-ThirdColor)] hover:text-[var(--color-LastColor)] font-medium text-[var(--text-textSize-second)]"
        >
          ← بازگشت به لیست فصل‌ها
        </Link>
      </div>
    </div>
  );
}