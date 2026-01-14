import { useEffect, useMemo, useRef, useState } from "react";
import type { BoardAction, BoardState } from "../../app/boardReducer";
import { ImagePlus, Square, Type, X, SlidersHorizontal } from "lucide-react";

type ToolbarProps = {
    state: BoardState;
    dispatch: React.Dispatch<BoardAction>;
    variant: "sidebar" | "dock";
};

export default function Toolbar({ state, dispatch, variant }: ToolbarProps) {
    const [imageUrl, setImageUrl] = useState("");
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const selectedItem = useMemo(() => {
        if (!state.selectedItemId) return null;
        return state.board.items.find((i) => i.id === state.selectedItemId) ?? null;
    }, [state.selectedItemId, state.board.items]);

    const selectedColorItem = selectedItem?.type === "color" ? selectedItem : null;

    const urlRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        if (!isSheetOpen) return;
        urlRef.current?.focus();
    }, [isSheetOpen]);

    const addImageFromUrl = () => {
        const src = imageUrl.trim();
        if (!src) alert("Please enter an image url");
        dispatch({ type: "ADD_IMAGE_ITEM", payload: { src } });
        setImageUrl("");
    };

    const toggleAddColor = () => {
        //if a color is added and is selected, toggle Off the color picker by deselecting it
        if (selectedColorItem) {
            dispatch({ type: "SELECT_ITEM", payload: { id: null } });
            return;
        }

        // If no color is selected, Add Color Item
        dispatch({ type: "ADD_COLOR_ITEM" })
    }


    const Controls = (
        <div className="flex flex-col gap-4">
            {/* IMAGE */}
            <div className="space-y-2">
                <p className="text-xs font-semibold tracking-wide text-white/60">Add</p>

                <label className="text-xs text-white/60">Image URL</label>
                <input
                    ref={urlRef}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
                    placeholder="Paste image URL…"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-101 hover:shadow-purple-500/50 cursor-pointer"
                    onClick={addImageFromUrl}
                >
                    <ImagePlus size={16} />
                    Add image
                </button>
            </div>

            {/* BUTTONS */}
            <div className="space-y-2">
                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-101 hover:shadow-purple-500/50 cursor-pointer"
                    onClick={toggleAddColor}
                >
                    <Square size={16} />
                    {selectedColorItem ? "Close color picker" : "Add Color"}
                </button>

                {/* COLOR PICKER (only when selected is color) */}
                {selectedColorItem && (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                        <p className="mb-2 text-xs font-semibold text-white/60">Color</p>

                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={selectedColorItem.hex}
                                onChange={(e) =>
                                    dispatch({
                                        type: "UPDATE_COLOR",
                                        payload: { id: selectedColorItem.id, hex: e.target.value },
                                    })
                                }
                                className="h-10 w-12 cursor-pointer rounded border border-white/10 bg-transparent shadow-sm"
                                aria-label="Pick color"
                            />

                            <input
                                type="text"
                                value={selectedColorItem.hex}
                                onChange={(e) =>
                                    dispatch({
                                        type: "UPDATE_COLOR",
                                        payload: { id: selectedColorItem.id, hex: e.target.value },
                                    })
                                }
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                                spellCheck={false}
                            />
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-101 hover:shadow-purple-500/50 cursor-pointer"
                    onClick={() => dispatch({ type: "ADD_TEXT_ITEM" })}
                >
                    <Type size={16} />
                    Add text
                </button>
            </div>
        </div>
    );

    // DESKTOP SIDEBAR
    if (variant === "sidebar") {
        return (
            <div className="h-full">
                <div className="mb-4 flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-white/70" />
                    <p className="text-sm font-semibold text-white">Controls</p>
                </div>
                {Controls}
            </div>
        );
    }

    // MOBILE DOCK (icons only) + sheet
    return (
        <>
            {/* Bottom dock */}
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/85 backdrop-blur-xl">
                <div className="mx-auto flex max-w-[520px] items-center justify-around px-4 py-3">
                    <button
                        type="button"
                        className="flex flex-col items-center gap-1 text-white/80 transition-colors hover:text-violet-400 cursor-pointer"
                        onClick={() => setIsSheetOpen(true)}
                        aria-label="Open controls"
                    >
                        <SlidersHorizontal size={20} />
                        <span className="text-[10px]">Controls</span>
                    </button>

                    <button
                        type="button"
                        className="flex flex-col items-center gap-1 text-white/80 transition-colors hover:text-violet-400 cursor-pointer"
                        onClick={() => {
                            setIsSheetOpen(true);
                            // focus URL input next paint
                            setTimeout(() => urlRef.current?.focus(), 0);
                        }}
                        aria-label="Add image"
                    >
                        <ImagePlus size={20} />
                        <span className="text-[10px]">Image</span>
                    </button>

                    <button
                        type="button"
                        className="flex flex-col items-center gap-1 text-white/80 transition-colors hover:text-violet-400 cursor-pointer"
                        onClick={() => dispatch({ type: "ADD_COLOR_ITEM" })}
                        aria-label="Add color"
                    >
                        <Square size={20} />
                        <span className="text-[10px]">Color</span>
                    </button>

                    <button
                        type="button"
                        className="flex flex-col items-center gap-1 text-white/80 transition-colors hover:text-violet-400 cursor-pointer"
                        onClick={() =>
                            dispatch({ type: "ADD_TEXT_ITEM" })}
                        aria-label="Add text"
                    >
                        <Type size={20} />
                        <span className="text-[10px]">Text</span>
                    </button>
                </div>
            </div>

            {/* Sheet */}
            {isSheetOpen && (
                <div className="md:hidden">
                    <button
                        type="button"
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                        aria-label="Close controls"
                        onClick={() => setIsSheetOpen(false)}
                    />
                    <div className="fixed inset-x-0 bottom-0 z-50 max-h-[80dvh] overflow-auto rounded-t-2xl border border-white/10 bg-slate-950/95 p-4 backdrop-blur-xl">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm font-semibold text-white">Controls</p>
                            <button
                                type="button"
                                className="rounded-lg border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/90 transition-colors hover:bg-white/10 cursor-pointer"
                                onClick={() => setIsSheetOpen(false)}
                            >
                                <span className="inline-flex items-center gap-2 pt-1">
                                    <X size={16} />
                                    Close
                                </span>
                            </button>
                        </div>

                        {Controls}
                        <div className="h-16" />
                    </div>
                </div>
            )}
        </>
    );
}