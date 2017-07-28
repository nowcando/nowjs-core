// tslint:disable-next-line:no-var-requires
const Buffer = require("safe-buffer").Buffer;
const cryptoApi: Crypto = crypto  ||  (window && (  window.crypto || window.msCrypto));

export  function randomBytes(size: number, cb?: (err: Error, bytes: any ) => void): any {
    if (!(cryptoApi && cryptoApi.getRandomValues)) {
        throw new Error("Crypto api does not supprted .");
    }
    // tslint:disable-next-line:curly
    if (size > 65536) throw new Error("requested too many random bytes");
    const rawBytes = new Uint8Array(size);
    if (size > 0) {  // getRandomValues fails on IE if size == 0
      crypto.getRandomValues(rawBytes);
      const bytes = Buffer.from(rawBytes.buffer);
      if (typeof cb === "function") {
       // tslint:disable-next-line:only-arrow-functions
        return process.nextTick(function() {
            cb(null, bytes);
        });
        }
      return bytes;
    }
}
