import type { ReactNode } from "react";

type AppLayoutProps = {
    children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="min-h-dvh bg-neutral-950 text-white">
            <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
                <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/10" />
                        <div className="leading-tight">
                            <a href="/" className="text-sm font-semibold tracking-tight">Moodboard</a>
                            <p className="text-xs text-white/60">Editor</p>
                        </div>
                    </div>

                    <div className="text-xs text-white/60">v0.0.1</div>
                </div>
            </header>

            <main className="mx-auto max-w-[1280px] px-4 py-6">{children}</main>
        </div>
    )
}

export default AppLayout