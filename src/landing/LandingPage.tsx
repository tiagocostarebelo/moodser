import { useNavigate } from "react-router";
import { ArrowRight, Sparkles, Layers, Zap, Download, Palette, MousePointer2 } from "lucide-react";
import { useEffect, useState } from "react";

const LandingPage = () => {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const features = [
        {
            icon: Palette,
            title: "Visual Freedom",
            description: "Drag, drop, and arrange colors, text, and images exactly how you envision them.",
            color: "from-pink-500 to-rose-500"
        },
        {
            icon: Layers,
            title: "Layer Control",
            description: "Stack elements with precision. Bring forward, send back, and compose with confidence.",
            color: "from-violet-500 to-purple-500"
        },
        {
            icon: MousePointer2,
            title: "Intuitive Design",
            description: "Click to select, drag to move, double-click to edit. It just works.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Zap,
            title: "Keyboard Shortcuts",
            description: "Arrow keys to nudge, Shift for precision, Delete to remove. Power user ready.",
            color: "from-amber-500 to-orange-500"
        },
        {
            icon: Download,
            title: "Export Ready",
            description: "Export high-quality PNG images of your moodboards instantly.",
            color: "from-emerald-500 to-teal-500"
        },
        {
            icon: Sparkles,
            title: "Real-time Preview",
            description: "See changes as you make them. No rendering. No waiting. Pure creation.",
            color: "from-fuchsia-500 to-pink-500"
        }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            {/* Animated gradient orbs */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute h-[600px] w-[600px] rounded-full bg-gradient-to-r from-pink-500/20 to-violet-500/20 blur-3xl"
                    style={{
                        top: mousePosition.y * 0.02 - 300,
                        left: mousePosition.x * 0.02 - 300,
                        transition: "all 0.3s ease-out"
                    }}
                />
                <div
                    className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"
                    style={{
                        bottom: mousePosition.y * -0.015,
                        right: mousePosition.x * -0.015,
                        transition: "all 0.3s ease-out"
                    }}
                />
                <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-3xl" />
            </div>

            {/* Noise texture overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
                }}
            />

            <div className="relative z-10">
                {/* Header */}
                <header className="container mx-auto px-4 py-6">
                    <nav className="flex items-center justify-between">
                        <div
                            className="flex items-center gap-3 transition-all duration-700"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(-20px)"
                            }}
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-violet-500 to-cyan-500 shadow-lg shadow-purple-500/50">
                                <Layers className="h-6 w-6 text-white" />
                            </div>
                            <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                                Moodboard Composer
                            </span>
                        </div>
                        <button
                            onClick={() => navigate("/app")}
                            className="group rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:shadow-purple-500/30"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(-20px)",
                                transitionDelay: "100ms"
                            }}
                        >
                            Launch App
                        </button>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-4 py-20 md:py-32">
                    <div className="mx-auto max-w-5xl text-center">
                        <div
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-2 text-sm font-medium text-pink-300 backdrop-blur-sm transition-all duration-700"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "scale(1)" : "scale(0.9)",
                                transitionDelay: "200ms"
                            }}
                        >
                            <Sparkles className="h-4 w-4" />
                            Free & Open Source MVP
                        </div>

                        <h1
                            className="mb-6 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl lg:text-8xl transition-all duration-700"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                                transitionDelay: "300ms",
                                fontFamily: "'Space Grotesk', sans-serif"
                            }}
                        >
                            Compose Your
                            <span className="relative mx-3 inline-block">
                                <span className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 blur-xl opacity-70" />
                                <span className="relative bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                    Vision
                                </span>
                            </span>
                        </h1>

                        <p
                            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl transition-all duration-700"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                                transitionDelay: "400ms"
                            }}
                        >
                            A powerful, intuitive canvas for creating stunning moodboards.
                            Drag, resize, layer, and export. No login required. Pure creative freedom.
                        </p>

                        <div
                            className="flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-700"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                                transitionDelay: "500ms"
                            }}
                        >
                            <button
                                onClick={() => navigate("/app")}
                                className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/70"
                            >
                                Start Creating
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                            <button
                                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
                            >
                                Learn More
                            </button>
                        </div>

                        {/* Floating preview mockup */}
                        <div
                            className="relative mx-auto mt-20 max-w-4xl transition-all duration-1000"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0) rotateX(0deg)" : "translateY(50px) rotateX(10deg)",
                                transitionDelay: "600ms"
                            }}
                        >
                            <div className="absolute -inset-4 animate-pulse rounded-3xl bg-gradient-to-r from-pink-500/30 via-violet-500/30 to-cyan-500/30 blur-2xl" />
                            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-8 shadow-2xl backdrop-blur-xl">
                                {/* Mock canvas */}
                                <div className="aspect-video rounded-xl bg-white shadow-2xl">
                                    {/* Mock elements */}
                                    <div className="relative h-full w-full p-8">
                                        <div className="absolute left-12 top-12 h-24 w-24 rotate-6 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg" />
                                        <div className="absolute right-20 top-16 h-32 w-32 -rotate-3 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 shadow-lg" />
                                        <div className="absolute bottom-16 left-32 h-20 w-40 rotate-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg" />
                                        <div className="absolute right-12 bottom-12 rounded-lg bg-white px-4 py-2 font-medium text-slate-900 shadow-lg">
                                            Creative Spark ✨
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="container mx-auto px-4 py-20 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
                                Everything You Need
                            </h2>
                            <p className="text-lg text-slate-300">
                                Built for speed, designed for creativity
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-white/20 hover:bg-white/10"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        animation: isVisible ? 'fadeInUp 0.7s ease-out forwards' : 'none',
                                        opacity: 0
                                    }}
                                >
                                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                                        <feature.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="leading-relaxed text-slate-300">
                                        {feature.description}
                                    </p>
                                    <div className={`absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${feature.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-4 py-20 md:py-32">
                    <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-pink-500/10 via-violet-500/10 to-cyan-500/10 p-12 backdrop-blur-xl md:p-20">
                        <div className="absolute -right-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-pink-500/30 to-violet-500/30 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 blur-3xl" />

                        <div className="relative text-center">
                            <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
                                Ready to Create?
                            </h2>
                            <p className="mb-10 text-lg text-slate-300">
                                Join creative minds shaping their vision. Free forever.
                            </p>
                            <button
                                onClick={() => navigate("/app")}
                                className="group inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-lg font-bold text-slate-900 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/20"
                            >
                                Launch Moodboard Composer
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-white/10 bg-black/20 py-8 backdrop-blur-xl">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-sm text-slate-400">
                            Built with passion. Open source and free to use.
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                            © 2026 Moodboard Composer. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;