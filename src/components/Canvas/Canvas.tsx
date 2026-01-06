import { useReducer } from "react";
import type { BoardItem } from "../../types/board";
import { boardReducer, initialBoardState } from "../../app/BoardReducer";



const Canvas = () => {
    const [state, dispatch] = useReducer(boardReducer, initialBoardState);
    const items = state.board.items;

    const handleSelect = (id: string) => {
        dispatch({ type: "SELECT_ITEM", payload: { id } });
    };

    return (
        <div className="relative mx-auto mt-12 min-h-[600px] max-w-[1000px] w-full px-4 bg-white border rounded-lg">
            {items.map((item) => {
                if (item.type === "color") {
                    return (
                        <button
                            key={item.id}
                            type="button"
                            aria-label={`Color swatch ${item.hex}`}
                            className={`absolute rounded-md border`}
                            onClick={() => handleSelect(item.id)}
                            style={{
                                left: item.x,
                                top: item.y,
                                backgroundColor: item.hex,
                                width: item.width,
                                height: item.height,
                                zIndex: item.zIndex,
                                borderColor: state.selectedItemId === item.id ? "black" : "transparent",
                            }}
                        />
                    );
                };

                if (item.type === "text") {
                    console.log("Rendering text item:", item);
                    return (
                        <button
                            key={item.id}
                            type="button"
                            className="absolute text-lg font-medium text-neutral-900"
                            onClick={() => handleSelect(item.id)}
                            style={{
                                left: item.x,
                                top: item.y,
                                zIndex: item.zIndex,
                                outline: state.selectedItemId === item.id ? "2px solid black" : "none",
                                borderRadius: 6,
                                padding: "2px 6px",
                            }}
                        >
                            {item.text}
                        </button>
                    );
                };

                return null;
            })}
        </div>
    )
}

export default Canvas