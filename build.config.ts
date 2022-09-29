import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    declaration: true,
    clean: true,
    outDir: 'lib',
    entries: ['src/main'],
});
