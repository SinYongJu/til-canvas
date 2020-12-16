export function log(txt = "lof") {
  console.log(txt);
}

export function map(value, s1, e1, s2, e2) {
  let d = value / (e1 - s1);

  let result = s2 + `(e2 - s2)` * d;
  return result;
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
