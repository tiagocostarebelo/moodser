type AppLayoutProps = {
    children: React.ReactNode;
    versionLabel?: string;      // "MVP" or "v0.0.1"
    topRight?: React.ReactNode; // Export button etc.
};

export default function AppLayout({
    children,
    versionLabel = "MVP",
    topRight,
}: AppLayoutProps) {
    return (
        <div className="min-h-dvh bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
            {/* HEADER */}
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="flex w-full items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-pink-500 via-violet-500 to-cyan-500 shadow-lg shadow-purple-500/50" />
                        <div className="leading-tight">
                            <a href="/" className="text-sm font-semibold tracking-tight text-white">Mooder</a>
                            <p className="text-xs text-slate-400">Editor</p>
                        </div>
                    </div>

                    <span className="text-xs text-slate-400">{versionLabel}</span>
                </div>
            </header>

            {/* TOP BAR (full width, not centered) */}
            <div className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="flex w-full items-center justify-end px-4 py-3">
                    {topRight}
                </div>
            </div>

            {/* BODY */}
            <div className="w-full">{children}</div>
        </div>
    );
}