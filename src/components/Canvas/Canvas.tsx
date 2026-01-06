import type { BoardAction, BoardState } from "../../app/boardReducer";
import ColorItemView from "../items/ColorItemView";
import TextItemView from "../items/TextItemView";

type CanvasProps = {
    state: BoardState;
    dispatch: React.Dispatch<BoardAction>;
};

const Canvas = ({ state, dispatch }: CanvasProps) => {
    const items = state.board.items;

    const handleSelect = (id: string) => {
        dispatch({ type: "SELECT_ITEM", payload: { id } });
    };

    return (
        <div className="relative min-h-[600px] w-full bg-white border rounded-lg">
            {items.map((item) => {
                const isSelected = state.selectedItemId === item.id;

                if (item.type === "color") {
                    return (
                        <ColorItemView
                            key={item.id}
                            item={item}
                            isSelected={isSelected}
                            onSelect={handleSelect}
                        />
                    );
                }

                if (item.type === "text") {
                    <TextItemView
                        key={item.id}
                        item={item}
                        isSelected={isSelected}
                        onSelect={handleSelect}
                    />
                }

                return null;
            })}
        </div>
    );
};

export default Canvas;
