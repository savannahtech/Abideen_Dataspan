import { s3 } from "./S3instance";

export const fetchTextFileFromS3 = async (fileUrl: string) => {
	try {
		const response = await fetch(fileUrl);
		if (!response.ok) {
			throw new Error("Failed to fetch the file");
		}
		const text = await response.text();
		return text.split(" ");
	} catch (error) {
		console.error("Error fetching text file from S3:", error);
		return [];
	}
};

export const listAlbums = async (val: string) => {
	const albumBucketName = "dataspan.frontend-home-assignment";
	const bucketUrl = `https://s3.eu-central-1.amazonaws.com/${albumBucketName}/`;

	try {
		const data: any = await s3
			.listObjectsV2({
				Delimiter: val,
				Bucket: albumBucketName,
				MaxKeys: 200,
			})
			.promise();

		if (data.Contents && data.Contents.length > 0) {
			return Promise.all(
				data.Contents.map(async (photo: any) => {
					if (photo.Key.endsWith(".jpg") || photo.Key.endsWith(".png")) {
						const text = await fetchTextFileFromS3(
							bucketUrl +
								photo.Key.replace(/\.jpg$|\.png$/, ".txt").replace(
									"images",
									"labels"
								)
						);
						return {
							photoKey: photo.Key,
							photoUrl: bucketUrl + encodeURIComponent(photo.Key),
							photoText: text,
							classes: text[0],
						};
					}
					return null;
				})
			).then((albums) => albums.filter((album) => album !== null));
		} else {
			console.log("No albums found.");
			return [];
		}
	} catch (error) {
		console.error("Error listing albums:", error);
		return [];
	}
};
