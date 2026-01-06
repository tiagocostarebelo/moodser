import type { TextItem } from "../../types/board";

type TextItemViewProps = {
    item: TextItem;
    isSelected: boolean;
    onSelect: (id: string) => void;
};

const TextItemView = ({ item, isSelected, onSelect }: TextItemViewProps) => {
    return (
        <button
            type="button"
            className="absolute text-lg font-medium text-neutral-900"
            onClick={() => onSelect(item.id)}
            style={{
                left: item.x,
                top: item.y,
                zIndex: item.zIndex,
                outline: isSelected ? "2px solid black" : "none",
                borderRadius: 6,
                padding: "2px 6px",
            }}
        >
            {item.text}
        </button>
    )
}

export default TextItemView;