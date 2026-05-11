import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	cacheComponents: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com'
			},
			{
				protocol: 'https',
				hostname: '*.public.blob.vercel-storage.com'
			},
			{
				protocol: 'https',
				hostname: 'i.pravatar.cc'
			}
		]
	}
};

export default nextConfig;
