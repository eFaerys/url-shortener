import api from "../api/api";
import type { UrlResponse } from "./types";

export async function shortenUrl(
	url: string,
): Promise<UrlResponse> {
	try {
		return await api.post<UrlResponse>('createShort', { longUrl: url });
	} catch (err) {
		console.error('Error while creating short URL:', err);
		throw err;
	}
}

export async function getUrl(
	url: string,
): Promise<any> {
	try {
		return await api.get<any>(url);
	} catch (err) {
		console.error('Error while recovering short URL:', err);
		throw err;
	}
}