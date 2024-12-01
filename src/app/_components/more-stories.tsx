import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Post } from "@/interfaces/post";
import Link from "next/link";

type Props = {
	posts: Post[];
};

export function MoreStories({ posts }: Props) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
			{posts.map((post) => (
				<Card key={post.slug}>
					<CardHeader>
						<img
							src={post.coverImage}
							alt={post.title}
							className=" rounded-t-md"
						/>
						<CardTitle>{post.title}</CardTitle>
						<CardDescription>
							{new Date(post.date).toLocaleDateString()}
						</CardDescription>
					</CardHeader>
					<CardContent className="grow">
						<p>
							{post.excerpt.length > 100
								? post.excerpt.slice(0, 100) + "..."
								: post.excerpt}
						</p>
					</CardContent>
					<CardFooter>
						<Link
							as={`/posts/${post.slug}`}
							href="/posts/[slug]"
							className="hover:underline"
						>
							<Button>Lees meer</Button>
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}

// <PostPreview
// 	key={post.slug}
// 	title={post.title}
// 	coverImage={post.coverImage}
// 	date={post.date}
// 	author={post.author}
// 	slug={post.slug}
// 	excerpt={post.excerpt}
// />;
