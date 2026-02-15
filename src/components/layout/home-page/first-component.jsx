"use client"
import Link from "next/link"
import { Lock, BookOpen } from "lucide-react"

export default function PhysicCompon() {
    const Physic12Options = [
        { name: "فصل اول", status: true, path: "/physic12/chapter-1" },
        { name: "فصل دوم", status: false, path: "/physic12/chapter-2" },
        { name: "فصل سوم", status: false, path: "/physic12/chapter-3" },
        { name: "فصل چهارم", status: false, path: "/physic12/chapter-4" },
        { name: "فصل پنجم", status: false, path: "/physic12/chapter-5" },
        { name: "فصل ششم", status: false, path: "/physic12/chapter-6" },
    ]

    return (
        <div className="
            relative w-full overflow-hidden rounded-2xl 
            bg-BoxColor border border-white/10 
            p-5 sm:p-6 md:p-8 lg:p-8 
            shadow-2xl transition-all duration-500
        ">
            

            <div className="
                absolute -top-16 -right-16 sm:-top-20 sm:-right-20 md:-top-24 md:-right-24 
                w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 
                bg-SecondColor/20 rounded-full blur-[80px] sm:blur-[90px] md:blur-[100px]
            " />
            <div className="
                absolute -bottom-16 -left-16 sm:-bottom-20 sm:-left-20 md:-bottom-24 md:-left-24 
                w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 
                bg-LastColor/10 rounded-full blur-[80px] sm:blur-[90px] md:blur-[100px]
            " />

            <div className="relative z-10 flex flex-col gap-y-6 sm:gap-y-8 md:gap-y-10">

                <div className="
                    flex flex-col gap-y-3 sm:gap-y-4 
                    border-r-4 border-SecondColor pr-4 sm:pr-5 md:pr-6
                ">
                    <h3 className="
                        text-white text-2xl sm:text-[1.75rem] md:text-3xl 
                        font-bold tracking-tight
                    ">
                        فیزیک <span className="text-ThirdColor">دوازدهم</span>
                    </h3>
                    <p className="
                        max-w-xl text-gray-400 
                        text-xs sm:text-sm md:text-textSize-second 
                        leading-relaxed text-justify
                    ">
                        ما در حال آپلود محتوای جدید هستیم. فصل‌هایی که در دسترس نیستند به زودی فعال خواهند شد. از شکیبایی شما سپاسگزاریم.
                    </p>
                </div>

                {/* شبکه دکمه‌ها (فصل‌ها) – grid ریسپانسیو با breakpointهای کاستوم */}
                <div className="
                    grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 
                    md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
                    gap-3 sm:gap-4 md:gap-5 lg:gap-4
                ">
                    {Physic12Options.map((link, index) => (
                        <Link
                            key={index}
                            href={link.status ? link.path : "#"}
                            className={`
                                relative group overflow-hidden flex flex-col items-center justify-center 
                                py-5 sm:py-6 md:py-7 lg:py-6 px-3 sm:px-4 md:px-5 rounded-xl 
                                transition-all duration-500 border
                                ${link.status 
                                    ? "bg-white/5 border-white/10 hover:border-SecondColor/50 hover:bg-white/10 hover:-translate-y-2" 
                                    : "bg-black/20 border-white/5 opacity-50 cursor-not-allowed"}
                            `}
                        >

                            <div className={`
                                mb-2 sm:mb-3 p-2.5 sm:p-3 rounded-full transition-colors duration-300 
                                ${link.status 
                                    ? 'bg-SecondColor/10 text-SecondColor group-hover:bg-SecondColor group-hover:text-white' 
                                    : 'bg-gray-800 text-gray-500'}
                            `}>
                                {link.status ? <BookOpen size={18} className="sm:size-20 md:size-[20]" /> : <Lock size={18} className="sm:size-20 md:size-[20]" />}
                            </div>

                            {/* نام فصل – اندازه متن fluid */}
                            <span className={`
                                text-xs sm:text-sm md:text-base font-bold transition-colors 
                                ${link.status ? "text-white" : "text-gray-500"}
                            `}>
                                {link.name}
                            </span>

                            {link.status && (
                                <div className="
                                    absolute bottom-0 left-0 w-full h-1 
                                    bg-gradient-to-r from-transparent via-SecondColor to-transparent 
                                    opacity-0 group-hover:opacity-100 transition-opacity
                                " />
                            )}
                            

                            {!link.status && (
                                <span className="
                                    absolute top-1.5 sm:top-2 right-1.5 sm:right-2 
                                    text-[7px] sm:text-[8px] md:text-[9px] 
                                    text-gray-400 font-light uppercase
                                ">
                                    بزودی
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}