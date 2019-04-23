// For reference: start of resistor-color.js
// 
// export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
//
// export const colorCode = (color) => COLORS.indexOf(color);
//
// end of resistor-color.js

import { colorCode } from '../resistor-color/resistor-color.js';

export const value = ([color1, color2]) => colorCode(color1) * 10 + colorCode(color2) 
