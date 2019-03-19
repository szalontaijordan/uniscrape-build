(async (fs, clone, exec) => {
    const [node, install, repoId] = process.argv;

    if (!fs.existsSync(`./uniscrape-${repoId}`)) {
        console.log(`[uniscrape] cloning uniscrape-${repoId}`);

        await new Promise((resolve, reject) => {
            const repo = clone(`https://github.com/szalontaijordan/uniscrape-${repoId}.git`, `./uniscrape-${repoId}`, {}, async () => {
                console.log(`[uniscrape] cloned uniscrape-${repoId}`);
                console.log(`[uniscrape] installing uniscrape-${repoId}`);

                const { stdout, stderr } = await exec(`cd uniscrape-${repoId} && npm install && npm run build`);
                stdout ? resolve(stdout) : reject(stderr);
            });
        });
    } else {
        console.log(`[uniscrape] uniscrape-${repoId} already exists`);
    }
})(require('fs'), require('git-clone'), require('util').promisify(require('child_process').exec));
