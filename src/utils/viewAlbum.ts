import { s3 } from "./S3instance";

export const viewAlbums = async function (val: any) {
	const albumBucketName = "dataspan.frontend-home-assignment";
	var bucketUrl =
		"https://s3.eu-central-1.amazonaws.com/" + albumBucketName + "/";
	try {
		const data: any = await s3
			.listObjects({
				Prefix: val,
				Bucket: "dataspan.frontend-home-assignment",
			})
			.promise();

		return data.Contents.map((photo: any) => ({
			photoKey: photo.Key,
			photoUrl: bucketUrl + encodeURIComponent(photo.Key),
			...photo,
		})).filter(
			({ photoUrl }: { photoUrl: string }) =>
				photoUrl.endsWith(".jpg") || photoUrl.endsWith(".png")
		);
	} catch (error) {}
};
