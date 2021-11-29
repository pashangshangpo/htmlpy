module.exports = {
  extends: ['like', 'like/react'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['like/typescript'],
    },
  ],
  parser: 'babel-eslint',
  rules: {
    camelcase: [0, { allow: ['head_top', 'UNSAFE_componentWillMount'] }],
    'import/namespace': [2, { allowComputed: true }],
    'react/prop-types': 0,
    'no-console': [1, { allow: ['warn', 'error'] }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      webpack: {
        config: {
          externals: {
            axios: 'axios',
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router': 'ReactRouterDOM',
            'react-router-dom': 'ReactRouterDOM',
          },
        },
      },
    },
  },
}
