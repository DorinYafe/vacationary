interface IStorage {
    setItem: (value: string) => void,
    getItem: () => string | null,
    isExists: () => boolean,
}

export function initByKey(key: string): IStorage {

    function setItem(value: string): void {
        localStorage.setItem(key, value)
    }

    function getItem(): string | null {
        return localStorage.getItem(key)
    }

    function isExists(): boolean {
        return getItem() != null
    }

    return {
        setItem,
        getItem,
        isExists,
    }
}

const tokenStorage: IStorage = initByKey('token')

export { tokenStorage, }