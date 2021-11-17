export function calc(num) {
  let str = num.toString();
  switch (str.length) {
    case 1:
    case 2:
    case 3:
    case 4:
      return num;
    case 5:
      return str.slice(0, 2) + "." + str[2] + "K";
    case 6:
      return str.slice(0, 3) + "." + str[3] + "K";
    case 7:
      return str.slice(0, 1) + "." + str[1] + "M";
    case 8:
      return str.slice(0, 2) + "." + str[2] + "M";
    case 9:
      return str.slice(0, 3) + "." + str[3] + "M";
    default:
      return num;
  }
}
