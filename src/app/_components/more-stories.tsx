import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Post } from "@/interfaces/post";
import Link from "next/link";

type Props = {
	posts: Post[];
	className?: string;
};

export function MoreStories({ posts, className = "" }: Props) {
	return (
		<div className={className}>
			<div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 ">
				{posts.map((post) => (
					<Card key={post.slug}>
						<CardHeader>
							<img
								src={post.coverImage}
								alt={post.title}
								className={
									" rounded-t-md" + " " + (post.coverImage ? "" : " hidden")
								}
							/>
							<CardTitle>{post.title}</CardTitle>
							{/* <CardDescription>
							{new Date(post.date).toLocaleDateString()}
						</CardDescription> */}
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
								as={`/nieuws/${post.slug}`}
								href="/nieuws/[slug]"
								className="hover:underline"
							>
								<Button>Lees meer</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
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
