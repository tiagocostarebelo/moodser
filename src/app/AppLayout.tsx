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
        <div className="min-h-dvh bg-neutral-950 text-white">
            {/* HEADER */}
            <header className="border-b border-white/10">
                <div className="flex w-full items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/10" />
                        <div className="leading-tight">
                            <p className="text-sm font-semibold tracking-tight">Moodboard Composer</p>
                            <p className="text-xs text-white/60">Editor</p>
                        </div>
                    </div>

                    <span className="text-xs text-white/50">{versionLabel}</span>
                </div>
            </header>

            {/* TOP BAR (full width, not centered) */}
            <div className="border-b border-white/10 bg-neutral-950/70 backdrop-blur">
                <div className="flex w-full items-center justify-end px-4 py-3">
                    {topRight}
                </div>
            </div>

            {/* BODY */}
            <div className="w-full">{children}</div>
        </div>
    );
}
