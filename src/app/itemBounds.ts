import type { BoardItem } from "../types/board";

export function getItemSize(item: BoardItem): { width: number; height: number } {
    switch (item.type) {
        case "color":
            return { width: item.width, height: item.height };
        case "image":
            return { width: item.width, height: item.height };
        case "text":
            return { width: item.width, height: item.height };
        default:
            return { width: 0, height: 0 };
    }
}