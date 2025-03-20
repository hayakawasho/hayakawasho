import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'
import airbnb from 'eslint-config-airbnb'
import airbnbTypescript from 'eslint-config-airbnb-typescript'
import jsxExpressions from 'eslint-plugin-jsx-expressions'
import date from 'eslint-plugin-date'
import strictDependencies from 'eslint-plugin-strict-dependencies'
import returnType from 'eslint-plugin-return-type'
import airbnbBase from 'eslint-config-airbnb-base'
import airbnbTypescriptBase from 'eslint-config-airbnb-typescript/base.js'
import typescript from '@typescript-eslint/eslint-plugin'
import comments from 'eslint-plugin-eslint-comments'
import unusedImports from 'eslint-plugin-unused-imports'

const compat = new FlatCompat()

export default [
  ...compat.config(airbnb),
  ...compat.config(airbnbTypescript),
  ...[
    ...compat.config(airbnbBase),
    ...compat.config(airbnbTypescriptBase),
    //
    ...compat.extends(
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/stylistic',
      'plugin:eslint-comments/recommended',
    ),

    {
      plugins: {
        'unused-imports': unusedImports,
        typescript,
        comments,
      },
      rules: {
        /**
         * eslint
         */
        'arrow-body-style': 'off',
        camelcase: [
          'error',
          {
            properties: 'never',
            ignoreDestructuring: false,
            allow: ['^[A-Z].*_[A-Z].*'],
          },
        ],
        'default-case-last': 'error', // 統一したいだけなのでfirstでもいい
        'default-param-last': 'off', // optional paramを最後尾にしたいのでoff
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'max-lines': [
          'error',
          {
            max: 250,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
        'no-alert': 'error',
        'no-console': 'error',
        'no-promise-executor-return': 'error',
        // NOTE: import/no-relative-parent-importsだと@でのimportもNGになるのでno-restricted-importsで../を禁止する
        'no-restricted-imports': ['error', { patterns: ['..*'] }],
        'no-unused-expressions': 'off', // duplidate @typescript-eslint/no-unused-expressions
        'no-useless-constructor': 'off',
        'no-use-before-define': 'off', // duplidate @typescript-eslint/no-use-before-define
        'no-param-reassign': [
          'error',
          {
            props: false,
          },
        ],
        /**
         * @typescript-eslint
         */
        '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off', // annoying to force return type
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTernary: true,
          },
        ], // https://github.com/facebook/create-react-app/issues/8107
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-useless-constructor': ['error'],
        // @typescript-eslint v6でrecommendedからアラートが出なくなったルールを有効化
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        //
        /**
         * eslint-comments
         */
        'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
        'eslint-comments/no-unused-disable': 'error',
        'eslint-comments/no-use': [
          'error',
          {
            allow: ['eslint-disable', 'eslint-enable', 'eslint-disable-next-line'],
          },
        ],
        'eslint-comments/require-description': ['error', { ignore: ['eslint-enable'] }],
        /**
         * import
         */
        'import/extensions': 'off',
        'import/named': 'off',
        'import/no-cycle': 'error',
        'import/no-default-export': 'error',
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: ['**/*.stories.tsx', '**/*.test.tsx'],
            optionalDependencies: false,
          },
        ],
        'import/no-relative-packages': 'off',
        'import/no-relative-parent-imports': 'off',
        'import/no-unresolved': 'off',
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              ['parent', 'sibling'],
              'object',
              'type',
              'index',
            ],
            'newlines-between': 'always',
            pathGroupsExcludedImportTypes: ['builtin'],
            alphabetize: { order: 'asc', caseInsensitive: true },
            pathGroups: [],
          },
        ],
        'import/prefer-default-export': 'off',
        /**
         * unused-imports
         */
        'unused-imports/no-unused-imports': 'error',
      },
    },
  ],

  {
    languageOptions: {
      parserOptions: {
        jsx: true,
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      // jsxでfalsyな値の誤出力制御のために利用
      'jsx-expressions': jsxExpressions,
      // テストが壊れる new Date() を禁止するために利用
      date: date,
      // 依存関係管理のために利用（自社パッケージ）
      'strict-dependencies': strictDependencies,
      // Result型利用時に型の未参照を防止するために利用（自社パッケージ）
      'return-type': returnType,
    },
    rules: {
      /**
       * import
       */
      'import/order': [
        'error',
        // NOTE(hori-ryota): pathGroupsだけ記述して上書きしたいがobjectごとreplaceされてしまうので不可。全て記述する。 (cf. https://eslint.org/docs/user-guide/configuring/configuration-files#extending-configuration-files )
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
            'index',
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      /**
       * date
       */
      'date/no-new-date-without-args': 'error',
      /**
       * react
       */
      'react/display-name': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-curly-newline': 'off', // prettierと競合する
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],
      'react/jsx-indent': 'off',
      'react/jsx-key': 'error',
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: false,
          assignment: false,
        },
      ],
      'react/jsx-no-constructed-context-values': 'error',
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-danger': 'error',
      'react/no-invalid-html-attribute': 'error',
      'react/no-unstable-nested-components': 'error',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/state-in-constructor': ['error', 'never'],
      /**
       * react-hooks
       */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': [
        'error',
        { additionalHooks: 'useUpdateEffect|useAsync|useAsyncFn|useRecoilCallback' },
      ],
      /**
       * jsx-a11y
       */
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/media-has-caption': 'off',
      'jsx-a11y/no-autofocus': 'off',
      /**
       * jsx-expressions
       */
      'jsx-expressions/strict-logical-expressions': 'error',
      /**
       * return-type
       */
      'return-type/enforce-access': [
        'error',
        { typeNames: ['Err<\\w*Error>', 'Promise<.*?Err<\\w*Error>.*?>'] },
      ],
    },
  },

  // {
  //   files: ['src/pages/**/*', '**/*.d.ts'],
  //   rules: {
  //     'import/no-default-export': 'off',
  //   },
  // },

  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
]
