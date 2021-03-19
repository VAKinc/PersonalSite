/* This file contains various translation functions */

import { englishStrings } from './translations/en';

/**
 * @param {string} str - The string to be translated
 */
export function getTranslation(str) {
    if(englishStrings.hasOwnProperty(str)){
        return englishStrings[str];
    }
    else{
        return null;
    }
}