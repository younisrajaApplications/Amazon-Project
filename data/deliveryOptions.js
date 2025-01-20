export function getDeliveryCost(deliveryID) {
    let cost = 0;
    deliveryOptions.forEach((option) => {
        if (deliveryID === option.id) {
            cost = option.priceCents;
        }
    });
    return cost;
}

export const deliveryOptions = [{
    id : 1,
    days : 7,
    priceCents : 0
}, {
    id : 2,
    days : 3,
    priceCents : 499
}, {
    id : 3,
    days : 1,
    priceCents : 999
}];