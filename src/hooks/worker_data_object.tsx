import { useObjectClient } from "../context/object-client";

export const useWorkerDataObject = () => {
    const { data, getItem, setItem } = useObjectClient();

    const createProxy = (target: any, path: string[] = []): any => {
        return new Proxy(target, {
            set(obj, prop: string, value) {
                const newPath = [...path, prop];
                const fullPath = newPath.join('.');

                // Handle nested objects by creating new proxies
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    obj[prop] = createProxy({}, newPath);
                    // Recursively set all properties of the nested object
                    Object.entries(value).forEach(([key, val]) => {
                        obj[prop][key] = val;
                    });
                } else {
                    obj[prop] = value;
                    setItem(fullPath, value);
                }
                return true;
            },
            get(obj, prop: string) {
                // Handle nested objects by returning a new proxy
                if (obj[prop] && typeof obj[prop] === 'object' && !Array.isArray(obj[prop])) {
                    return createProxy(obj[prop], [...path, prop]);
                }
                return obj[prop] ?? getItem([...path, prop].join('.'));
            }
        });
    };

    return createProxy(data);
};