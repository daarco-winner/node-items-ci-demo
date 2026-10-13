import { execFileSync } from 'node:child_process';
const env = {
  PATH: process.env.PATH,
  GIT_NO_REPLACE_OBJECTS: '1',
  GIT_CONFIG_NOSYSTEM: '1',
  GIT_CONFIG_GLOBAL: '/dev/null',
  GIT_CONFIG_SYSTEM: '/dev/null'
};
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', env }).trim();
const expected = process.env.EXPECTED_HEAD_SHA;
if (!/^[a-f0-9]{40}$/.test(expected ?? '')) throw new Error('Expected a full commit SHA');
const commit = git('rev-parse', 'HEAD');
if (commit !== expected) throw new Error('Commit mismatch');
if (git('status', '--porcelain', '--untracked-files=all') !== '') throw new Error('Working tree is not clean');
console.log(JSON.stringify({ commit, tree: git('rev-parse', 'HEAD^{tree}'), clean: true }));
