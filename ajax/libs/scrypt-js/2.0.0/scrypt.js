"use strict";

(function(root) {
    var MAX_VALUE = 0x7fffffff;

    // The SHA256 and PBKDF2 implementation are from scrypt-async-js:
    // See: https://github.com/dchest/scrypt-async-js
    function SHA256(m) {
        var K = [
           0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
           0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
           0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
           0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
           0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152,
           0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
           0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc,
           0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
           0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
           0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
           0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f,
           0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
           0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
       ];

        var h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
        var h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
        var w = new Array(64);

        function blocks(p) {
            var off = 0, len = p.length;
            while (len >= 64) {
                var a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7, u, i, j, t1, t2;

                for (i = 0; i < 16; i++) {
                    j = off + i*4;
                    w[i] = ((p[j] & 0xff)<<24) | ((p[j+1] & 0xff)<<16) |
                    ((p[j+2] & 0xff)<<8) | (p[j+3] & 0xff);
                }

                for (i = 16; i < 64; i++) {
                    u = w[i-2];
                    t1 = ((u>>>17) | (u<<(32-17))) ^ ((u>>>19) | (u<<(32-19))) ^ (u>>>10);

                    u = w[i-15];
                    t2 = ((u>>>7) | (u<<(32-7))) ^ ((u>>>18) | (u<<(32-18))) ^ (u>>>3);

                    w[i] = (((t1 + w[i-7]) | 0) + ((t2 + w[i-16]) | 0)) | 0;
                }

                for (i = 0; i < 64; i++) {
                    t1 = ((((((e>>>6) | (e<<(32-6))) ^ ((e>>>11) | (e<<(32-11))) ^
                             ((e>>>25) | (e<<(32-25)))) + ((e & f) ^ (~e & g))) | 0) +
                          ((h + ((K[i] + w[i]) | 0)) | 0)) | 0;

                    t2 = ((((a>>>2) | (a<<(32-2))) ^ ((a>>>13) | (a<<(32-13))) ^
                           ((a>>>22) | (a<<(32-22)))) + ((a & b) ^ (a & c) ^ (b & c))) | 0;

                    h = g;
                    g = f;
                    f = e;
                    e = (d + t1) | 0;
                    d = c;
                    c = b;
                    b = a;
                    a = (t1 + t2) | 0;
                }

                h0 = (h0 + a) | 0;
                h1 = (h1 + b) | 0;
                h2 = (h2 + c) | 0;
                h3 = (h3 + d) | 0;
                h4 = (h4 + e) | 0;
                h5 = (h5 + f) | 0;
                h6 = (h6 + g) | 0;
                h7 = (h7 + h) | 0;

                off += 64;
                len -= 64;
            }
        }

        blocks(m);

        var i, bytesLeft = m.length % 64,
        bitLenHi = (m.length / 0x20000000) | 0,
        bitLenLo = m.length << 3,
        numZeros = (bytesLeft < 56) ? 56 : 120,
        p = m.slice(m.length - bytesLeft, m.length);

        p.push(0x80);
        for (i = bytesLeft + 1; i < numZeros; i++) { p.push(0); }
        p.push((bitLenHi>>>24) & 0xff);
        p.push((bitLenHi>>>16) & 0xff);
        p.push((bitLenHi>>>8)  & 0xff);
        p.push((bitLenHi>>>0)  & 0xff);
        p.push((bitLenLo>>>24) & 0xff);
        p.push((bitLenLo>>>16) & 0xff);
        p.push((bitLenLo>>>8)  & 0xff);
        p.push((bitLenLo>>>0)  & 0xff);

        blocks(p);

        return [
            (h0>>>24) & 0xff, (h0>>>16) & 0xff, (h0>>>8) & 0xff, (h0>>>0) & 0xff,
            (h1>>>24) & 0xff, (h1>>>16) & 0xff, (h1>>>8) & 0xff, (h1>>>0) & 0xff,
            (h2>>>24) & 0xff, (h2>>>16) & 0xff, (h2>>>8) & 0xff, (h2>>>0) & 0xff,
            (h3>>>24) & 0xff, (h3>>>16) & 0xff, (h3>>>8) & 0xff, (h3>>>0) & 0xff,
            (h4>>>24) & 0xff, (h4>>>16) & 0xff, (h4>>>8) & 0xff, (h4>>>0) & 0xff,
            (h5>>>24) & 0xff, (h5>>>16) & 0xff, (h5>>>8) & 0xff, (h5>>>0) & 0xff,
            (h6>>>24) & 0xff, (h6>>>16) & 0xff, (h6>>>8) & 0xff, (h6>>>0) & 0xff,
            (h7>>>24) & 0xff, (h7>>>16) & 0xff, (h7>>>8) & 0xff, (h7>>>0) & 0xff
        ];
    }

    function PBKDF2_HMAC_SHA256_OneIter(password, salt, dkLen) {
        // compress password if it's longer than hash block length
        password = password.length <= 64 ? password : SHA256(password);

        var i;
        var innerLen = 64 + salt.length + 4;
        var inner = new Array(innerLen);
        var outerKey = new Array(64);
        var dk = [];

        // inner = (password ^ ipad) || salt || counter
        for (i = 0; i < 64; i++) inner[i] = 0x36;
        for (i = 0; i < password.length; i++) inner[i] ^= password[i];
        for (i = 0; i < salt.length; i++) inner[64+i] = salt[i];
        for (i = innerLen - 4; i < innerLen; i++) inner[i] = 0;

        // outerKey = password ^ opad
        for (i = 0; i < 64; i++) outerKey[i] = 0x5c;
        for (i = 0; i < password.length; i++) outerKey[i] ^= password[i];

        // increments counter inside inner
        function incrementCounter() {
            for (var i = innerLen-1; i >= innerLen-4; i--) {
                inner[i]++;
                if (inner[i] <= 0xff) return;
                inner[i] = 0;
            }
        }

        // output blocks = SHA256(outerKey || SHA256(inner)) ...
        while (dkLen >= 32) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))));
            dkLen -= 32;
        }
        if (dkLen > 0) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))).slice(0, dkLen));
        }

        return dk;
        //return new Buffer(dk);
    }

    // The following is an adaptation of scryptsy
    // See: https://www.npmjs.com/package/scryptsy
    function blockmix_salsa8(BY, Yi, r, x, _X) {
        var i;

        arraycopy(BY, (2 * r - 1) * 16, _X, 0, 16);
        for (i = 0; i < 2 * r; i++) {
            blockxor(BY, i * 16, _X, 16);
            salsa20_8(_X, x);
            arraycopy(_X, 0, BY, Yi + (i * 16), 16);
        }

        for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + (i * 2) * 16, BY, (i * 16), 16);
        }

        for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + (i * 2 + 1) * 16, BY, (i + r) * 16, 16);
        }
    }

    function R(a, b) {
        return (a << b) | (a >>> (32 - b));
    }

    function salsa20_8(B, x) {
        arraycopy(B, 0, x, 0, 16);

        for (var i = 8; i > 0; i -= 2) {
            x[ 4] ^= R(x[ 0] + x[12], 7);
            x[ 8] ^= R(x[ 4] + x[ 0], 9);
            x[12] ^= R(x[ 8] + x[ 4], 13);
            x[ 0] ^= R(x[12] + x[ 8], 18);
            x[ 9] ^= R(x[ 5] + x[ 1], 7);
            x[13] ^= R(x[ 9] + x[ 5], 9);
            x[ 1] ^= R(x[13] + x[ 9], 13);
            x[ 5] ^= R(x[ 1] + x[13], 18);
            x[14] ^= R(x[10] + x[ 6], 7);
            x[ 2] ^= R(x[14] + x[10], 9);
            x[ 6] ^= R(x[ 2] + x[14], 13);
            x[10] ^= R(x[ 6] + x[ 2], 18);
            x[ 3] ^= R(x[15] + x[11], 7);
            x[ 7] ^= R(x[ 3] + x[15], 9);
            x[11] ^= R(x[ 7] + x[ 3], 13);
            x[15] ^= R(x[11] + x[ 7], 18);
            x[ 1] ^= R(x[ 0] + x[ 3], 7);
            x[ 2] ^= R(x[ 1] + x[ 0], 9);
            x[ 3] ^= R(x[ 2] + x[ 1], 13);
            x[ 0] ^= R(x[ 3] + x[ 2], 18);
            x[ 6] ^= R(x[ 5] + x[ 4], 7);
            x[ 7] ^= R(x[ 6] + x[ 5], 9);
            x[ 4] ^= R(x[ 7] + x[ 6], 13);
            x[ 5] ^= R(x[ 4] + x[ 7], 18);
            x[11] ^= R(x[10] + x[ 9], 7);
            x[ 8] ^= R(x[11] + x[10], 9);
            x[ 9] ^= R(x[ 8] + x[11], 13);
            x[10] ^= R(x[ 9] + x[ 8], 18);
            x[12] ^= R(x[15] + x[14], 7);
            x[13] ^= R(x[12] + x[15], 9);
            x[14] ^= R(x[13] + x[12], 13);
            x[15] ^= R(x[14] + x[13], 18);
        }

        for (i = 0; i < 16; ++i) {
            B[i] += x[i];
        }
    }

    // naive approach... going back to loop unrolling may yield additional performance
    function blockxor(S, Si, D, len) {
        for (var i = 0; i < len; i++) {
            D[i] ^= S[Si + i]
        }
    }

    function arraycopy(src, srcPos, dest, destPos, length) {
        while (length--) {
            dest[destPos++] = src[srcPos++];
        }
    }

    function checkBufferish(o) {
        if (!o || typeof(o.length) !== 'number') {
            return false;
        }
        for (var i = 0; i < o.length; i++) {
            if (typeof(o[i]) !== 'number') { return false; }

            var v = parseInt(o[i]);
            if (v != o[i] || v < 0 || v >= 256) {
                return false;
            }
        }
        return true;
    }


    // N = Cpu cost, r = Memory cost, p = parallelization cost
    // callback(error, progress, key)
    function scrypt(password, salt, N, r, p, dkLen, callback) {

        if (!callback) { throw new Error('missing callback'); }

        if (N === 0 || (N & (N - 1)) !== 0) { throw new Error('N must be power of 2'); }

        if (N > MAX_VALUE / 128 / r) { throw new Error('N too large'); }
        if (r > MAX_VALUE / 128 / p) { throw new Error('r too large'); }

        if (!checkBufferish(password)) {
            throw new Error('password must be an array or buffer');
        }

        if (!checkBufferish(salt)) {
            throw new Error('salt must be an array or buffer');
        }
        password = new Buffer(password);
        salt = new Buffer(salt);

        var b = PBKDF2_HMAC_SHA256_OneIter(password, salt, p * 128 * r);
        var B = new Uint32Array(p * 32 * r)
        for (var i = 0; i < B.length; i++) {
            var j = i * 4;
            B[i] = ((b[j + 3] & 0xff) << 24) |
                   ((b[j + 2] & 0xff) << 16) |
                   ((b[j + 1] & 0xff) << 8) |
                   ((b[j + 0] & 0xff) << 0);
        }

        var XY = new Uint32Array(64 * r);
        var V = new Uint32Array(32 * r * N);

        var Yi = 32 * r;

        // scratch space
        var x = new Uint32Array(16);       // salsa20_8
        var _X = new Uint32Array(16);      // blockmix_salsa8

        var totalOps = p * N * 2;
        var currentOp = 0;
        var lastPercent10 = null;

        // Set this to true to abandon the scrypt on the next step
        var stop = false;

        // State information
        var state = 0;
        var i0 = 0, i1;
        var Bi;

        // How many blockmix_salsa8 can we do per step?
        var limit = parseInt(1000 / r);

        // Trick from scrypt-async; if there is a setImmediate shim in place, use it
        var nextTick = (typeof(setImmediate) !== 'undefined') ? setImmediate : setTimeout;

        // This is really all I changed; making scryptsy a state machine so we occasionally
        // stop and give other evnts on the evnt loop a chance to run. ~RicMoo
        var incrementalSMix = function() {
            if (stop) {
                return callback(new Error('cancelled'), currentOp / totalOps);
            }

            switch (state) {
                case 0:
                    // for (var i = 0; i < p; i++)...
                    Bi = i0 * 32 * r;

                    arraycopy(B, Bi, XY, 0, Yi);                       // ROMix - 1

                    state = 1;                                         // Move to ROMix 2
                    i1 = 0;

                    // Fall through

                case 1:

                    // Run up to 1000 steps of the first inner smix loop
                    var steps = N - i1;
                    if (steps > limit) { steps = limit; }
                    for (var i = 0; i < steps; i++) {                  // ROMix - 2
                        arraycopy(XY, 0, V, (i1 + i) * Yi, Yi)         // ROMix - 3
                        blockmix_salsa8(XY, Yi, r, x, _X);             // ROMix - 4
                    }

                    // for (var i = 0; i < N; i++)
                    i1 += steps;
                    currentOp += steps;

                    // Call the callback with the progress (optionally stopping us)
                    var percent10 = parseInt(1000 * currentOp / totalOps);
                    if (percent10 !== lastPercent10) {
                        stop = callback(null, currentOp / totalOps);
                        if (stop) { break; }
                        lastPercent10 = percent10;
                    }

                    if (i1 < N) {
                        break;
                    }

                    i1 = 0;                                          // Move to ROMix 6
                    state = 2;

                    // Fall through

                case 2:

                    // Run up to 1000 steps of the second inner smix loop
                    var steps = N - i1;
                    if (steps > limit) { steps = limit; }
                    for (var i = 0; i < steps; i++) {                // ROMix - 6
                        var offset = (2 * r - 1) * 16;               // ROMix - 7
                        var j = XY[offset] & (N - 1);
                        blockxor(V, j * Yi, XY, Yi);                 // ROMix - 8 (inner)
                        blockmix_salsa8(XY, Yi, r, x, _X);           // ROMix - 9 (outer)
                    }

                    // for (var i = 0; i < N; i++)...
                    i1 += steps;
                    currentOp += steps;

                    // Call the callback with the progress (optionally stopping us)
                    var percent10 = parseInt(1000 * currentOp / totalOps);
                    if (percent10 !== lastPercent10) {
                        stop = callback(null, currentOp / totalOps);
                        if (stop) { break; }
                        lastPercent10 = percent10;
                    }

                    if (i1 < N) {
                        break;
                    }

                    arraycopy(XY, 0, B, Bi, Yi);                     // ROMix - 10

                    // for (var i = 0; i < p; i++)...
                    i0++;
                    if (i0 < p) {
                        state = 0;
                        break;
                    }

                    b = [];
                    for (var i = 0; i < B.length; i++) {
                        b.push((B[i] >>  0) & 0xff);
                        b.push((B[i] >>  8) & 0xff);
                        b.push((B[i] >> 16) & 0xff);
                        b.push((B[i] >> 24) & 0xff);
                    }

                    var derivedKey = PBKDF2_HMAC_SHA256_OneIter(password, b, dkLen);
                    //if (typeof(Buffer) !== 'undefined') {
                    //    derivedKey = new Buffer(derivedKey);
                    //}

                    // Done; don't break (which would reschedule)
                    return callback(null, 1.0, derivedKey);
                }

                // Schedule the next steps
                nextTick(incrementalSMix);
            }

            // Bootstrap the incremental smix
            incrementalSMix();
    }

    // node.js
    if (typeof(exports) !== 'undefined') {
       module.exports = scrypt;

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else if (typeof(define) === 'function' && define.amd) {
        define(scrypt);

    // Web Browsers
    } else {
        root.scrypt = scrypt;

        // If there was an existing library "scrypt", make sure it is still available
        if (root && root.scrypt) {
            root._scrypt = root.scrypt;
        }
    }

})(this);
