import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@/hooks/*': path.resolve(__dirname, './src/hooks'),
			'@/redux/*': path.resolve(__dirname, './src/redux'),
			'@/types/*': path.resolve(__dirname, './src/types'),
			'@/utils/*': path.resolve(__dirname, './src/utils'),
			'@/config/*': path.resolve(__dirname, './src/config'),
			'@/components/*': path.resolve(__dirname, './src/components'),
		}
	},
	plugins: [react()]
});