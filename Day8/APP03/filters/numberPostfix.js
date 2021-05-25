angular.module("myProperApp").filter("order", numberOrder);

function numberOrder() {
  return function (value) {
    if (value && !isNaN(value)) {
      const digit = value % 10;
      let suffix = "";
      switch (digit) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
        default:
          suffix = "th";
          break;
      }
      return value + suffix;
    }
    return value;
  };
}
