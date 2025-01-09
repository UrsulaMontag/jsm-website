import {spawn} from 'child_process';

const server = spawn('npm', ['run', 'start'], {
    stdio: 'inherit',
    shell: true,
});

setTimeout(() => {
    const cypress = spawn('cypress', ['run'], {
        stdio: 'inherit',
        shell: true,
        env: {
            ...process.env,
            CYPRESS_BASE_URL: process.env.CYPRESS_BASE_URL || 'http://localhost:3000'
        }
    });

    cypress.on('exit', (code) => {
        server.kill();
        process.exit(code);
    });
}, 10000);

process.on('SIGTERM', () => {
    server.kill();
    process.exit();
});