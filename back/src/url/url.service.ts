import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
  Injectable,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Url } from "./url.entity";
import { ShortenURLDto } from "./dtos/url.dto";
import { nanoid } from "nanoid";
import { isURL } from "class-validator";

@Injectable()
export class UrlService {
	constructor(
		@InjectRepository(Url)
		private repo: Repository<Url>,
	) {}

	async redirect(urlCode: string) {
		const url = await this.repo.findOneBy({ urlCode });
		if (!url) return null;
		url.resquestAccess = (url.resquestAccess || 0) + 1
		return this.repo.save(url);
	}

	async shortenUrl(url: ShortenURLDto) {
		const { longUrl } = url;
		if (!isURL(longUrl)) {
			throw new BadRequestException("String Must be a Valid URL");

		}
		const urlCode = nanoid(10);
		const baseURL = `${process.env.SERVER_URL}:${process.env.PORT}`
		try {
			let url = await this.repo.findOneBy({ longUrl });
			if (url) return {url: url.shortUrl, resquestAccess: url.resquestAccess}
			const shortUrl = `${baseURL}/${urlCode}`
			url = this.repo.create({
				urlCode,
				longUrl,
				shortUrl,
			})
			await this.repo.save(url);
			return {url: url.shortUrl, resquestAccess: url.resquestAccess};
		} catch (error) {
			console.log(error);
			throw new UnprocessableEntityException("Server Error");
		}
	}
}
