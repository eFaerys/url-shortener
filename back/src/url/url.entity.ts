import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Url {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({nullable: false})
	urlCode: string;

	@Column({nullable: false})
	longUrl: string;

	@Column({nullable: false})
	shortUrl: string;

	@Column({nullable: false})
	resquestAccess: number = 0;

	@Column({nullable: true})
	expirationDate?: Date;
}
