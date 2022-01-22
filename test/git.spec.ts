import type { JestMockCompat } from 'vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { faker } from '../lib/cjs';

describe('git.js', () => {
  describe('branch()', () => {
    let spy_hacker_noun: JestMockCompat<[], string>;
    let spy_hacker_verb: JestMockCompat<[], string>;

    beforeEach(() => {
      spy_hacker_noun = vi.spyOn(faker.hacker, 'noun');
      spy_hacker_verb = vi.spyOn(faker.hacker, 'verb');
    });

    afterEach(() => {
      spy_hacker_noun.mockRestore();
      spy_hacker_verb.mockRestore();
    });

    it('returns a branch with hacker noun and verb', () => {
      faker.git.branch();

      expect(spy_hacker_noun).toHaveBeenCalledOnce();
      expect(spy_hacker_verb).toHaveBeenCalledOnce();
    });
  });

  describe('commitEntry()', () => {
    let spy_git_commitMessage: JestMockCompat<[], string>;
    let spy_git_commitSha: JestMockCompat<[], string>;
    let spy_internet_email: JestMockCompat<
      [firstName?: string, lastName?: string, provider?: string],
      string
    >;
    let spy_name_firstName: JestMockCompat<[gender?: string | number], string>;
    let spy_name_lastName: JestMockCompat<[gender?: string | number], string>;
    let spy_datatype_number: JestMockCompat<
      [
        options?:
          | number
          | {
              min?: number;
              max?: number;
              precision?: number;
            }
      ],
      number
    >;

    beforeEach(() => {
      spy_git_commitMessage = vi.spyOn(faker.git, 'commitMessage');
      spy_git_commitSha = vi.spyOn(faker.git, 'commitSha');
      spy_internet_email = vi.spyOn(faker.internet, 'email');
      spy_name_firstName = vi.spyOn(faker.name, 'firstName');
      spy_name_lastName = vi.spyOn(faker.name, 'lastName');
      spy_datatype_number = vi.spyOn(faker.datatype, 'number');
    });

    afterEach(() => {
      spy_git_commitMessage.mockRestore();
      spy_git_commitSha.mockRestore();
      spy_internet_email.mockRestore();
      spy_name_firstName.mockRestore();
      spy_name_lastName.mockRestore();
      spy_datatype_number.mockRestore();
    });

    it('returns merge entry at random', () => {
      faker.git.commitEntry();

      expect(spy_datatype_number).toHaveBeenCalled();
    });

    it('returns a commit entry with git commit message and sha', () => {
      faker.git.commitEntry();

      expect(spy_git_commitMessage).toHaveBeenCalledOnce();
      expect(spy_git_commitSha).toHaveBeenCalledOnce();
    });

    it('returns a commit entry with internet email', () => {
      faker.git.commitEntry();

      expect(spy_internet_email).toHaveBeenCalledOnce();
    });

    it('returns a commit entry with name first and last', () => {
      faker.git.commitEntry();

      expect(spy_name_firstName).toHaveBeenCalledTimes(2);
      expect(spy_name_lastName).toHaveBeenCalledTimes(2);
    });

    describe("with options['merge'] equal to true", () => {
      let spy_git_shortSha: JestMockCompat<[], string>;

      beforeEach(() => {
        spy_git_shortSha = vi.spyOn(faker.git, 'shortSha');
      });

      afterEach(() => {
        spy_git_shortSha.mockRestore();
      });

      it('returns a commit entry with merge details', () => {
        faker.git.commitEntry({ merge: true });

        expect(spy_git_shortSha).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('commitMessage()', () => {
    let spy_hacker_verb: JestMockCompat<[], string>;
    let spy_hacker_adjective: JestMockCompat<[], string>;
    let spy_hacker_noun: JestMockCompat<[], string>;

    beforeEach(() => {
      spy_hacker_verb = vi.spyOn(faker.hacker, 'verb');
      spy_hacker_adjective = vi.spyOn(faker.hacker, 'adjective');
      spy_hacker_noun = vi.spyOn(faker.hacker, 'noun');
    });

    afterEach(() => {
      spy_hacker_verb.mockRestore();
      spy_hacker_adjective.mockRestore();
      spy_hacker_noun.mockRestore();
    });

    it('returns a commit message with hacker noun, adj and verb', () => {
      faker.git.commitMessage();

      expect(spy_hacker_verb).toHaveBeenCalledOnce();
      expect(spy_hacker_adjective).toHaveBeenCalledOnce();
      expect(spy_hacker_noun).toHaveBeenCalledOnce();
    });
  });

  describe('commitSha()', () => {
    it('returns a random commit SHA', () => {
      const commitSha = faker.git.commitSha();
      expect(commitSha).match(/^[a-f0-9]{40}$/);
    });
  });

  describe('shortSha()', () => {
    it('returns a random short SHA', () => {
      const shortSha = faker.git.shortSha();
      expect(shortSha).match(/^[a-f0-9]{7}$/);
    });
  });
});
