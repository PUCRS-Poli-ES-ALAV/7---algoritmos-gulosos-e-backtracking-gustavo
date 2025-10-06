const coins = [1, 5, 10, 25, 100];


const getPluralizedCent = (n) => n > 1 ? 'cents' : 'cent'

/**
 * 
 * @param {number} value 
 */
const calculateChange = (value) => {

    if(typeof value != 'number') {
        throw new Error('Invalid input');
    }

    if(!value) {
        return ''
    }

    const valueInCents = (value * 1000) / 10;

    const coinSetup = new Map(coins.map((coin) => [coin, 0]));
    let totalChangeInCents = 0;
    
    for(let i = coins.length - 1; i >= 0; i--) {
        const remainingValue = (valueInCents - totalChangeInCents)
        const coin = coins[i];

        if(remainingValue < coin) {
            continue;
        }
        
        const div = Math.trunc(remainingValue / coin)

        if(div > 0) {
            for(let j = 0; j < div; j++) {
                const currentCount = coinSetup.get(coin);
                coinSetup.set(coin, 1 + currentCount);
            }
            totalChangeInCents += div * coin;
        }
    }

    return Array.from(coinSetup.entries()).filter(([_, count]) => !!count).map(([coin, count]) => {
        return `${coin} ${getPluralizedCent(coin)} (${count}x)`
    }).join(' | ')
}

const testCases = [
    [2.89, '1 cent (4x) | 10 cents (1x) | 25 cents (3x) | 100 cents (2x)'],
    [2, '100 cents (2x)'],
    [0.04, '1 cent (4x)'],
    [0, ''],
    [5.10, '10 cents (1x) | 100 cents (5x)']
]

for(const [value, expected] of testCases) {

    const v = calculateChange(value);

    if(v === expected) {
        console.log(`[✅ PASS] Test case for ${value}`);
    } else {
        console.log(`[❌ FAIL] Test case for ${value}. Received ${v}. Expected ${expected}`);
    }
}