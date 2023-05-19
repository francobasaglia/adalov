export type ClassType<T = any, A extends any[] = []> = new (...args: A) => T;

export type NonConstructorKeys<T> = ({ [P in keyof T]: T[P] extends new () => any ? never : P })[keyof T];

export type OmitConstructor<T> = Pick<T, NonConstructorKeys<T>>;
