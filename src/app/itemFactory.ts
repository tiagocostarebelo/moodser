import type { ColorItem, TextItem, ImageItem } from "../types/board";
import { generatedId } from "../utils/id";


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
        text: "New text",
        x: 240,
        y: 100,
        width: 240,
        height: 100,
        zIndex: 2,
        ...partial,
    };
}

export function createImageItem(partial?: Partial<ImageItem>): ImageItem {
    return {
        id: generatedId(),
        type: "image",
        src: "https://placehold.co/320x220?text=Default+Image",
        width: 320,
        height: 220,
        x: 120,
        y: 120,
        zIndex: 1,
        ...partial,
    };
}