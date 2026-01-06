import type { ColorItem, TextItem } from "../types/board";

const generatedId = () => crypto.randomUUID();

export function createColorItem(partial?: Partial<ColorItem>): ColorItem {
    return {
        id: generatedId(),
        type: "color",
        hex: "#F4D03F",
        width: 120,
        height: 120,
        x: 80,
        y: 80,
        zIndex: 1,
        ...partial,
    };
}

export function createTextItem(partial?: Partial<TextItem>): TextItem {
    return {
        id: generatedId(),
        type: "text",
        text: "New note",
        x: 240,
        y: 100,
        zIndex: 2,
        ...partial,
    };
}