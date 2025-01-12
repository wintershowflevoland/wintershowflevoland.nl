"use client";
import { PostBody } from "@/app/_components/post-body";
import type { Post } from "@/interfaces/post";
import markdownToHtml from "@/lib/markdownToHtml";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";

type Props = {
	posts: Post[];
	className?: string;
};

export default function AllNewsCard({ posts, className = "" }: Props) {
	const [selectedPost, setSelectedPost] = useState<Post>(
		posts.find((p) => p.slug === "over-wintershow-flevoland-commissie") ||
			posts[0]
	);
	const [content, setContent] = useState<string>(
		posts.find((p) => p.slug === "over-wintershow-flevoland-commissie")
			?.content || posts[0].content
	);
	useEffect(() => {
		markdownToHtml(selectedPost.content || "").then((content) => {
			setContent(content);
		});
	}, [selectedPost]);

	return (
		<div className={className}>
			<Card>
				<div className="flex flex-row p-4">
					{/* Left Section with vertical line */}
					<div className="flex-none w-1/4 border-r border-gray-300 pr-4">
						{posts.map((post) => (
							<div onClick={() => setSelectedPost(post)} key={post.slug}>
								<div
									className={
										"flex items-center pb-4 hover:underline hover:cursor-pointer" +
										(selectedPost.slug === post.slug ? " font-bold" : "")
									}
								>
									<div>{post.title}</div>
								</div>
							</div>
						))}
					</div>

					{/* Right Section */}
					<div className="flex-auto pl-4">
						{selectedPost && (
							<div className="max-w-2xl mx-auto">
								<h2 className="text-2xl font-bold pb-2">
									{selectedPost.title}
								</h2>
								<PostBody content={content} />
							</div>
						)}
					</div>
				</div>
			</Card>
		</div>
	);
}
