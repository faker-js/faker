import type { JestMockCompat } from 'vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { faker } from '../lib/cjs';

describe('lorem.js', () => {
  describe('word()', () => {
    describe("when no 'length' param passed in", () => {
      it('returns a word with a random length', () => {
        const str = faker.lorem.word();
        expect(typeof str).toBe('string');
      });
    });

    describe("when 'length' param passed in", () => {
      it('returns a word with the requested length', () => {
        const str = faker.lorem.word(5);
        expect(typeof str).toBe('string');
        expect(str).toHaveLength(5);
      });
    });
  });

  describe('words()', () => {
    let spy_helpers_shuffle: JestMockCompat<[o?: unknown[]], unknown[]>;

    beforeEach(() => {
      spy_helpers_shuffle = vi.spyOn(faker.helpers, 'shuffle');
    });

    afterEach(() => {
      spy_helpers_shuffle.mockRestore();
    });

    describe("when no 'num' param passed in", () => {
      it('returns three words', () => {
        const str = faker.lorem.words();
        const words = str.split(' ');
        expect(Array.isArray(words)).toBe(true);
        expect(words.length).greaterThanOrEqual(3);
        // assert.ok(faker.helpers.shuffle.called);
      });
    });

    describe("when 'num' param passed in", () => {
      it('returns requested number of words', () => {
        const str = faker.lorem.words(7);
        const words = str.split(' ');
        expect(Array.isArray(words)).toBe(true);
        expect(words).toHaveLength(7);
      });
    });
  });

  describe('slug()', () => {
    let spy_helpers_shuffle: JestMockCompat<[o?: unknown[]], unknown[]>;

    beforeEach(() => {
      spy_helpers_shuffle = vi.spyOn(faker.helpers, 'shuffle');
    });

    afterEach(() => {
      spy_helpers_shuffle.mockRestore();
    });

    const validateSlug = (wordCount, str) => {
      expect(str.match(/^[a-z][a-z-]*[a-z]$/).length).toBe(1);
      expect(str.match(/-/g).length).toBe(wordCount - 1);
    };

    describe("when no 'wordCount' param passed in", () => {
      it('returns a slug with three words', () => {
        const str = faker.lorem.slug();
        validateSlug(3, str);
      });
    });

    describe("when 'wordCount' param passed in", () => {
      it('returns a slug with requested number of words', () => {
        const str = faker.lorem.slug(7);
        validateSlug(7, str);
      });
    });
  });

  /*
    describe("sentence()",  () =>{
        context("when no 'wordCount' or 'range' param passed in",  () =>{
            it("returns a string of at least three words",  () =>{
                sinon.spy(faker.lorem, 'words');
                sinon.stub(faker.random, 'number').returns(2);
                const sentence = faker.lorem.sentence();
                assert.ok(typeof sentence === 'string');
                const parts = sentence.split(' ');
                assert.strictEqual(parts.length, 5); // default 3 plus stubbed 2.
                assert.ok(faker.lorem.words.calledWith(5));

                faker.lorem.words.restore();
                faker.random.number.restore();
            });
        });

        context("when 'wordCount' param passed in",  () =>{
            it("returns a string of at least the requested number of words",  () =>{
                sinon.spy(faker.lorem, 'words');
                sinon.stub(faker.random, 'number').withArgs(7).returns(2);
                const sentence = faker.lorem.sentence(10);

                assert.ok(typeof sentence === 'string');
                const parts = sentence.split(' ');
                assert.strictEqual(parts.length, 12); // requested 10 plus stubbed 2.
                assert.ok(faker.lorem.words.calledWith(12));

                faker.lorem.words.restore();
                faker.random.number.restore();
            });
        });

        context("when 'wordCount' and 'range' params passed in",  () =>{
            it("returns a string of at least the requested number of words",  () =>{
                sinon.spy(faker.lorem, 'words');
                sinon.stub(faker.random, 'number').withArgs(4).returns(4);

                const sentence = faker.lorem.sentence(10, 4);

                assert.ok(typeof sentence === 'string');
                const parts = sentence.split(' ');
                assert.strictEqual(parts.length, 14); // requested 10 plus stubbed 4.
                assert.ok(faker.random.number.calledWith(4)); // random.number should be called with the 'range' we passed.
                assert.ok(faker.lorem.words.calledWith(14));

                faker.lorem.words.restore();
                faker.random.number.restore();
            });


        });
    });
    */
  /*
    describe("sentences()",  () =>{
        context("when no 'sentenceCount' param passed in",  () =>{
            it("returns newline-separated string of three sentences",  () =>{
                sinon.spy(faker.lorem, 'sentence');
                const sentences = faker.lorem.sentences();

                assert.ok(typeof sentences === 'string');
                const parts = sentences.split('\n');
                assert.strictEqual(parts.length, 3);
                assert.ok(faker.lorem.sentence.calledThrice);

                faker.lorem.sentence.restore();
            });
        });

        context("when 'sentenceCount' param passed in",  () =>{
            it("returns newline-separated string of requested number of sentences",  () =>{
                sinon.spy(faker.lorem, 'sentence');
                const sentences = faker.lorem.sentences(5);

                assert.ok(typeof sentences === 'string');
                const parts = sentences.split('\n');
                assert.strictEqual(parts.length, 5);

                faker.lorem.sentence.restore();
            });
        });
    });
    */
  /*
    describe("paragraph()",  () =>{
        context("when no 'wordCount' param passed in",  () =>{
            it("returns a string of at least three sentences",  () =>{
                sinon.spy(faker.lorem, 'sentences');
                sinon.stub(faker.random, 'number').returns(2);
                const paragraph = faker.lorem.paragraph();

                assert.ok(typeof paragraph === 'string');
                const parts = paragraph.split('\n');
                assert.strictEqual(parts.length, 5); // default 3 plus stubbed 2.
                assert.ok(faker.lorem.sentences.calledWith(5));

                faker.lorem.sentences.restore();
                faker.random.number.restore();
            });
        });

        context("when 'wordCount' param passed in",  () =>{
            it("returns a string of at least the requested number of sentences",  () =>{
                sinon.spy(faker.lorem, 'sentences');
                sinon.stub(faker.random, 'number').returns(2);
                const paragraph = faker.lorem.paragraph(10);

                assert.ok(typeof paragraph === 'string');
                const parts = paragraph.split('\n');
                assert.strictEqual(parts.length, 12); // requested 10 plus stubbed 2.
                assert.ok(faker.lorem.sentences.calledWith(12));

                faker.lorem.sentences.restore();
                faker.random.number.restore();
            });
        });
    });
    */

  /*

    describe("paragraphs()",  () =>{
        context("when no 'paragraphCount' param passed in",  () =>{
            it("returns newline-separated string of three paragraphs",  () =>{
                sinon.spy(faker.lorem, 'paragraph');
                const paragraphs = faker.lorem.paragraphs();

                assert.ok(typeof paragraphs === 'string');
                const parts = paragraphs.split('\n \r');
                assert.strictEqual(parts.length, 3);
                assert.ok(faker.lorem.paragraph.calledThrice);

                faker.lorem.paragraph.restore();
            });
        });

        context("when 'paragraphCount' param passed in",  () =>{
            it("returns newline-separated string of requested number of paragraphs",  () =>{
                sinon.spy(faker.lorem, 'paragraph');
                const paragraphs = faker.lorem.paragraphs(5);

                assert.ok(typeof paragraphs === 'string');
                const parts = paragraphs.split('\n \r');
                assert.strictEqual(parts.length, 5);

                faker.lorem.paragraph.restore();
            });
        });
    });
    */
});
