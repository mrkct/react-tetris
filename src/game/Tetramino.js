const COLORS = {
    RED: "#FF0000",
    GREEN: "#00FF00",
    BLUE: "#0000FF",
    AQUA: "#00FFFF",
    YELLOW: "#FFFF00",
    PURPLE: "#FF00FF"
};

export default {
    BLOCK: [
        [COLORS.YELLOW, COLORS.YELLOW],
        [COLORS.YELLOW, COLORS.YELLOW]
    ],
    STRAIGHT: [
        [COLORS.AQUA],
        [COLORS.AQUA],
        [COLORS.AQUA],
        [COLORS.AQUA]
    ],
    L_SHAPE: [
        [COLORS.RED, undefined, undefined],
        [COLORS.RED, COLORS.RED, COLORS.RED]
    ],
    J_SHAPE: [
        [undefined, undefined, COLORS.RED],
        [COLORS.RED, COLORS.RED, COLORS.RED]
    ],
    T_SHAPE: [
        [undefined, COLORS.PURPLE, undefined],
        [COLORS.PURPLE, COLORS.PURPLE, COLORS.PURPLE]
    ],
    S_SHAPE: [
        [undefined, COLORS.GREEN, COLORS.GREEN],
        [COLORS.GREEN, COLORS.GREEN, undefined]
    ],
    Z_SHAPE: [
        [COLORS.RED, COLORS.RED, undefined],
        [undefined, COLORS.RED, COLORS.RED]
    ]
};