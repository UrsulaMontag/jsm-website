import {spawn} from "child_process";


async function main() {
    try {
        console.log("Building Next.js project...");
        const build = spawn("npm", ["run", "build"], {
            stdio: "inherit",
            shell: true
        });

        await new Promise((resolve, reject) => {
            build.on("exit", (code) => {
                if (code === 0) resolve();
                else reject(new Error(`Build failed with code ${code}`));
            });
        });

        console.log("Starting Next.js server...");
        const server = spawn("npm", ["run", "start"], {
            stdio: "inherit",
            shell: true
        });

        await new Promise(resolve => setTimeout(resolve, 10000));

        console.log("Running Cypress tests...");
        const cypress = spawn("cypress", ["run"], {
            stdio: "inherit",
            shell: true,
            env: {
                ...process.env,
                CYPRESS_BASE_URL: process.env.CYPRESS_BASE_URL || "http://localhost:3000"
            }
        });

        cypress.on("exit", (code) => {
            server.kill();
            process.exit(code);
        });

    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

process.on("SIGTERM", () => {
    process.exit();
});

main();