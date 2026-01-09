import { useState } from "react";
import * as htmlToImage from "html-to-image";
import type { BoardAction, BoardState } from "../../app/boardReducer";

type ToolbarProps = {
    state: BoardState;
    dispatch: React.Dispatch<BoardAction>;
    boardRef: React.RefObject<HTMLDivElement | null>;
};

const Toolbar = ({ state, dispatch, boardRef }: ToolbarProps) => {
    const [imageUrl, setImageUrl] = useState("");

    const selectedItem = state.selectedItemId ? state.board.items.find((item) => item.id === state.selectedItemId) : null;
    const selectedColorItem = selectedItem?.type === "color" ? selectedItem : null;

    const exportPng = async () => {
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
            )
        }
    }

    return (
        <div className="flex gap-2">
            <input
                className="w-80 rounded-md border bg-white px-2 py-1 text-sm"
                placeholder="Paste image URL…"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />

            <button
                type="button"
                className="rounded-md border bg-white px-3 py-1 text-sm"
                onClick={() => {
                    const src = imageUrl.trim();
                    if (!src) return;
                    dispatch({ type: "ADD_IMAGE_ITEM", payload: { src } });
                    setImageUrl("");
                }}
            >
                Add image
            </button>

            <button
                type="button"
                className="rounded-md border bg-white px-3 py-1 text-sm"
                onClick={() => dispatch({ type: "ADD_COLOR_ITEM" })}
            >
                Add color
            </button>

            {selectedColorItem && (
                <div className="flex items-center gap-2">
                    <label className="text-sm text-neutral-700">Color</label>

                    <input
                        type="color"
                        value={selectedColorItem.hex}
                        onChange={(e) =>
                            dispatch({
                                type: "UPDATE_COLOR",
                                payload: { id: selectedColorItem.id, hex: e.target.value },
                            })
                        }
                        className="h-8 w-10 cursor-pointer rounded border"
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
                        className="w-28 rounded-md border bg-white px-2 py-1 text-sm"
                        spellCheck={false}
                    />
                </div>
            )}

            <button
                type="button"
                className="rounded-md border bg-white px-3 py-1 text-sm"
                onClick={() => dispatch({ type: "ADD_TEXT_ITEM" })}
            >
                Add text
            </button>

            <button
                type="button"
                className="rounded-md border bg-white px-3 py-1 text-sm"
                onClick={exportPng}
            >Export as PNG</button>
        </div>
    );
};

export default Toolbar;
