const COLORS = {
    RED: "#FF0000",
    GREEN: "#00FF00",
    BLUE: "#004FFF",
    AQUA: "#00FFFF",
    YELLOW: "#FFFF00",
    PURPLE: "#FF00FF",
    ORANGE: "#FF4F0F"
};

export default {
    BLOCK: [
        [
            [COLORS.YELLOW, COLORS.YELLOW],
            [COLORS.YELLOW, COLORS.YELLOW]
        ]
    ],
    STRAIGHT: [
        [
            [undefined, undefined, COLORS.AQUA, undefined],
            [undefined, undefined, COLORS.AQUA, undefined],
            [undefined, undefined, COLORS.AQUA, undefined],
            [undefined, undefined, COLORS.AQUA, undefined]
        ],
        [
            [undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined],
            [COLORS.AQUA, COLORS.AQUA, COLORS.AQUA, COLORS.AQUA],
            [undefined, undefined, undefined, undefined],
        ]
    ],
    L_SHAPE: [
        [
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
            [COLORS.ORANGE, undefined, undefined],
            [COLORS.ORANGE, COLORS.ORANGE, COLORS.ORANGE]
        ],
        [
            [COLORS.ORANGE, COLORS.ORANGE, undefined],
            [COLORS.ORANGE, undefined, undefined],
            [COLORS.ORANGE, undefined, undefined],
            [undefined, undefined, undefined]
        ],
        [
            [COLORS.ORANGE, COLORS.ORANGE, COLORS.ORANGE],
            [undefined, undefined, COLORS.ORANGE],
            [undefined, undefined, undefined],
            [undefined, undefined, undefined]
        ],
        [
            [undefined, undefined, undefined],
            [undefined, undefined, COLORS.ORANGE],
            [undefined, undefined, COLORS.ORANGE],
            [undefined, COLORS.ORANGE, COLORS.ORANGE]
        ]
    ],
    J_SHAPE: [
        [
            [undefined, undefined, undefined],
            [undefined, undefined, COLORS.BLUE],
            [COLORS.BLUE, COLORS.BLUE, COLORS.BLUE]
        ],
        [
            [COLORS.BLUE, undefined, undefined],
            [COLORS.BLUE, undefined, undefined],
            [COLORS.BLUE, COLORS.BLUE, undefined]
        ],
        [
            [COLORS.BLUE, COLORS.BLUE, COLORS.BLUE],
            [COLORS.BLUE, undefined, undefined],
            [undefined, undefined, undefined]
        ],
        [
            [undefined, COLORS.BLUE, COLORS.BLUE],
            [undefined, undefined, COLORS.BLUE],
            [undefined, undefined, COLORS.BLUE]
        ]
    ],
    T_SHAPE: [
        [
            [undefined, undefined, undefined],
            [undefined, COLORS.PURPLE, undefined],
            [COLORS.PURPLE, COLORS.PURPLE, COLORS.PURPLE]
        ],
        [
            [COLORS.PURPLE, undefined, undefined],
            [COLORS.PURPLE, COLORS.PURPLE, undefined],
            [COLORS.PURPLE, undefined, undefined]
        ],
        [
            [COLORS.PURPLE, COLORS.PURPLE, COLORS.PURPLE],
            [undefined, COLORS.PURPLE, undefined],
            [undefined, undefined, undefined]
        ],
        [
            [undefined, undefined, COLORS.PURPLE],
            [undefined, COLORS.PURPLE, COLORS.PURPLE],
            [undefined, undefined, COLORS.PURPLE]
        ],
    ],
    S_SHAPE: [
        [
            [undefined, COLORS.GREEN, COLORS.GREEN],
            [COLORS.GREEN, COLORS.GREEN, undefined],
            [undefined, undefined, undefined]
        ],
        [
            [undefined, COLORS.GREEN, undefined, undefined],
            [undefined, COLORS.GREEN, COLORS.GREEN, undefined],
            [undefined, undefined, COLORS.GREEN, undefined]
        ]
    ],
    Z_SHAPE: [
        [
            [COLORS.RED, COLORS.RED, undefined],
            [undefined, COLORS.RED, COLORS.RED],
            [undefined, undefined, undefined]
        ],
        [
            [undefined, undefined, COLORS.RED, undefined],
            [undefined, COLORS.RED, COLORS.RED, undefined],
            [undefined, COLORS.RED, undefined, undefined]
        ]
    ],
    TYPES: [
        "BLOCK", "STRAIGHT", "L_SHAPE", "J_SHAPE", 
        "T_SHAPE", "S_SHAPE", "Z_SHAPE"
    ]
};