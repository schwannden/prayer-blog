import js from '@eslint/js'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

// eslint-config-next 16 ships native flat config. `core-web-vitals` already
// bundles the base Next config (typescript-eslint, react, react-hooks,
// import, jsx-a11y) plus the core-web-vitals rules, so we spread it directly
// instead of using FlatCompat (which is incompatible with the v16 export).
export default [
  {
    ignores: ['**/node_modules/**', '.next/**', 'out/**', '.contentlayer/**', 'public/**'],
  },
  js.configs.recommended,
  ...nextCoreWebVitals,
  prettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'prettier/prettier': 'error',
      // TypeScript's compiler covers these; disabling matches the project's
      // prior eslintrc behavior (typescript-eslint disabled them for TS files).
      'no-undef': 'off',
      'no-unused-vars': 'off',
      // New in the react-hooks plugin bundled with Next 16. The next-themes
      // mount guard (`useEffect(() => setMounted(true), [])`) trips it; keep as
      // a non-blocking warning rather than refactor in a dependency-bump PR.
      'react-hooks/set-state-in-effect': 'warn',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      'react/prop-types': 0,
      '@typescript-eslint/no-unused-vars': 0,
      'react/no-unescaped-entities': 0,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
]
