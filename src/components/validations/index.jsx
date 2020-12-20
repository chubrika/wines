import { isEmpty } from 'lodash';


export const required = (caption, args) => (value) => {
    if(!value){
        return  args.message ? args.message : 'err';
    }
}

export const maxLength = (caption, args) => value => {
    if (value && value.length > args.max) {
        return args.message ? args.message : `${caption}.`;
    }
}

export const minLength = (caption, args) => value => {
    if (value && value.length < args.min) {
        return args.message ? args.message : `${caption}.`;
    }
}

export const number = (caption, args) => value => {
    if (value && isNaN(Number(value))) {
        return args.message ? args.message : `${caption}.`;
    }
}

export const minValue = (caption, args) => value => {
    if ((value || parseFloat(value) === 0) && value < args.min) {
        return args.message ? args.message : `${caption}.`;
    }
}

export const maxValue = (caption, args) => value => {
    if ((value || parseFloat(value) === 0) && value > args.max) {
        return args.message ? args.message : `${caption}.`;
    }
}

export const email = (caption, args) => value => { 
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        return args.message ? args.message : `${caption}.`;
    }
}

export const password = (caption, args) => value => {
    let countGroups = 0;
    if (value && value.length >= 8) {
        if (value.match(/[a-z]+/))
            countGroups++;
        if (value.match(/[A-Z]+/))
            countGroups++;
        if (value.match(/[0-9]+/))
            countGroups++;
        if (value.match(/[!"#$%&'*+\,\-\.:;<=>?@{}_`^~|[\]\(\)\\\/]+/))
            countGroups++;
    }

    return value ? countGroups < 3 ? args.message ? args.message : `${caption}.` : undefined : undefined;

}

export const equality = (caption, args) => (value, allValue) => {
    if (value && value !== allValue[args.equalTo]) {
        return args.message ? args.message : `${caption}.`;
    }
}

export const custom = (caption, validation) => (...args) => {
    return validation.validate(...args);
};

export const age = (caption, args) => value => {
    let birthday = new Date(value);
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs);
    let result = Math.abs(ageDate.getUTCFullYear() - 1970);

    return result >= 18 ? false : true;
}

export const update = (caption, args) => (value, allValue) => {
    if(!isEmpty(allValue[args.filled]) && isEmpty(value)) {
        return args.message ? args.message : `${caption}.`;
    }
}