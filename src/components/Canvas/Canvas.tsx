import type { BoardItem } from "../../types/board"

const items: BoardItem[] = [
    {
        id: "1",
        type: "color",
        hex: "#F4D03F",
        x: 100,
        y: 80,
        zIndex: 1,
    },
    {
        id: "2",
        type: "text",
        text: "Warm & playful",
        x: 260,
        y: 100,
        zIndex: 2,
    },
]

const Canvas = () => {

    return (
        <div className="relative mx-auto mt-12 h-[600px] w-[1000px] bg-white border rounded-lg">
            {items.map((item) => {
                if (item.type === "color") {
                    return (
                        <div
                            key={item.id}
                            className="absolute w-32 h-32 rounded-md"
                            style={{
                                left: item.x,
                                top: item.y,
                                backgroundColor: item.hex,
                                zIndex: item.zIndex,
                            }}
                        />
                    );
                };

                if (item.type === "text") {
                    console.log("Rendering text item:", item);
                    return (
                        <div
                            key={item.id}
                            className="absolute text-lg font-medium"
                            style={{
                                left: item.x,
                                top: item.y,
                                zIndex: item.zIndex,
                            }}
                        >
                            {item.text}
                        </div>
                    );
                };

                return null;
            })}
        </div>
    )
}

export default Canvas