export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>
}

export const getOptionalParamsFunc = <T extends (...args: any) => any>(
    func: T
) =>
    func as unknown as (
        e?: Partial<Parameters<T>[0]>,
        c?: Partial<Parameters<T>[1]>,
        cb?: Partial<Parameters<T>[2]>
    ) => ReturnType<T>
