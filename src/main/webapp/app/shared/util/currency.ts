const currencyFormat = (num: number): string => {
  return '$ ' + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export { currencyFormat };
