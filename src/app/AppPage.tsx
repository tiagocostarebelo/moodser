import { useCallback, useEffect, useReducer, useRef } from "react";
import * as htmlToImage from "html-to-image";
import AppLayout from "./AppLayout";
import Canvas from "../components/Canvas/Canvas";
import Toolbar from "../components/Toolbar/Toolbar";
import { boardReducer, initialBoardState } from "./boardReducer";

export default function AppPage() {
    const [state, dispatch] = useReducer(boardReducer, initialBoardState);
    const boardRef = useRef<HTMLDivElement | null>(null);

    const exportPng = useCallback(async () => {
        const node = boardRef.current;
        if (!node) return;

        try {
            const dataUrl = await htmlToImage.toPng(node, {
                cacheBust: true,
                pixelRatio: 2,
            });

            const link = document.createElement("a");
            link.download = "moodboard.png";
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error(err);
            alert(
                "Export failed. This is often caused by image URLs that block cross-origin export (CORS). Try a different image source."
            );
        }
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            const isTyping =
                target?.tagName === "INPUT" ||
                target?.tagName === "TEXTAREA" ||
                target?.getAttribute("contenteditable") === "true";

            if (isTyping) return;

            if (!state.selectedItemId) return;

            const step = e.shiftKey ? 10 : 1;
            let dx = 0;
            let dy = 0;

            if (e.key === "Delete" || e.key === "Backspace") {
                e.preventDefault();
                dispatch({ type: "DELETE_ITEM", payload: { id: state.selectedItemId } });
                return;
            }

            switch (e.key) {
                case "ArrowLeft":
                    dx = -step;
                    break;
                case "ArrowRight":
                    dx = step;
                    break;
                case "ArrowUp":
                    dy = -step;
                    break;
                case "ArrowDown":
                    dy = step;
                    break;
                default:
                    return;
            }

            e.preventDefault();
            dispatch({
                type: "MOVE_ITEM_BY",
                payload: { id: state.selectedItemId, dx, dy },
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [state.selectedItemId]);

    return (
        <AppLayout
            versionLabel="MVP"
            topRight={
                <button
                    type="button"
                    className="rounded-lg bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-2xl shadow-purple-500/50 transition-all hover:scale-105 hover:shadow-purple-500/70 cursor-pointer"
                    onClick={exportPng}
                >
                    Export PNG
                </button>
            }
        >
            {/* FULL-WIDTH EDITOR SHELL */}
            <div className="flex w-full">
                {/* LEFT SIDEBAR (pinned to edge) */}
                <aside className="hidden h-[calc(100dvh-125px)] w-[280px] shrink-0 border-r border-white/10 bg-white/5 backdrop-blur-xl p-4 md:block">
                    <Toolbar state={state} dispatch={dispatch} variant="sidebar" />
                </aside>

                {/* WORKSPACE */}
                <main className="h-[calc(100dvh-125px)] flex-1 overflow-auto p-4">
                    <Canvas state={state} dispatch={dispatch} boardRef={boardRef} />
                </main>
            </div>

            {/* MOBILE BOTTOM DOCK (icons only) */}
            <div className="md:hidden">
                <Toolbar state={state} dispatch={dispatch} variant="dock" />
            </div>
        </AppLayout>
    );
}