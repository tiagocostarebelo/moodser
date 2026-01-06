import type { ReactNode } from "react";

type AppLayoutProps = {
    children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="min-h-screen bg-neutral-100">
            <header className="sticky top-0 z-50 border-b bg-white">
                <div className="mx-auto flex h-14 max-w-[1000px] w-full px-4 items-center justify-between">
                    <div className="font-semibold">Moodboard Composer</div>
                    <div className="text-sm text-neutral-500">MVP</div>
                </div>
            </header>
            <main className="mx-auto max-w-[1000px] w-full px-4 py-8">{children}</main>
        </div>
    )
}

export default AppLayout