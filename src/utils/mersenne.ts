// Copyright (c) 2022 Faker
//
// This is a version of the original source code migrated to TypeScript and modified by the Faker team.
// Check LICENSE for more details about the copyright.
//
// ===
//
// this program is a JavaScript version of Mersenne Twister, with concealment and encapsulation in class,
// an almost straight conversion from the original program, mt19937ar.c,
// translated by y. okada on July 17, 2006.
// and modified a little at july 20, 2006, but there are not any substantial differences.
// in this program, procedure descriptions and comments of original source code were not removed.
// lines commented with //c// were originally descriptions of c procedure. and a few following lines are appropriate JavaScript descriptions.
// lines commented with /* and */ are original comments.
// lines commented with // are additional comments in this JavaScript version.
// before using this version, create at least one instance of MersenneTwister19937 class, and initialize the each state, given below in c comments, of all the instances.
//
// ===

/*
 *   A C-program for MT19937, with initialization improved 2002/1/26.
 *   Coded by Takuji Nishimura and Makoto Matsumoto.
 *
 *   Before using, initialize the state by using init_genrand(seed)
 *   or init_by_array(init_key, key_length).
 *
 *   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
 *   All rights reserved.
 *
 *   Redistribution and use in source and binary forms, with or without
 *   modification, are permitted provided that the following conditions
 *   are met:
 *
 *     1. Redistributions of source code must retain the above copyright
 *        notice, this list of conditions and the following disclaimer.
 *
 *     2. Redistributions in binary form must reproduce the above copyright
 *        notice, this list of conditions and the following disclaimer in the
 *        documentation and/or other materials provided with the distribution.
 *
 *     3. The names of its contributors may not be used to endorse or promote
 *        products derived from this software without specific prior written
 *        permission.
 *
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 *   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 *   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 *   Any feedback is very welcome.
 *   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
 *   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
 */

export default class MersenneTwister19937 {
  /* constants should be scoped inside the class */
  /* Period parameters */
  //c//#define N 624
  //c//#define M 397
  //c//#define MATRIX_A 0x9908b0dfUL   /* constant vector a */
  //c//#define UPPER_MASK 0x80000000UL /* most significant w-r bits */
  //c//#define LOWER_MASK 0x7fffffffUL /* least significant r bits */
  private readonly N = 624;
  private readonly M = 397;
  private readonly MATRIX_A = 0x9908b0df; /* constant vector a */
  private readonly UPPER_MASK = 0x80000000; /* most significant w-r bits */
  private readonly LOWER_MASK = 0x7fffffff; /* least significant r bits */
  //c//static unsigned long mt[N]; /* the array for the state vector  */
  //c//static int mti=N+1; /* mti==N+1 means mt[N] is not initialized */
  private mt: number[] = new Array(
    this.N
  ); /* the array for the state vector  */
  private mti = this.N + 1; /* mti==N+1 means mt[N] is not initialized */

  /**
   * Returns a 32-bits unsiged integer from an operand to which applied a bit operator.
   *
   * @param n1 number to unsign
   */
  private unsigned32(n1: number): number {
    // returns a 32-bits unsiged integer from an operand to which applied a bit operator.
    return n1 < 0 ? (n1 ^ this.UPPER_MASK) + this.UPPER_MASK : n1;
  }

  /**
   * Emulates lowerflow of a c 32-bits unsiged integer variable, instead of the operator -.
   * These both arguments must be non-negative integers expressible using unsigned 32 bits.
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
   * emulates overflow of a c 32-bits unsiged integer variable, instead of the operator +.
   * these both arguments must be non-negative integers expressible using unsigned 32 bits.
   *
   * @param n1 number one for addition
   * @param n2 number two for addition
   */
  private addition32(n1: number, n2: number): number {
    return this.unsigned32((n1 + n2) & 0xffffffff);
  }

  /**
   * Emulates overflow of a c 32-bits unsiged integer variable, instead of the operator *.
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
  //c//void init_genrand(unsigned long s)
  initGenrand(seed: number): void {
    //c//mt[0]= s & 0xffffffff;
    this.mt[0] = this.unsigned32(seed & 0xffffffff);
    for (this.mti = 1; this.mti < this.N; this.mti++) {
      this.mt[this.mti] =
        //c//(1812433253 * (mt[mti-1] ^ (mt[mti-1] >> 30)) + mti);
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
      //c//mt[mti] &= 0xffffffff;
      this.mt[this.mti] = this.unsigned32(this.mt[this.mti] & 0xffffffff);
      /* for >32 bit machines */
    }
  }

  /**
   * Initialize by an array with array-length.
   *
   * @param initKey is the array for initializing keys
   * @param keyLength is its length
   */
  /* slight change for C++, 2004/2/26 */
  //c//void init_by_array(unsigned long init_key[], int key_length)
  initByArray(initKey: number[], keyLength: number): void {
    //c//init_genrand(19650218);
    this.initGenrand(19650218);
    let i = 1;
    let j = 0;
    let k = this.N > keyLength ? this.N : keyLength;
    for (; k; k--) {
      //c//mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1664525))
      //c//	+ init_key[j] + j; /* non linear */
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
      //c//mt[i] &= 0xffffffff; /* for WORDSIZE > 32 machines */
      this.mt[i] = this.unsigned32(this.mt[i] & 0xffffffff);
      i++;
      j++;
      if (i >= this.N) {
        this.mt[0] = this.mt[this.N - 1];
        i = 1;
      }
      if (j >= keyLength) {
        j = 0;
      }
    }
    for (k = this.N - 1; k; k--) {
      //c//mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1566083941))
      //c//- i; /* non linear */
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
      //c//mt[i] &= 0xffffffff; /* for WORDSIZE > 32 machines */
      this.mt[i] = this.unsigned32(this.mt[i] & 0xffffffff);
      i++;
      if (i >= this.N) {
        this.mt[0] = this.mt[this.N - 1];
        i = 1;
      }
    }
    this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
  }

  /* moved outside of genrand_int32() by jwatte 2010-11-17; generate less garbage */
  private mag01 = [0x0, this.MATRIX_A];

  /**
   * Generates a random number on [0,2^32]-interval
   */
  //c//unsigned long genrand_int32(void)
  genrandInt32(): number {
    //c//unsigned long y;
    //c//static unsigned long mag01[2]={0x0UL, MATRIX_A};
    let y: number;
    /* mag01[x] = x * MATRIX_A  for x=0,1 */

    if (this.mti >= this.N) {
      /* generate N words at one time */
      //c//int kk;
      let kk: number;

      if (this.mti === this.N + 1) {
        /* if init_genrand() has not been called, */
        //c//init_genrand(5489); /* a default initial seed is used */
        this.initGenrand(5489);
      } /* a default initial seed is used */

      for (kk = 0; kk < this.N - this.M; kk++) {
        //c//y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
        //c//mt[kk] = mt[kk+M] ^ (y >> 1) ^ mag01[y & 0x1];
        y = this.unsigned32(
          (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK)
        );
        this.mt[kk] = this.unsigned32(
          this.mt[kk + this.M] ^ (y >>> 1) ^ this.mag01[y & 0x1]
        );
      }
      for (; kk < this.N - 1; kk++) {
        //c//y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
        //c//mt[kk] = mt[kk+(M-N)] ^ (y >> 1) ^ mag01[y & 0x1];
        y = this.unsigned32(
          (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK)
        );
        this.mt[kk] = this.unsigned32(
          this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ this.mag01[y & 0x1]
        );
      }
      //c//y = (mt[N-1]&UPPER_MASK)|(mt[0]&LOWER_MASK);
      //c//mt[N-1] = mt[M-1] ^ (y >> 1) ^ mag01[y & 0x1];
      y = this.unsigned32(
        (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK)
      );
      this.mt[this.N - 1] = this.unsigned32(
        this.mt[this.M - 1] ^ (y >>> 1) ^ this.mag01[y & 0x1]
      );
      this.mti = 0;
    }

    y = this.mt[this.mti++];

    /* Tempering */
    //c//y ^= (y >> 11);
    //c//y ^= (y << 7) & 0x9d2c5680;
    //c//y ^= (y << 15) & 0xefc60000;
    //c//y ^= (y >> 18);
    y = this.unsigned32(y ^ (y >>> 11));
    y = this.unsigned32(y ^ ((y << 7) & 0x9d2c5680));
    y = this.unsigned32(y ^ ((y << 15) & 0xefc60000));
    y = this.unsigned32(y ^ (y >>> 18));

    return y;
  }

  /**
   * Generates a random number on [0,2^32]-interval
   */
  //c//long genrand_int31(void)
  genrandInt31(): number {
    //c//return (genrand_int32()>>1);
    return this.genrandInt32() >>> 1;
  }

  /**
   * Generates a random number on [0,1]-real-interval
   */
  //c//double genrand_real1(void)
  genrandReal1(): number {
    //c//return genrand_int32()*(1.0/4294967295.0);
    return this.genrandInt32() * (1.0 / 4294967295.0);
    /* divided by 2^32-1 */
  }

  /**
   * Generates a random number on [0,1)-real-interval
   */
  //c//double genrand_real2(void)
  genrandReal2(): number {
    //c//return genrand_int32()*(1.0/4294967296.0);
    return this.genrandInt32() * (1.0 / 4294967296.0);
    /* divided by 2^32 */
  }

  /**
   * Generates a random number on (0,1)-real-interval
   */
  //c//double genrand_real3(void)
  genrandReal3(): number {
    //c//return ((genrand_int32()) + 0.5)*(1.0/4294967296.0);
    return (this.genrandInt32() + 0.5) * (1.0 / 4294967296.0);
    /* divided by 2^32 */
  }

  /**
   * Generates a random number on [0,1) with 53-bit resolution
   */
  //c//double genrand_res53(void)
  genrandRes53(): number {
    //c//unsigned long a=genrand_int32()>>5, b=genrand_int32()>>6;
    const a = this.genrandInt32() >>> 5,
      b = this.genrandInt32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  }
  /* These real versions are due to Isaku Wada, 2002/01/09 added */
}
