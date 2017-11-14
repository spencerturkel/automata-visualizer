// declare function deepmerge<T>(x: Partial<T>, y: Partial<T>, options?: deepmerge.Options): T;
// declare function deepmerge<T1, T2>(x: T1, y: T2, options?: deepmerge.Options): T1 & T2;
//
// declare namespace deepmerge {
//     interface Options {
//         clone?: boolean;
//         arrayMerge?(destination: any[], source: any[], options?: Options): any[];
//     }
//
//     function all<T>(objects: Array<Partial<T>>, options?: Options): T;
// }

declare module 'deepmerge' {
    interface Options {
        clone?: boolean;
        arrayMerge?(destination: any[], source: any[], options?: Options): any[];
    }

    function all<T>(objects: Array<Partial<T>>, options?: Options): T;

    function deepmerge<T>(x: Partial<T>, y: Partial<T>, options?: Options): T;
    export default function deepmerge<T1, T2>(x: T1, y: T2, options?: Options): T1 & T2;
}
