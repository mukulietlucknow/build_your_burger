export const updateObject = (oldObject , updatedPro) => {
    return{
        ...oldObject,
        ...updatedPro
    }
};