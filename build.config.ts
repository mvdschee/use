import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    declaration: true,
    clean: true,
    outDir: 'lib',
    rollup: {
        emitCJS: true,
    },
    entries: ['src/main'],
});
