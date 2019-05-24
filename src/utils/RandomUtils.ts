
const randomBytes = (length: number) => {

    if (window.crypto || (window as any).msCrypto) {
      const r = new Uint32Array(length);
      window.crypto.getRandomValues(r);
      return r;
    }  else {
      if (process && process.env) {
        const crypto =  require("crypto");
        return crypto.randomBytes(length);
      } else {
        const r: number[] = [];
        for (let ix = 0; ix < length; ix++) {
          r.push(Math.floor(Math.random() * 255));
        }
        return r;
      }
    }
  };
export function secureMathRandom() {
    // Divide a random UInt32 by the maximum value (2^32 -1) to get a result between 0 and 1
    return randomBytes(1)[0] / 4294967295;
}
