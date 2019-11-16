export const FIELD_SIZE = 15;
export const GLIDER_SIZE = 3;

export const GLIDER_STATES = [
  // ordered glider states
  [
    [true, false, true],
    [false, true, true],
    [false, true, false]
  ],
  [
    [false, false, true],
    [true, false, true],
    [false, true, true]
  ],
  [
    [true, false, false],
    [false, true, true],
    [true, true, false]
  ],
  [
    [false, true, false],
    [false, false, true],
    [true, true, true]
  ]
];

export const NEIGHBOURS = [
  {
    x: -1,
    y: 1
  },
  {
    x: 0,
    y: 1
  },
  {
    x: 1,
    y: 1
  },
  {
    x: 1,
    y: 0
  },
  {
    x: 1,
    y: -1
  },
  {
    x: 0,
    y: -1
  },
  {
    x: -1,
    y: -1
  },
  {
    x: -1,
    y: 0
  },
]