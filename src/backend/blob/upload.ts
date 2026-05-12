import { put } from '@vercel/blob';

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

export const uploadChallengeImage = async (file: File): Promise<string> => {
	if (file.size > MAX_SIZE_BYTES) {
		throw new Error('Image must be under 2 MB');
	}

	const ext = file.name.split('.').pop() ?? 'png';
	const blob = await put(`challenges/${crypto.randomUUID()}.${ext}`, file, {
		access: 'public'
	});

	return blob.url;
};
