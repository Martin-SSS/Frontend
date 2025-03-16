import { useObjectClient } from "../context/object-client";

export const useWorkerDataObject = () => {
    const { data, getItem, setItem } = useObjectClient();

    const createProxy = (target: any, path: string[] = []): any => {
        return new Proxy(target, {
            set(obj, prop: string, value) {
                const newPath = [...path, prop];
                const fullPath = newPath.join('.');
                console.log('setting', fullPath, value)
                setItem(fullPath, value)
                return true;
            },
            get(obj, prop: string | symbol) {
                // Handle special cases for JSON.stringify and other built-in methods
                if (prop === 'toJSON' || typeof prop === 'symbol') {
                    return Reflect.get(obj, prop);
                }

                if (!obj.hasOwnProperty(prop)) {
                    throw new Error(`Property '${prop}' does not exist on object at path '${path.join('.')}'`);
                }
                console.log('getting', prop, "from ", obj, "at", path)
                // Handle nested objects by returning a new proxy
                if (obj[prop] && typeof obj[prop] === 'object' && !Array.isArray(obj[prop])) {
                    console.log('returning proxy at ', [...path, prop])
                    return createProxy(obj[prop], [...path, prop]);
                }
                return obj[prop] ?? getItem([...path, prop].join('.'));
            }
        });
    };

    return createProxy(data);
};