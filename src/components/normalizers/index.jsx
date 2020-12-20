export const maxLength = (otherValue) => (value, previousValue) => {
    return value && value.length > otherValue ? previousValue : value;
};

export const numbers = () => (value, previousValue) => {
    return value && (isNaN(value) || value.indexOf('.') !== -1) ? previousValue : value;
};

export const positiveIntegers = () => (value, previousValue) => {
    return value && (isNaN(value) || value === '0' || value.indexOf('.') !== -1) ? previousValue : value;
};

export const positiveFloats = (args) => (value, previousValue) => {
    let wholePart = args.fieldProps.wholePart || 3;
    let fractionPart = args.fieldProps.fractionPart || 2;
    return value && (isNaN(value) || value === '0' || value.indexOf('.') > wholePart || 
                        (value.indexOf('.') === -1 && value.length > wholePart) || 
                        (value.indexOf('.') !== -1 && (value.length - value.indexOf('.')) > fractionPart + 1)) 
                        ? previousValue : value;
};

export const alphabet = () => (value, previousValue) => {
    if (value.match(/[!"#$%&'*+\,\-\.:;<=>?@{}_`^~|[\]\(\)\\\/]+/) || value.match(/[0-9]+/)) {
        return previousValue;
    }

    return value;
};


export const maxWord = (args) => (value, previousValue) => {
    let defaultWord = args.fieldProps.maxWord || undefined;
    let word = value ? value.split(' ').filter((v) => { 
        return v != '' 
    }) : [];
    if (word.length > defaultWord) {
        return word.slice(0,defaultWord).join(' ');
    }
    if (word.length === defaultWord && value.slice(-1) === ' ') {
        return previousValue;
    }
    return value;
};