/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'breaking', scope: '*', release: 'major' },
          { type: 'chore', scope: '*', release: false },
          { type: 'ci', scope: '*', release: false },
          { type: 'docs', scope: '*', release: false },
          { type: 'feat', scope: '*', release: 'minor' },
          { type: 'fix', scope: '*', release: 'patch' },
          { type: 'refactor', scope: '*', release: false },
          { type: 'security', scope: '*', release: 'patch' },
          { type: 'style', scope: '*', release: 'patch' },
          { type: 'test', scope: '*', release: false },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE'],
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'breaking', section: '⚠ Breaking Changes', hidden: false },
            { type: 'feat', section: '✨ Features', hidden: false },
            { type: 'fix', section: '🐛 Bug Fixes', hidden: false },
            { type: 'refactor', section: '🔄 Refactor', hidden: false },
            { type: 'security', section: '🔒 Security', hidden: false },
            { type: 'style', section: '💄 Style', hidden: false },
            { type: 'test', section: '🚨 Tests', hidden: false },
            { type: 'chore', section: '🧰 Other Changes', hidden: false },
            { type: 'ci', section: '🔄 CI', hidden: false },
            { type: 'docs', section: '📚 Documentation', hidden: false },
          ],
        },
        writerOpts: {
          commitPartial:
            '*{{#if scope}} **{{scope}}:**{{/if}} {{subject}} ([{{hash}}]({{commitUrl}})) by [@{{authorName}}](https://github.com/{{authorName}})',
        },
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# Changelog',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        access: 'public',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} \n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        successComment:
          "This ${issue.pull_request ? 'PR is included' : 'issue has been resolved'} in version ${nextRelease.version} :tada: \n\n Thanks for your contribution!",
        labels: ['release'],
        releasedLabels: ['released'],
        assets: [{ path: 'dist/**', label: 'Build' }],
      },
    ],
  ],
};
