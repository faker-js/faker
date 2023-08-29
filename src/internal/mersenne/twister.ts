/*
 * Copyright (c) 2022-2023 Faker
 *
 * This is a version of the original source code migrated to TypeScript and
 * modified by the Faker team.
 *
 * Check LICENSE for more details on copyright.
 *
 * -----------------------------------------------------------------------------
 *
 * Copyright (c) 2006 Y. Okada
 *
 * This program is a JavaScript version of Mersenne Twister, with concealment
 * and encapsulation in class, an almost straight conversion from the original
 * program, mt19937ar.c, translated by Y. Okada on July 17, 2006, and modified
 * a little at July 20, 2006, but there are not any substantial differences.
 *
 * In this program, procedure descriptions and comments of original source code
 * were not removed.
 *
 * Lines commented with //c// were originally descriptions of c procedure.
 * And a few following lines are appropriate JavaScript descriptions.
 *
 * Lines commented with /* and *\/ are original comments.
 * Lines commented with // are additional comments in this JavaScript version.
 *
 * Before using this version, create at least one instance of
 * MersenneTwister19937 class, and initialize the each state, given below
 * in C comments, of all the instances.
 *
 * -----------------------------------------------------------------------------
 *
 * A C-program for MT19937, with initialization improved 2002/1/26.
 * Coded by Takuji Nishimura and Makoto Matsumoto.
 *
 * Before using, initialize the state by using init_genrand(seed)
 * or init_by_array(init_key, key_length).
 *
 * Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. The names of its contributors may not be used to endorse or promote
 *    products derived from this software without specific prior written
 *    permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
 * OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Any feedback is very welcome.
 *   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
 *   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
 */

const N = 624;
const M = 397;
const MATRIX_A = 0x9908b0df; // constant vector a
const UPPER_MASK = 0x80000000; // most significant w-r bits
const LOWER_MASK = 0x7fffffff; // least significant r bits
// moved outside of genrandInt32() by jwatte 2010-11-17; generate less garbage
const mag01 = [0x0, MATRIX_A];

/**
 * Mersenne Twister 19937 generator.
 *
 * @internal
 */
export default class MersenneTwister19937 {
  private mt: number[] = new Array(N); // the array for the state vector
  private mti = N + 1; // mti==N+1 means mt[N] is not initialized

  /**
   * Returns a 32-bits unsigned integer from an operand to which applied a bit
   * operator.
   *
   * @param n1 number to unsign
   */
  private unsigned32(n1: number): number {
    return n1 < 0 ? (n1 ^ UPPER_MASK) + UPPER_MASK : n1;
  }

  /**
   * Emulates lowerflow of a c 32-bits unsigned integer variable, instead of
   * the operator -. These both arguments must be non-negative integers
   * expressible using unsigned 32 bits.
   *
   * @param n1 dividend
   * @param n2 divisor
   */
  private subtraction32(n1: number, n2: number): number {
    return n1 < n2
      ? this.unsigned32((0x100000000 - (n2 - n1)) & 0xffffffff)
      : n1 - n2;
  }

  /**
   * Emulates overflow of a c 32-bits unsigned integer variable, instead of the operator +.
   * these both arguments must be non-negative integers expressible using unsigned 32 bits.
   *
   * @param n1 number one for addition
   * @param n2 number two for addition
   */
  private addition32(n1: number, n2: number): number {
    return this.unsigned32((n1 + n2) & 0xffffffff);
  }

  /**
   * Emulates overflow of a c 32-bits unsigned integer variable, instead of the operator *.
   * These both arguments must be non-negative integers expressible using unsigned 32 bits.
   *
   * @param n1 number one for multiplication
   * @param n2 number two for multiplication
   */
  private multiplication32(n1: number, n2: number): number {
    let sum = 0;
    for (let i = 0; i < 32; ++i) {
      if ((n1 >>> i) & 0x1) {
        sum = this.addition32(sum, this.unsigned32(n2 << i));
      }
    }

    return sum;
  }

  /**
   * Initializes mt[N] with a seed.
   *
   * @param seed the seed to use
   */
  initGenrand(seed: number): void {
    this.mt[0] = this.unsigned32(seed & 0xffffffff);
    for (this.mti = 1; this.mti < N; this.mti++) {
      this.mt[this.mti] =
        //(1812433253 * (mt[mti-1] ^ (mt[mti-1] >> 30)) + mti);
        this.addition32(
          this.multiplication32(
            1812433253,
            this.unsigned32(
              this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)
            )
          ),
          this.mti
        );

      /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
      /* In the previous versions, MSBs of the seed affect   */
      /* only MSBs of the array mt[].                        */
      /* 2002/01/09 modified by Makoto Matsumoto             */
      this.mt[this.mti] = this.unsigned32(this.mt[this.mti] & 0xffffffff);
    }
  }

  /**
   * Initialize by an array with array-length.
   *
   * @param initKey is the array for initializing keys
   * @param keyLength is its length
   */
  initByArray(initKey: number[], keyLength: number): void {
    this.initGenrand(19650218);
    let i = 1;
    let j = 0;
    let k = N > keyLength ? N : keyLength;
    for (; k; k--) {
      // mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1664525)) + init_key[j] + j;
      this.mt[i] = this.addition32(
        this.addition32(
          this.unsigned32(
            this.mt[i] ^
              this.multiplication32(
                this.unsigned32(this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)),
                1664525
              )
          ),
          initKey[j]
        ),
        j
      );
      // mt[i] &= 0xffffffff; for WORDSIZE > 32 machines
      this.mt[i] = this.unsigned32(this.mt[i] & 0xffffffff);
      i++;
      j++;
      if (i >= N) {
        this.mt[0] = this.mt[N - 1];
        i = 1;
      }

      if (j >= keyLength) {
        j = 0;
      }
    }

    for (k = N - 1; k; k--) {
      // mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1566083941)) - i
      this.mt[i] = this.subtraction32(
        this.unsigned32(
          this.mt[i] ^
            this.multiplication32(
              this.unsigned32(this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)),
              1566083941
            )
        ),
        i
      );
      // mt[i] &= 0xffffffff; for WORDSIZE > 32 machines
      this.mt[i] = this.unsigned32(this.mt[i] & 0xffffffff);
      i++;
      if (i >= N) {
        this.mt[0] = this.mt[N - 1];
        i = 1;
      }
    }

    this.mt[0] = 0x80000000; // MSB is 1; assuring non-zero initial array
  }

  /**
   * Generates a random number on [0,2^32)-interval.
   */
  genrandInt32(): number {
    let y: number;

    if (this.mti >= N) {
      // generate N words at one time
      let kk: number;

      // if initGenrand() has not been called a default initial seed is used
      if (this.mti === N + 1) {
        this.initGenrand(5489);
      }

      for (kk = 0; kk < N - M; kk++) {
        y = this.unsigned32(
          (this.mt[kk] & UPPER_MASK) | (this.mt[kk + 1] & LOWER_MASK)
        );

        this.mt[kk] = this.unsigned32(
          this.mt[kk + M] ^ (y >>> 1) ^ mag01[y & 0x1]
        );
      }

      for (; kk < N - 1; kk++) {
        y = this.unsigned32(
          (this.mt[kk] & UPPER_MASK) | (this.mt[kk + 1] & LOWER_MASK)
        );

        this.mt[kk] = this.unsigned32(
          this.mt[kk + (M - N)] ^ (y >>> 1) ^ mag01[y & 0x1]
        );
      }

      y = this.unsigned32(
        (this.mt[N - 1] & UPPER_MASK) | (this.mt[0] & LOWER_MASK)
      );

      this.mt[N - 1] = this.unsigned32(
        this.mt[M - 1] ^ (y >>> 1) ^ mag01[y & 0x1]
      );

      this.mti = 0;
    }

    y = this.mt[this.mti++];

    // Tempering
    y = this.unsigned32(y ^ (y >>> 11));
    y = this.unsigned32(y ^ ((y << 7) & 0x9d2c5680));
    y = this.unsigned32(y ^ ((y << 15) & 0xefc60000));
    y = this.unsigned32(y ^ (y >>> 18));

    return y;
  }

  /**
   * Generates a random number on [0,2^53)-interval.
   */
  genrandInt53(): number {
    const upper = this.genrandInt32() >>> 5; // 32 - 5 = 27 bits
    const lower = this.genrandInt32() >>> 6; // 32 - 6 = 26 bits

    // Shift upper by 26 bits to the left, but js bit operations are always 32bit
    return upper * 2 ** 26 + lower; // 27 + 26 = 53 bits
  }

  // These real versions are implemented by FakerJs based on previous code from Isaku Wada, 2002/01/09

  /**
   * Generates a random number [0,1) with 53-bit resolution.
   */
  genrandRes53CO(): number {
    return this.genrandInt53() * (1.0 / 9007199254740992.0); // divided by 2^53
  }

  /**
   * Generates a random number [0,1] with 53-bit resolution.
   */
  genrandRes53CC(): number {
    return this.genrandInt53() * (1.0 / 9007199254740991.0); // divided by 2^53-1
  }
}
