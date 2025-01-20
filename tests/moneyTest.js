import { getPrice } from "../scripts/utils/money.js";

console.log('Test Suite: Converting Cents -> Dollars')

console.log('Testing conversion of cents to dollars')

if (getPrice(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('Testing conversion of 0 to dollars')

if (getPrice(0) === '0.00') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('Testing rounding up of cents to dollars')

if (getPrice(2000.5) === '20.01') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('Testing rounding down of cents to dollars')

if (getPrice(2000.4) === '20.00') {
    console.log('passed');
} else {
    console.log('failed');
}