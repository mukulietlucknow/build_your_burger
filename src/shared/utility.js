export const updateObject = (oldObject , updatedPro) => {
    return{
        ...oldObject,
        ...updatedPro
    }
};

export const checkvalidity = (value , rules) => {
    let isValid = true;
    if(!rules){
        return true;
    }

    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
};