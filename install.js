(async (fs, clone, exec) => {
    const [node, install, repoId] = process.argv;

    if (!fs.existsSync(`./uniscrape-${repoId}`)) {
        console.log(`[uniscrape] cloning uniscrape-${repoId}`);
        const repo = clone(`https://github.com/szalontaijordan/uniscrape-${repoId}.git`, `./uniscrape-${repoId}`);
        console.log((await exec('ls')).stdout)
        console.log(`[uniscrape] installing uniscrape-${repoId}`);
        const { stdout, stderr } = await exec(`cd uniscrape-${repoId} && npm install && npm run build`);
        stdout ? console.log(stdout) : console.log(stderr);
    } else {
        console.log(`[uniscrape] uniscrape-${repoId} already exists`);
    }
})(require('fs'), require('git-clone'), require('util').promisify(require('child_process').exec));
