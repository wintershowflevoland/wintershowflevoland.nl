import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import AllNewsCard from "./allNewsCard";

export default function NieuwsComp() {
	const allPosts = getAllPosts();
	return (
		<div id="nieuws-home">
			<h2 className="z-10 text-2xl font-bold pb-2" id="nieuws">
				Nieuws:
			</h2>
			{allPosts.length > 0 && (
				<AllNewsCard posts={allPosts} className="hidden lg:block" />
			)}
			{allPosts.length > 0 && (
				<MoreStories posts={allPosts} className="block lg:hidden" />
			)}
		</div>
	);
}
