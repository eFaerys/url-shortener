import type { AxiosInstance } from 'axios';
import axios from 'axios';

class ApiService {
	private static _instance: ApiService;

	public customAxios!: AxiosInstance;


	private constructor() {
		this.setConfig();
	}

	public static getInstance(): ApiService {
		return this._instance || (this._instance = new this());
	}

	private setConfig(): void {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

		this.customAxios = axios.create({
			baseURL: apiBaseUrl,
		})
	}

	public post<T>(
		uri: string,
		body?: unknown,
	): Promise<T> {
		return new Promise((resolve, reject): void => {
			this.customAxios
				.post(uri, body)
				.then((res: { data: T | PromiseLike<T>; }) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	public get<T>(
		uri: string,
		abortController?: AbortController,
	): Promise<T> {
		return new Promise((resolve, reject): void => {
			this.customAxios
				.get<T>(uri, {
					signal: abortController && abortController.signal,
				})
				.then((res: { data: T | PromiseLike<T>; }) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

export default ApiService.getInstance();
