export type KleeneStar<T extends string> = '' | { val: T, rest: KleeneStar<T> };

export const toKleeneStar = <T extends string>(value: T | ''): KleeneStar<T> => {
    if (value === '') {
        return value;
    }

    return {
        val: value[0] as T,
        rest: toKleeneStar(value.slice(1) as T),
    };
};

export const fromKleeneStar = <T extends string>(star: KleeneStar<T>): T | '' => {
    if (star === '') {
        return '';
    }

    return (star.val as string + fromKleeneStar(star.rest) as string) as T | '';
};
