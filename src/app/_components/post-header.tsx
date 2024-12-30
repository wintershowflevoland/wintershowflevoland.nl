import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";
import Avatar from "./avatar";
import CoverImage from "./cover-image";

type Props = {
	title: string;
	coverImage: string;
	date: string;
	author: Author;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
	return (
		<>
			<PostTitle>{title}</PostTitle>
			{/* <div className="hidden md:block md:mb-12">
				<Avatar name={author.name} picture={author.picture} />
			</div> */}
			<div className="mb-8 md:mb-16 sm:mx-0">
				<CoverImage title={title} src={coverImage} />
			</div>
			<div className="max-w-2xl mx-auto" hidden>
				<div className="block md:hidden mb-6">
					<Avatar name={author.name} picture={author.picture} />
				</div>
				<div className="mb-6 text-lg">
					{new Date(date).toLocaleDateString()}
				</div>
			</div>
		</>
	);
}
