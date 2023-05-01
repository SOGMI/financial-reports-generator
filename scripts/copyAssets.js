const { mkdir, copyFile, pathExists } = require('fs-extra');

async function main() {
    if (!(await pathExists('./dist/assets'))) {
        await mkdir('./dist/assets');
    }
    await Promise.all([
        copyFile('./src/assets/template.html', './dist/assets/template.html'),
        copyFile(
            './src/assets/tailwind.generated.css',
            './dist/assets/tailwind.generated.css'
        ),
    ]);
}

main();
