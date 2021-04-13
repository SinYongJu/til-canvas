class InnerSects {
  constructor() {
    this.memo = {};
  }
  compare(line1, line2) {
    console.log(line1, line2);
    let dir = line1.gradient - line2.gradient;
    let k = line2.b - line1.b;
    let x = 0;

    if (k !== 0) {
      x = Math.round(k / dir);
      console.log(x);
    }
    if (line1.isIntercept || line2.isIntercept) {
      if (line1.isInterceptX || line2.isInterceptX) {
        x = 0;
      }
      if (line1.isInterceptY || line2.isInterceptY) {
        // let y = line1.start.y || line1.end.y;
        // x = Math.round((-y - k) / dir);
      }
    }

    let y = dir * x + k;

    console.log(x, y);

    let memo1 = this.getMemoXPoint(line1);
    let memo2 = this.getMemoXPoint(line2);

    // if (!memo2[x]) {
    //   console.log("메모 2 없음 ");
    //   return memo1[x];
    // }
    // if (!memo1[x]) {
    //   console.log("메모 1 없음 ");
    //   return memo2[x];
    // }
    // let y = Math.min(memo1[x].y, memo2[x].y);

    // if (y === memo1[x].y) return memo1[x];
    // if (y === memo2[x].y) return memo2[x];

    return null;
  }

  getMemoXPoint(line) {
    let memo = [];
    for (let i = 0; i < line.points.length; i++) {
      memo[line.points[i].x] = line.points[i];
    }
    return memo;
  }
}

export default InnerSects;
