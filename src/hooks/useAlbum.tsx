import { useEffect, useState } from "react";
import { listAlbums } from "../utils";

const useAlbums = (delimeter: string) => {
	const [loading, setLoading] = useState(true);
	const [albums, setAlbums] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const values = await listAlbums(delimeter);

				setAlbums(values);
			} catch (error) {
				console.error("Error fetching albums:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [delimeter]);

	return { loading, albums };
};

export default useAlbums;
