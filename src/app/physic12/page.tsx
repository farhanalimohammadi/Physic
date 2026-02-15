// app/physic12/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';
import PhysicCompon from '@/components/layout/home-page/first-component'; // کامپوننت موجود رو نگه داشتم

export const metadata: Metadata = {
  title: 'فصل‌های فیزیک دوازدهم – محاسبه‌گر تعاملی و آموزشی',
  description: 'راهنمای کامل فصل‌های فیزیک دوازدهم با توضیحات آموزشی و محاسبه‌گرهای گام‌به‌گام برای دانش‌آموزان – مناسب جشنواره ریاضی-فیزیک.',
};

interface Chapter {
  id: number;
  title: string;
  slug: string;
  description: string; // توضیح کوتاه آموزشی برای هر فصل
}

export default function Physic12MainPage() {
  const chapters: Chapter[] = [
    {
      id: 1,
      title: 'حرکت بر خط راست ',
      slug: 'chapter-1',
      description: 'در این فصل با مفاهیم پایه الکتریسیته آشنا می‌شیم: از قانون کولن و میدان الکتریکی گرفته تا پتانسیل الکتریکی، خازن‌ها و انرژی پتانسیل. محاسبه‌گرها بهت کمک می‌کنن تا نیروها و بارها رو سریع حل کنی و بفهمی چطور انرژی در مدارها ذخیره می‌شه – ایده‌آل برای درک پایه‌ای الکتریسیته!'
    },
    {
      id: 2,
      title: 'دینامیک و حرکت دایره ای ',
      slug: 'chapter-2',
      description: 'فصل کلیدی برای مدارها! قانون اهم، مقاومت‌های سری و موازی، توان و انرژی الکتریکی رو یاد می‌گیریم. با محاسبه‌گرهای تعاملی، ولتاژ، جریان و مقاومت رو وارد کن و ببین چطور مدارها کار می‌کنن – توضیح گام‌به‌گام برای حل مسائل مدارهای ساده و پیچیده.'
    },
    {
      id: 3,
      title: 'نوسان و موج',
      slug: 'chapter-3',
      description: 'دنیای مغناطیس: از میدان مغناطیسی و نیروی لورنتس تا قانون فارادی و القای الکترومغناطیسی. محاسبه‌گرها بهت نشون می‌دن چطور جریان در سیم‌پیچ‌ها القا می‌شه و ژنراتورها کار می‌کنن – برای درک چگونگی تبدیل انرژی مکانیکی به الکتریکی.'
    },
    {
      id: 4,
      title: 'برهم کنش های موج ',
      slug: 'chapter-4',
      description: 'جریان AC: سینوسی، خازن و سلف در مدارهای AC، توان ظاهری و واقعی. با ابزارهای آموزشی، فرکانس و امپدانس رو محاسبه کن و بفهم چطور مدارهای متناوب در زندگی روزمره (مثل برق خونه) کار می‌کنن – گام‌به‌گام برای مسائل پیچیده‌تر.'
    },
    {
      id: 5,
      title: 'آشنایی با فیزیک اتمی ',
      slug: 'chapter-5',
      description: 'سفر به دنیای اتم‌ها: مدل‌های اتمی، طیف‌های خطی، اثر فوتوالکتریک و لیزر. محاسبه‌گرها بهت کمک می‌کنن انرژی سطوح اتمی رو حساب کنی و بفهمی چطور نور و ماده با هم تعامل دارن – برای علاقه‌مندان به فیزیک مدرن و کوانتومی.'
    },
    {
      id: 6,
      title: 'آشنایی با فیزیک هسته ای ',
      slug: 'chapter-6',
      description: 'هسته اتم: واپاشی، نیمه‌عمر، انرژی بستگی و واکنش‌های هسته‌ای. با محاسبه‌گرهای ساده، نرخ واپاشی رو پیش‌بینی کن و بفهم چطور انرژی هسته‌ای تولید می‌شه – توضیحات آموزشی برای درک ایمن و علمی انرژی اتمی.'
    },
  ];

  return (
    <div className="min-h-screen">
      <PhysicCompon/>
      <main className=" mx-auto px-4 py-12 tablet-size:px-8 laptop-size:px-12 space-y-16">
        
        {/* هدر معرفی: ساده و آموزشی */}
        <header className="text-center space-y-6">
          <h1 className="text-[var(--text-textSize-logoBig)] tablet-size:text-[var(--text-textSize-logoBig)] font-bold bg-gradient-to-r from-[var(--color-ThirdColor)] to-[var(--color-LastColor)] bg-clip-text text-transparent">
            فیزیک دوازدهم – راهنمای آموزشی و محاسبه‌گر تعاملی
          </h1>
          <p className=" mx-auto text-[var(--text-textSize-second)] text-gray-300 leading-relaxed">
            هر فصل با توضیحات ساده و محاسبه‌گرهای گام‌به‌گام برای حل فرمول‌ها – مناسب دانش‌آموزان جشنواره ریاضی-فیزیک. فرمول‌ها رو وارد کن، نتیجه رو ببین و یاد بگیر چطور به جواب رسیدی!
          </p>
        </header>

        
        <section className="space-y-8">
          
          <h2 className="text-[var(--text-textSize-first)] font-bold text-center text-[var(--color-ThirdColor)]">
            فصل‌های فیزیک دوازدهم
          </h2>
          <div className="grid grid-cols-1 moblet-size:grid-cols-2 laptop-size:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/physic12/${chapter.slug}`}
                className="group relative bg-[var(--color-SecondColor)]/80 hover:bg-[var(--color-SecondColor)] border border-[var(--color-ThirdColor)]/20 hover:border-[var(--color-ThirdColor)]/50 rounded-2xl p-6 tablet-size:p-8 transition-all duration-500 flex flex-col h-full shadow-xl hover:shadow-[var(--color-ThirdColor)]/20 hover:-translate-y-1 overflow-hidden"
              >

                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ThirdColor)]/5 to-[var(--color-LastColor)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* محتوای کارت */}
                <div className="relative z-10 flex flex-col space-y-4 flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl tablet-size:text-2xl font-bold text-white group-hover:text-[var(--color-ThirdColor)] transition-colors">
                      فصل {chapter.id}: {chapter.title}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 bg-[var(--color-ThirdColor)]/10 text-[var(--color-ThirdColor)] text-textSize-third font-medium rounded-full">
                      ورود →
                    </span>
                  </div>
                  
                  <p className="text-[var(--text-textSize-second)] text-gray-300 leading-relaxed flex-grow">
                    {chapter.description}
                  </p>
                  
                  {/* خط پایانی درخشان */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-ThirdColor)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity mt-auto" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* فوتر آموزشی ساده */}
        <footer className="text-center py-8 text-[var(--text-textSize-third)] text-gray-500 border-t border-[var(--color-ThirdColor)]/10">
          <p>ساخته‌شده برای جشنواره بین‌مدرسه‌ای ریاضی-فیزیک دوازدهم – یادگیری آسان با محاسبه‌گرهای تعاملی</p>
        </footer>
      </main>
    </div>
  );
}