import type { Board, BoardItem } from "../types/board";

export type BoardState = {
    board: Board;
    selectedItemId: string | null;
};

export type BoardAction =
    | { type: "SELECT_ITEM"; payload: { id: string | null } }
    | { type: "MOVE_ITEM"; payload: { id: string; x: number; y: number } }
    | { type: "ADD_COLOR_ITEM" }
    | { type: "ADD_TEXT_ITEM" };

export const initialBoardState: BoardState = {
    board: {
        id: "board-1",
        items: [
            {
                id: "1",
                type: "color",
                hex: "#F4D03F",
                width: 100,
                height: 100,
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
        ],
    },
    selectedItemId: null,
};

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
    switch (action.type) {
        case "SELECT_ITEM": {
            return { ...state, selectedItemId: action.payload.id };
        }

        case "MOVE_ITEM": {
            const { id, x, y } = action.payload;

            return {
                ...state,
                board: {
                    ...state.board,
                    items: state.board.items.map((item) => item.id === id ? { ...item, x, y } : item)
                }
            };
        }

        default: {
            return state;
        }
    }
}

