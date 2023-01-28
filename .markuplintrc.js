module.exports = {
  extends: ['markuplint:recommended'],
  parser: {
    '\\.jsx': '@markuplint/jsx-parser',
  },
  specs: {
    '.jsx?$': '@markuplint/react-spec',
  },
}
