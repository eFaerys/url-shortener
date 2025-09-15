import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Url } from "./url/url.entity";
import { UrlModule } from "./url/url.module";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "sqlite",
			database: "URL.sqlite",
			entities: [Url],
			synchronize: true,
		}),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		UrlModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
