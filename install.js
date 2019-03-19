(async (fs, clone) => {
    const [node, install, repoId] = process.argv;

    if (!fs.existsSync(`./uniscrape-${repoId}`)) {
        console.log(`[uniscrape] cloning uniscrape-${repoId}`);

        await new Promise((resolve, reject) => {
            const repo = clone(`https://github.com/szalontaijordan/uniscrape-${repoId}.git`, `./uniscrape-${repoId}`, {}, () => {
                console.log(`[uniscrape] cloned uniscrape-${repoId}`);
                resolve();
            });
        });
    } else {
        console.log(`[uniscrape] uniscrape-${repoId} already exists`);
    }
})(require('fs'), require('git-clone'));
