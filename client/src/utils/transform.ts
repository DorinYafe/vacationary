export const updateObject = (oldObject: object, updatedProperties: any) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};
