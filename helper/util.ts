const isEmpty = function(value: any) {
  if (
    value == "" ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};
const dateParse = (str: string) => {
  const y = str.substring(0, str.indexOf("년"));
  const m = str.substring(str.indexOf("년") + 1, str.indexOf("월"));
  const d = str.substring(str.indexOf("월") + 1, str.indexOf("일"))
  return new Date(Number(y), Number(m)-1, Number(d));
}

export {
  isEmpty,
  dateParse
}