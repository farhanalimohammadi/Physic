"use client"
import Link from "next/link"
import Image from "next/image"
import img from "../../img/img1.png"

export default function AboutCompon() {
    const info = [
        { name1: "همایش ریاضی شهرستان سلطانیه", title1: "جشنواره", name2: "نرم افزار", title2: "بخش مربوطه" },
        { name1: "فیزیک رو راحت ببین", title1: "نام پروژه", name2: "فرحان علیمحمدی", title2: "نام طراح" },
        { name1: "دوازدهم", title1: "پایه تحصیلی", name2: "ریاضی فیزیک", title2: "رشته" },
        { name1: "علامه حلی سلطانیه", title1: "مدرسه", name2: "دکتر سید امیر طاهری", title2: "معلم مربوطه" },
    ]

    return (
        <div className="
            relative w-full mx-auto overflow-hidden rounded-2xl 
            bg-[#0f172a] group transition-all duration-500 
            hover:shadow-[0px_0px_30px_rgba(22,153,118,0.4)] 
            border border-white/10
        ">
            
            {/* تصویر پس‌زمینه – در موبایل کامل‌تر و محو شده‌تر */}
            <div className="
                absolute inset-0 transition-all duration-700 ease-in-out 
                opacity-40 group-hover:opacity-70
                [--mobile-opacity:0.25] [--tablet-opacity:0.45]
                max-[600px]:opacity-[var(--mobile-opacity)] 
                max-[600px]:group-hover:opacity-60
                min-[601px]:opacity-60 min-[601px]:group-hover:opacity-100
            ">
                <Image
                    src={img}
                    alt="Project Preview"
                    fill
                    className="object-cover"
                />

                <div className="
                    absolute inset-0 
                    bg-gradient-to-b from-[#0f172a]/40 via-[#0f172a]/70 to-[#0f172a] 
                    max-[600px]:from-[#0f172a]/60 max-[600px]:via-[#0f172a]/85
                " />
            </div>


            <div className="
                relative z-10 flex flex-col lg:flex-row items-center justify-between 
                p-6 sm:p-8 md:p-10 lg:p-8 min-h-[340px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[400px]
            ">
                

                <div className="
                    w-full lg:w-1/3 space-y-4 lg:pr-6 xl:pr-8 
                    text-center lg:text-right mb-8 lg:mb-0 
                    transition-all duration-500 group-hover:scale-105
                ">
                    <h3 className="
                        text-white text-xl sm:text-2xl md:text-[1.75rem] lg:text-2xl 
                        font-bold leading-tight
                    ">
                        جزئیات خلاقانه
                    </h3>
                    <p className="
                        text-gray-400 text-xs sm:text-sm md:text-base 
                        leading-relaxed max-w-md mx-auto lg:mx-0
                    ">
                        برای مشاهده اطلاعات کامل پروژه و رزومه طراح، روی بخش جزئیات کلیک کنید.
                    </p>
                    <button className="
                        mt-3 px-5 sm:px-6 py-2.5 sm:py-3 
                        rounded-full bg-SecondColor text-white 
                        text-xs sm:text-sm font-semibold 
                        hover:bg-opacity-80 transition-all border border-white/20 cursor-pointer
                        mx-auto lg:mx-0 block lg:inline-block
                    ">
                        اطلاعات بیشتر
                    </button>
                </div>

                {/* باکس اطلاعات – عرض fluid می‌شود */}
                <div className="
                    w-full lg:w-[550px] max-w-2xl lg:max-w-none 
                    backdrop-blur-xl bg-white/5 border border-white/10 
                    rounded-3xl p-5 sm:p-6 md:p-7 lg:p-6 
                    shadow-2xl transition-all duration-500 group-hover:bg-white/10
                ">
                    <div className="space-y-1 sm:space-y-2">
                        {info.map((boxInfo, index) => (
                            <div 
                                key={index} 
                                className="
                                    flex flex-col sm:flex-row justify-between items-start sm:items-center 
                                    py-3 sm:py-4 border-b border-white/5 last:border-0 
                                    hover:bg-white/5 px-3 sm:px-4 rounded-xl transition-colors gap-2 sm:gap-0
                                "
                            >
                                <div className="flex flex-col items-start sm:items-start">
                                    <span className="
                                        text-[9px] sm:text-[10px] md:text-xs 
                                        text-white font-medium mb-0.5 uppercase tracking-wider
                                    ">
                                        {boxInfo.title1} :
                                    </span>
                                    <span className="
                                        text-white text-xs sm:text-sm md:text-base 
                                        font-semibold
                                    ">
                                        {boxInfo.name1}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start sm:items-end text-left sm:text-right">
                                    <span className="
                                        text-[9px] sm:text-[10px] md:text-xs 
                                        text-white font-medium mb-0.5 uppercase tracking-wider
                                    ">
                                        {boxInfo.title2} :
                                    </span>
                                    <span className="
                                        text-white text-xs sm:text-sm md:text-base 
                                        font-semibold
                                    ">
                                        {boxInfo.name2}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* خط تزئینی متحرک پایین ر */}
            <div className="
                absolute bottom-0 left-0 h-1 
                bg-gradient-to-r from-SecondColor to-transparent 
                transition-all duration-1000 w-0 group-hover:w-full
            " />
        </div>
    )
}