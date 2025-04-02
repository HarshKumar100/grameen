    const http = require('http');
    const app = require('./app');
    const { initializeSocket } = require('./socket');

    const port = process.env.PORT || 3000;
    const server = http.createServer(app);

    initializeSocket(server);

    server.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });

    // Debugging logs
    server.on("listening", () => console.log(`✅ Server is listening on port ${port}`));
    server.on("error", (err) => console.error("❌ Server error:", err));
