import { randomBytes } from './RandomUtils';

// tslint:disable:no-bitwise
// tslint:disable:variable-name

function f(s: any, x: any, y: any, z: any) {
    switch (s) {
        case 0:
            return (x & y) ^ (~x & z);
        case 1:
            return x ^ y ^ z;
        case 2:
            return (x & y) ^ (x & z) ^ (y & z);
        case 3:
            return x ^ y ^ z;
    }
}

function ROTL(x: any, n: any) {
    return (x << n) | (x >>> (32 - n));
}

function sha1(bytes: any) {
    const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
    const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

    if (typeof bytes === 'string') {
        const msg = decodeURIComponent(encodeURIComponent(bytes)); // UTF8 escape
        bytes = new Array(msg.length);
        // tslint:disable-next-line:no-shadowed-variable
        for (let i = 0; i < msg.length; i++) {
            bytes[i] = msg.charCodeAt(i);
        }
    }

    bytes.push(0x80);

    const l = bytes.length / 4 + 2;
    const N = Math.ceil(l / 16);
    const M = new Array(N);

    // tslint:disable-next-line:no-shadowed-variable
    for (let i = 0; i < N; i++) {
        M[i] = new Array(16);
        for (let j = 0; j < 16; j++) {
            M[i][j] =
                (bytes[i * 64 + j * 4] << 24) |
                (bytes[i * 64 + j * 4 + 1] << 16) |
                (bytes[i * 64 + j * 4 + 2] << 8) |
                bytes[i * 64 + j * 4 + 3];
        }
    }

    M[N - 1][14] =
        ((bytes.length - 1) * 8) /
        // tslint:disable:align
        Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = ((bytes.length - 1) * 8) & 0xffffffff;

    // tslint:disable:no-shadowed-variable
    for (let i = 0; i < N; i++) {
        const W = new Array(80);

        // tslint:disable:curly
        for (let t = 0; t < 16; t++) W[t] = M[i][t];
        for (let t = 16; t < 80; t++) {
            W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
        }

        // tslint:disable:one-variable-per-declaration
        let a = H[0],
            b = H[1],
            c = H[2],
            d = H[3],
            e = H[4];

        for (let t = 0; t < 80; t++) {
            const s = Math.floor(t / 20);
            const T = (ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t]) >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
        }

        H[0] = (H[0] + a) >>> 0;
        H[1] = (H[1] + b) >>> 0;
        H[2] = (H[2] + c) >>> 0;
        H[3] = (H[3] + d) >>> 0;
        H[4] = (H[4] + e) >>> 0;
    }

    return [
        (H[0] >> 24) & 0xff,
        (H[0] >> 16) & 0xff,
        (H[0] >> 8) & 0xff,
        H[0] & 0xff,
        (H[1] >> 24) & 0xff,
        (H[1] >> 16) & 0xff,
        (H[1] >> 8) & 0xff,
        H[1] & 0xff,
        (H[2] >> 24) & 0xff,
        (H[2] >> 16) & 0xff,
        (H[2] >> 8) & 0xff,
        H[2] & 0xff,
        (H[3] >> 24) & 0xff,
        (H[3] >> 16) & 0xff,
        (H[3] >> 8) & 0xff,
        H[3] & 0xff,
        (H[4] >> 24) & 0xff,
        (H[4] >> 16) & 0xff,
        (H[4] >> 8) & 0xff,
        H[4] & 0xff,
    ];
}

function rng() {
    return randomBytes(16);
}

const byteToHex: any = [];
for (let i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf: number[], offset?: number) {
    let i = offset || 0;
    const bth = byteToHex;
    return (
        bth[buf[i++]] +
        bth[buf[i++]] +
        bth[buf[i++]] +
        bth[buf[i++]] +
        '-' +
        bth[buf[i++]] +
        bth[buf[i++]] +
        '-' +
        bth[buf[i++]] +
        bth[buf[i++]] +
        '-' +
        bth[buf[i++]] +
        bth[buf[i++]] +
        '-' +
        bth[buf[i++]] +
        bth[buf[i++]] +
        bth[buf[i++]] +
        bth[buf[i++]] +
        bth[buf[i++]] +
        bth[buf[i++]]
    );
}

function v1(options?: any, buf?: any, offset?: number) {
    // **`v1()` - Generate time-based UUID**
    //
    // Inspired by https://github.com/LiosK/UUID.js
    // and http://docs.python.org/library/uuid.html

    // random #'s we need to init node and clockseq
    const _seedBytes = rng();

    // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
    const _nodeId = [_seedBytes[0] | 0x01, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]];

    // Per 4.2.2, randomize (14 bit) clockseq
    let _clockseq = ((_seedBytes[6] << 8) | _seedBytes[7]) & 0x3fff;

    // Previous uuid creation time
    let _lastMSecs = 0,
        _lastNSecs = 0;

    let i = (buf && offset) || 0;
    const b = buf || [];

    options = options || {};

    let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    let msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq === undefined) {
        clockseq = (clockseq + 1) & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = (tl >>> 24) & 0xff;
    b[i++] = (tl >>> 16) & 0xff;
    b[i++] = (tl >>> 8) & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    const tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
    b[i++] = (tmh >>> 8) & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = ((tmh >>> 24) & 0xf) | 0x10; // include version
    b[i++] = (tmh >>> 16) & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = (clockseq >>> 8) | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    const node = options.node || _nodeId;
    for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
    }

    return buf ? buf : bytesToUuid(b);
}

function v4(options?: any, buf?: any, offset?: number) {
    const i = (buf && offset) || 0;

    if (typeof options === 'string') {
        buf = options === 'binary' ? new Array(16) : null;
        options = null;
    }
    options = options || {};

    const rnds = options.random || (options.rng || rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
        for (let ii = 0; ii < 16; ++ii) {
            buf[i + ii] = rnds[ii];
        }
    }

    return buf || bytesToUuid(rnds);
}

function uuidToBytes(uuid: any) {
    // Note: We assume we're being passed a valid uuid string
    const bytes: any = [];
    uuid.replace(/[a-fA-F0-9]{2}/g, (hex: any) => {
        bytes.push(parseInt(hex, 16));
    });

    return bytes;
}

function stringToBytes(str: string) {
    str = decodeURI(encodeURIComponent(str)); // UTF8 escape
    const bytes = new Array(str.length);
    for (let i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}

function v5(name?: any, namespace?: string, buf?: any, offset?: number) {
    const off = (buf && offset) || 0;

    if (typeof name === 'string') name = stringToBytes(name);
    if (typeof namespace === 'string') namespace = uuidToBytes(namespace);

    if (!Array.isArray(name)) throw TypeError('name must be an array of bytes');
    if (!Array.isArray(namespace) || namespace.length !== 16) {
        throw TypeError('namespace must be uuid string or an Array of 16 byte values');
    }
    // Per 4.3
    const bytes = sha1(namespace.concat(name));
    bytes[6] = (bytes[6] & 0x0f) | 0x50;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    if (buf) {
        for (let idx = 0; idx < 16; ++idx) {
            buf[off + idx] = bytes[idx];
        }
    }

    return buf || bytesToUuid(bytes);
}

export function uuid(options?: { version?: 'v1' | 'v4' | 'v5' }): string {
    let version = 'v4';
    // tslint:disable-next-line:no-empty
    if (options) {
        version = options.version || version;
    }
    switch (version) {
        case 'v1':
            return v1();
        case 'v4':
            return v4();
        case 'v5':
            return v5();
        default:
            return v4();
    }
}

export function uuidv1(): string {
    return uuid({ version: 'v1' });
}
export function uuidv4(): string {
    return uuid({ version: 'v4' });
}
export function uuidv5(): string {
    return uuid({ version: 'v5' });
}
