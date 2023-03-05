import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { Server } from 'socket.io';

process.env.BROWSER = 'firefox';

const webSocketServerPlugin = {
	name: 'sveltekit-socket-io',
	configureServer(server) {
		const io = new Server(server.httpServer);
		console.log('SocketIO injected');

		// server-side
		io.on('connection', (socket) => {
			socket.on('celebrate', (userId) => {
				io.emit('celebrate', userId);
			});
			socket.on('generate', (userId) => {
				io.emit('generate', userId);
			});
			socket.on('reset', (userId) => {
				io.emit('reset', userId);
			});
		});
	}
};

export default defineConfig({
	plugins: [sveltekit(), webSocketServerPlugin],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
