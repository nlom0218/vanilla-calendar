const format = {
  date: (date: Date, delimiter?: '-' | '.') => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (!delimiter) return `${year}년 ${month}월 ${day}일`;

    return `${year}${delimiter}${month < 10 ? `0${month}` : month}${delimiter}${
      day < 10 ? `0${day}` : day
    }`;
  },
};

export default format;
