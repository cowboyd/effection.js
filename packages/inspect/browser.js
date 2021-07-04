if (process.env.EFFECTION_INCLUDE_INSPECTOR || process.env.NODE_ENV !== 'production') {
  require('@effection/devtools-hooks').runDevtoolsHooks();
}
