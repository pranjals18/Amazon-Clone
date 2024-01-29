
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function getDeliveryOption(deliveryOptionId) {
  let option;

  deliveryOptions.forEach((deliveryOption) => {
    if(deliveryOption.id === deliveryOptionId)
      option = deliveryOption;
  });

  return option;
}
export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  let cnt = 0;
  let day = 1;

  let deliveryDate;
  while(cnt < deliveryOption.deliveryDays) {
    deliveryDate = today.add(day, 'days');
    if(deliveryDate.day() !== 0 && deliveryDate.day() !== 6) {
      cnt++;
    }
    day++;
  }
  const dateString = deliveryDate.format('dddd, MMMM D');
  
  return dateString;
}

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];
