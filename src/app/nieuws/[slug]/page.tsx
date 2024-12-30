import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../../lib/api";
import markdownToHtml from "../../../lib/markdownToHtml";
import Container from "../../_components/container";
import { PostBody } from "../../_components/post-body";
import { PostHeader } from "../../_components/post-header";

export default async function Nieuws({ params }: Params) {
	const slug = (await params).slug;
	const post = getPostBySlug(slug);

	if (!post) {
		return notFound();
	}

	const content = await markdownToHtml(post.content || "");

	return (
		<div>
			{/* <Alert preview={post.preview} /> */}
			<Container>
				{/* <Header /> */}
				<article className="my-32">
					<PostHeader
						title={post.title}
						coverImage={post.coverImage}
						date={post.date}
						author={post.author}
					/>
					<PostBody content={content} />
				</article>
			</Container>
		</div>
	);
}

type Params = {
	params: Promise<{
		slug: string;
	}>;
};

// export async function generateMetadata({ params }: Params): Promise<Metadata> {
// 	const slug = (await params).slug;
// 	const post = getPostBySlug(slug);

// 	if (!post) {
// 		return notFound();
// 	}

// 	const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

// 	return {
// 		openGraph: {
// 			title,
// 			images: [post.ogImage.url],
// 		},
// 	};
// }

export function generateStaticParams() {
	const posts = getAllPosts();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}
