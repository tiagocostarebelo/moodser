import { useEffect, useRef, useState } from "react";
import type { TextItem } from "../../types/board";
import type { BoardAction } from "../../app/boardReducer";
import { useItemDrag } from "../../hooks/useItemDrag";

type TextItemViewProps = {
    item: TextItem;
    isSelected: boolean;
    onSelect: (id: string) => void;
    dispatch: React.Dispatch<BoardAction>;
    scale: number;
};

const FALLBACK_TEXT = "New note";

const PADDING_X = 12; // 
const PADDING_Y = 4;  //

const TextItemView = ({ item, isSelected, onSelect, dispatch, scale }: TextItemViewProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(item.text);

    const dragHandlers = useItemDrag({
        id: item.id,
        x: item.x,
        y: item.y,
        dispatch,
        scale,
    });

    const inputRef = useRef<HTMLInputElement | null>(null);
    const measureRef = useRef<HTMLSpanElement | null>(null);

    // For Mobile 
    const longPressTimerRef = useRef<number | null>(null);
    const pressStartRef = useRef<{ x: number; y: number } | null>(null);
    const LONG_PRESS_MS = 500;
    const MOVE_TOLERANCE = 6;

    // Keep draft in sync if item.text changes from outside
    useEffect(() => {
        if (!isEditing) setDraft(item.text);
    }, [item.text, isEditing]);

    // Auto-focus when entering edit mode
    useEffect(() => {
        if (!isEditing) return;
        inputRef.current?.focus();
        inputRef.current?.select();
    }, [isEditing]);

    const commit = () => {
        const trimmed = draft.trim();
        const finalText = trimmed.length ? trimmed : FALLBACK_TEXT;

        const el = measureRef.current;
        const rect = el?.getBoundingClientRect();

        const textW = rect ? Math.ceil(rect.width) : item.width;
        const textH = rect ? Math.ceil(rect.height) : item.height;

        const width = Math.max(24, textW + PADDING_X);
        const height = Math.max(24, textH + PADDING_Y);

        dispatch({
            type: "UPDATE_TEXT",
            payload: {
                id: item.id,
                text: finalText,
                width,
                height,
            },
        });

        setIsEditing(false);
    };

    const cancel = () => {
        setDraft(item.text);
        setIsEditing(false);
    };

    const startLongPress = (x: number, y: number) => {
        pressStartRef.current = { x, y };

        longPressTimerRef.current = window.setTimeout(() => {
            onSelect(item.id);
            setIsEditing(true);
        }, LONG_PRESS_MS);
    };

    const cancelLongPress = () => {
        if (longPressTimerRef.current) {
            window.clearTimeout(longPressTimerRef.current);
            longPressTimerRef.current = null;
        }
        pressStartRef.current = null;
    };

    return (
        <>
            <span
                ref={measureRef}
                className="pointer-events-none invisible absolute whitespace-pre text-lg font-medium text-neutral-900"
                style={{ left: -9999, top: -9999 }}
                aria-hidden="true"
            >
                {(draft.trim().length ? draft.trim() : FALLBACK_TEXT)}
            </span>

            {isEditing ? (
                <div
                    className="absolute"
                    style={{
                        left: item.x,
                        top: item.y,
                        zIndex: item.zIndex,
                        borderRadius: 6,
                        padding: "2px 6px",
                        outline: "2px solid black",
                        background: "white",
                    }}
                >
                    <input
                        ref={inputRef}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        className="bg-transparent text-lg font-medium text-neutral-900 outline-none"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                commit();
                            }
                            if (e.key === "Escape") {
                                e.preventDefault();
                                cancel();
                            }
                        }}
                        onBlur={commit}
                    />
                </div>
            ) : (
                <button
                    type="button"
                    className="absolute text-lg font-medium text-neutral-900 touch-none"
                    onClick={() => onSelect(item.id)}
                    onDoubleClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onSelect(item.id);
                        setIsEditing(true);
                    }}
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        onSelect(item.id);

                        startLongPress(e.clientX, e.clientY);

                        dragHandlers.onPointerDown(e);
                    }}
                    onPointerMove={(e) => {
                        const start = pressStartRef.current;

                        if (start) {
                            const dx = e.clientX - start.x;
                            const dy = e.clientY - start.y;
                            const dist = Math.hypot(dx, dy);

                            // only cancel if user actually drags
                            if (dist > MOVE_TOLERANCE) cancelLongPress();
                        }

                        dragHandlers.onPointerMove(e);
                    }}
                    onPointerUp={(e) => {
                        cancelLongPress();
                        dragHandlers.onPointerUp(e);
                    }}
                    onPointerCancel={(e) => {
                        cancelLongPress();
                        dragHandlers.onPointerCancel(e);
                    }}
                    style={{
                        left: item.x,
                        top: item.y,
                        zIndex: item.zIndex,
                        outline: isSelected ? "2px solid black" : "none",
                        borderRadius: 6,
                        padding: "2px 6px",
                        cursor: "grab",
                    }}
                >
                    {item.text}
                </button>
            )}
        </>
    );
};

export default TextItemView;
