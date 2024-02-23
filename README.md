# Bone Fracture Detection Dataset

Welcome to the Bone Fracture Detection dataset! This dataset is stored on Amazon S3 and is designed to help with tasks related to identifying bone fractures in medical images. Below, we'll guide you through the structure of the dataset and how you can access it using the AWS JavaScript SDK.

## Dataset Structure

The dataset is organized into three main folders: `test/`, `train/`, and `valid/`. Each of these folders contains the following:

- **Images**: This directory holds the medical images in JPG format.
- **Thumbnails**: Here, you'll find smaller thumbnail versions (100x100 pixels) of the images.
- **Labels**: Each image has an associated text file in this directory. These files use the YOLO format, which describes the location and shape of any fractures detected in the image.

Additionally, there's a file named `data.yaml` that provides some metadata about the dataset, including the number of classes and their names. You can ignore the other details in this file.

## Limitations

Since this dataset contains a large number of images, for the purpose of this guide, we suggest limiting the number of images from each folder to 200.

## Accessing Files

To access the dataset files, you'll need to use the AWS JavaScript SDK. Here's a simple HTML and JavaScript code snippet that demonstrates how to set up and use the SDK to access the dataset:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Accessing Bone Fracture Detection Dataset</title>
		<script src="https://sdk.amazonaws.com/js/aws-sdk-2.928.0.min.js"></script>
	</head>
	<body>
		<script>
			// Configure AWS SDK
			AWS.config.update({
				region: "eu-central-1", // Specify AWS region
				credentials: new AWS.CognitoIdentityCredentials({
					IdentityPoolId: "eu-central-1:31ebe2ab-fc9d-4a2c-96a9-9dee9a9db8b9", // Specify Identity Pool ID
				}),
			});

			// Create S3 object
			const s3 = new AWS.S3({
				apiVersion: "2006-03-01",
				params: { Bucket: "dataspan.frontend-home-assignment" }, // Specify bucket name
			});

			// Use s3 object to interact with dataset files
			// Example:
			// s3.listObjects({ Prefix: 'test/', Bucket: 'dataspan.frontend-home-assignment' }, function(err, data) {
			//     if (err) console.log(err, err.stack);
			//     else console.log(data);
			// });
		</script>
	</body>
</html>
```

## Layout

### Main Pane

- The dataset name is displayed at the top.
- The total number of images is shown in the upper right corner.
- Images are displayed as thumbnails in the center main pane, sorted alphabetically by filename.
- There are four tabs: one for each folder (`test/`, `train/`, `valid/`) and one for all combined (`All Groups`).
- Each image shows its filename below. If the filename is too long, it's truncated with an ellipsis (`…`) and the full name is shown in a tooltip on hover.
- Over each image, any detected fractures are highlighted with colored polygons, and the name of the fracture type is displayed on top.
- Pagination is used if the number of images exceeds the available space. Clicking an image opens a pop-up with the full-sized version.

### Left Pane (Filters)

- **Class Filter**: Toggle buttons for each fracture type, with colors indicating each type. Toggling a button filters images to show only those with fractures of that type.
- **Polygon Count Filter**: Range selector to filter images based on the number of detected fractures.
