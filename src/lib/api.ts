import type { FotoAlbum } from "@/interfaces/fotoAlbum";
import { Post } from "@/interfaces/post";
import type { Sponsor } from "@/interfaces/sponsor";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

// Posts will be stored in the _posts directory

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
	return fs
		.readdirSync(postsDirectory)
		.filter((file) => file !== ".gitkeep" && file.endsWith(".md"));
}

export function getPostBySlug(slug: string) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(postsDirectory, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
	const slugs = getPostSlugs();
	const posts = slugs
		.map((slug) => getPostBySlug(slug))
		// sort posts by date in descending order
		.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
	return posts;
}

// Sponsors will be stored in the _sponsor directory

const sponsorsDirectory = join(process.cwd(), "_sponsors");

export function getSponsorSlugs() {
	return fs
		.readdirSync(sponsorsDirectory)
		.filter((file) => file !== ".gitkeep" && file.endsWith(".md"));
}

export function getSponsorBySlug(slug: string) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(sponsorsDirectory, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data } = matter(fileContents);

	return { ...data, slug: realSlug } as Sponsor;
}

export function getAllSponsors(): Sponsor[] {
	const slugs = getSponsorSlugs();
	const sponsors = slugs
		.map((slug) => getSponsorBySlug(slug))
		// sort sponsors by date in descending order
		.sort((sponsor1, sponsor2) => (sponsor1.date > sponsor2.date ? -1 : 1));
	return sponsors;
}

// FotoAlbums will be stored in the _foto-album directory

const fotoAlbumsDirectory = join(process.cwd(), "_foto-album");

export function getFotoAlbumSlugs() {
	return fs
		.readdirSync(fotoAlbumsDirectory)
		.filter((file) => file !== ".gitkeep" && file.endsWith(".md"));
}

export function getFotoAlbumBySlug(slug: string) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(fotoAlbumsDirectory, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data } = matter(fileContents);

	return { ...data, slug: realSlug } as FotoAlbum;
}

export function getAllFotoAlbums(): FotoAlbum[] {
	const slugs = getFotoAlbumSlugs();
	const fotoAlbums = slugs
		.map((slug) => getFotoAlbumBySlug(slug))
		// sort fotoAlbums by date in descending order
		.sort((fotoAlbum1, fotoAlbum2) =>
			fotoAlbum1.date > fotoAlbum2.date ? -1 : 1
		);
	return fotoAlbums.reverse();
}
