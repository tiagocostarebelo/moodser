import { useLayoutEffect, useRef, useState } from "react";
import type { BoardAction, BoardState } from "../../app/boardReducer";
import ColorItemView from "../items/ColorItemView";
import TextItemView from "../items/TextItemView";
import ImageItemView from "../items/ImageItemView";

type CanvasProps = {
    state: BoardState;
    dispatch: React.Dispatch<BoardAction>;
    boardRef: React.RefObject<HTMLDivElement | null>;
};

const Canvas = ({ state, dispatch, boardRef }: CanvasProps) => {
    const [scale, setScale] = useState(1);

    const items = state.board.items;
    const viewportRef = useRef<HTMLDivElement | null>(null);

    const handleSelect = (id: string) => {
        dispatch({ type: "SELECT_ITEM", payload: { id } });
        dispatch({ type: "BRING_TO_FRONT", payload: { id } });
    };

    useLayoutEffect(() => {
        const el = viewportRef.current;
        if (!el) return;

        const update = () => {
            const available = el.clientWidth;
            const nextScale = Math.min(1, available / state.board.width);
            setScale(nextScale);
        };

        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);

        return () => ro.disconnect();
    }, [state.board.width]);

    return (

        <div
            ref={viewportRef}
            className="w-full h-full overflow-auto rounded-xl bg-neutral-900/40 p-4"
        >
            <div className="mx-auto w-fit">
                <div
                    className="origin-top-left"
                    style={{
                        width: state.board.width,
                        height: state.board.height,
                        transform: `scale(${scale})`,
                    }}
                >
                    <div
                        ref={boardRef}
                        className="relative mx-auto rounded-xl bg-white shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
                        style={{ width: state.board.width, height: state.board.height }}
                        onPointerDown={() => dispatch({ type: "SELECT_ITEM", payload: { id: null } })}
                    >
                        {items.map((item) => {
                            const isSelected = state.selectedItemId === item.id;

                            if (item.type === "color") {
                                return (
                                    <ColorItemView
                                        key={item.id}
                                        item={item}
                                        isSelected={isSelected}
                                        onSelect={handleSelect}
                                        dispatch={dispatch}
                                        scale={scale}
                                    />
                                );
                            }

                            if (item.type === "text") {
                                return (
                                    <TextItemView
                                        key={item.id}
                                        item={item}
                                        isSelected={isSelected}
                                        onSelect={handleSelect}
                                        dispatch={dispatch}
                                        scale={scale}
                                    />
                                )
                            }

                            if (item.type === "image") {
                                return (
                                    <ImageItemView
                                        key={item.id}
                                        item={item}
                                        isSelected={isSelected}
                                        onSelect={handleSelect}
                                        dispatch={dispatch}
                                        scale={scale}
                                    />
                                );
                            }

                            return null;
                        })}
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Canvas;
