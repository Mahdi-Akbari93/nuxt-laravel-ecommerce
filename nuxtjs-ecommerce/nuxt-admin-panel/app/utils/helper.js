const numberFormat = (number) => {
  return new Intl.NumberFormat().format(number);
};


const statusClass = (status) => {
  const value = String(status ?? "");
  if (/(ناموفق|غیرفعال|fail|cancel|reject)/i.test(value)) return "failed";
  if (/(موفق|فعال|پرداخت شده|تحویل|success|paid|delivered|complete)/i.test(value)) return "success";
  return "pending";
};


const errorText = (error) => {
  const messages = error?.data?.data?.message;
  return messages ? Object.values(messages).flat().join(" - ") : null;
};


export { numberFormat , statusClass , errorText };
