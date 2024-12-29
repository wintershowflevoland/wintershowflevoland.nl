import { getAllFotoAlbums } from "@/lib/api";
import FotoAlbum from "./fotoAlbum";

export default function FotosComp() {
	const allFotoAlbums = getAllFotoAlbums();
	return (
		<div>
			<h2 className="text-2xl font-bold pb-2" id="fotos">
				Fotos:
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
				{allFotoAlbums.map((album) => (
					<FotoAlbum
						key={album.slug}
						albumTitle={album.title}
						albumUrl={album.url}
					/>
				))}
			</div>
		</div>
	);
}
