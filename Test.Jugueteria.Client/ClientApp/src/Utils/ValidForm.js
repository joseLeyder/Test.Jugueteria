
export default class ValidForm {
    cleanErrors = (errors) => {
        Object.keys(errors).forEach(function (key) {
            let keyE = key.charAt(0).toLowerCase() + key.slice(1);
            if (!Array.isArray(errors[keyE])) {
                errors[keyE] = "";
            }
            else {
                errors[keyE].map(selectArray0 => {
                    Object.keys(selectArray0).forEach(function (keyArray0) {
                        let keyEArray0 = keyArray0.charAt(0).toLowerCase() + keyArray0.slice(1);
                        if (!Array.isArray(errors[keyE][keyArray0])) {
                            errors[keyE][keyEArray0] = ""
                        }
                        else {
                            errors[keyE][keyArray0].map(selectArray1 => {
                                Object.keys(selectArray1).forEach(function (keyArray1) {
                                    let keyEArray1 = keyArray1.charAt(0).toLowerCase() + keyArray1.slice(1);
                                    errors[keyE][keyArray0][keyEArray1] = ""
                                });
                                return null;
                            });
                        }
                    });
                    return null;
                });
            }
        });
        return errors;
    }
    resetObject = (fields) => {
        for (var key in fields) {
            if (fields.hasOwnProperty(key)) {
                switch (typeof (fields[key])) {
                    case 'number':
                        fields[key] = 0;
                        break;
                    case 'string':
                        fields[key] = '';
                        break;
                    case 'boolean':
                        fields[key] = false;
                        break;
                    case 'object':
                        fields[key] = this.resetObject(fields[key]);
                        break;
                    default:
                }
            }
        }
        return fields;
    }
    displayErrors = (errorsApi, errors) => {
        console.log(errorsApi);
        let errorsText = '';
        let keyClean1 = ''
        let keyClean2 = ''
        let regex = /\[.+?]/g;
        Object.keys(errorsApi).forEach(function (key) {
            errorsText = '';
            keyClean1 = ''
            regex = /\[.+?]/g;
            let match = regex.exec(key);

            if (match === null) {
                keyClean1 = key.charAt(0).toLowerCase() + key.slice(1);
                Object.keys(errorsApi[key]).forEach(function (key2) {
                    errorsText += errorsApi[key][key2];
                });
                errors[keyClean1] = errorsText;
            }
            else {
                keyClean1 = key.substring(0, key.indexOf(match[0]));
                keyClean2 = key.substring((keyClean1.length + match[0].length + 1), key.length);

                keyClean1 = keyClean1.charAt(0).toLowerCase() + keyClean1.slice(1);
                let index = parseInt(match[0].replace('[', '').replace(']', ''));
                keyClean2 = keyClean2.charAt(0).toLowerCase() + keyClean2.slice(1);

                Object.keys(errorsApi[key]).forEach(function (key2) {
                    errorsText += errorsApi[key][key2];
                });
                console.log(errorsText);
                errors[keyClean1][index][keyClean2] = errorsText;
            }
        });
        return errors;
    }
}