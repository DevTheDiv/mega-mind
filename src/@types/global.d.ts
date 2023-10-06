type bitwidth = 8 | 16 | 32 | 64;

type _int8 = number;
type _int16 = number;
type _int32 = number;
type _int64 = number;

type _uint8 = number;
type _uint16 = number;
type _uint32 = number;
type _uint64 = number;

type int<T extends bitwidth> = T extends 8
  ? _int8
  : T extends 16
  ? _int16
  : T extends 32
  ? _int32
  : T extends 64
  ? _int64
  : never;

type uint<T extends bitwidth> = T extends 8
    ? _uint8
    : T extends 16
    ? _uint16
    : T extends 32
    ? _uint32
    : T extends 64
    ? _uint64
    : never;

  declare module 'cli-html';
  declare module 'ink';