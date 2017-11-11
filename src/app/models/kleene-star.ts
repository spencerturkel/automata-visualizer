export type KleeneStar<T extends string> = '' | { val: T, rest: KleeneStar<T> };
