"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const links = [
        { name: "خانه",          status: true,  path: "/" },
        { name: "فیزیک دوازدهم", status: true,  path: "/physic12/" },
        { name: "درباره ما",      status: false, path: "" },
        { name: "درباره پروژه",  status: false, path: "" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full px-6 py-3">

            <div className="w-full mx-auto backdrop-blur-md bg-[#0f172a]/70 border border-white/10 rounded-2xl px-6 moblet-size:px-8 py-4 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                

                <div className="relative group">
                    <h1 className="text-ThirdColor text-textSize-second tablet-size:text-textSize-logo font-black tracking-tighter transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#169976]">
                        فیزیک رو <span className="text-white">راحت</span> ببین
                    </h1>
                    <div className="absolute -bottom-1 right-0 w-1/2 h-[2px] bg-gradient-to-l from-ThirdColor to-transparent" />
                </div>


                <button
                    className="tablet-size:hidden text-white p-2 -mr-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="باز و بسته کردن منو"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>


                <nav className="hidden tablet-size:flex flex-row items-center gap-x-8">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.status ? link.path : "#"}
                            className={`
                                relative text-textSize-second font-medium transition-all duration-300 cursor-pointer
                                ${link.status
                                    ? "text-white hover:text-ThirdColor cursor-pointer group"
                                    : "text-white/30 cursor-not-allowed"}
                            `}
                        >
                            {link.name}

                            {link.status && (
                                <span className="absolute -bottom-2 right-0 w-0 h-[2px] bg-ThirdColor transition-all duration-300 group-hover:w-full" />
                            )}

                            {!link.status && (
                                <span className="absolute -top-3 -right-2 text-[8px] opacity-50 font-light">بزودی</span>
                            )}
                        </Link>
                    ))}
                </nav>


                <div className="hidden tablet-size:block">
                    <button className="px-5 py-2 cursor-pointer rounded-xl bg-SecondColor text-white text-xs font-bold hover:shadow-[0_0_15px_#169976] transition-all duration-300 border border-white/10">
                        پنل کاربری
                    </button>
                </div>
            </div>


            <div
                className={`
                    tablet-size:hidden fixed inset-x-0 top-[theme(spacing.3)] z-40 transition-all duration-300 ease-in-out
                    ${isOpen
                        ? "translate-y-0 opacity-100 visible"
                        : "-translate-y-full opacity-0 invisible pointer-events-none"}
                `}
            >
                <div className="mx-6 mt-3 backdrop-blur-md bg-[#0f172a]/95 border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden">
                    <div className="flex flex-col items-center py-6 px-4 gap-y-5">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.status ? link.path : "#"}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    relative text-base moblet-size:text-lg font-medium transition-all duration-300 w-full text-center py-2
                                    ${link.status
                                        ? "text-white hover:text-ThirdColor group"
                                        : "text-white/30 cursor-not-allowed"}
                                `}
                            >
                                {link.name}

                                {link.status && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-ThirdColor transition-all duration-300 group-hover:w-3/4" />
                                )}

                                {!link.status && (
                                    <span className="absolute -top-1 right-4 text-[10px] opacity-60 font-light">بزودی</span>
                                )}
                            </Link>
                        ))}


                        <button className="mt-3 w-full max-w-xs px-5 py-3 rounded-xl bg-SecondColor text-white text-textSize-third font-bold hover:shadow-[0_0_15px_#169976] transition-all duration-300 border border-white/10">
                            پنل کاربری
                        </button>
                    </div>
                </div>
            </div>


            {isOpen && (
                <div
                    className="tablet-size:hidden fixed inset-0 bg-black/40 z-30 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </header>
    )
}