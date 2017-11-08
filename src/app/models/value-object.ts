export abstract class ValueObject<T> {
    constructor(public readonly payload: T) {
    }
}
