"use client";

import { ImageCard } from "../components/modules/ImageCard";
import { GlobalModals } from "../components/GlobalModal";
import { useCallback, useMemo, useState } from "react";
import DashboardTabs from "../components/modules/DashboardTabs";
import { Pagination } from "@ui";
import { useAlbums } from "../hooks";
import SideCard from "../components/modules/SideCard";
import { useSearchParams } from "next/navigation";

export default function Home() {
	const tab = useSearchParams().get("tab") ?? "";
	const [polygon, setPolygon] = useState<number>(0);
	const [classes, setClasses] = useState<number[]>([]);
	const { albums, loading } = useAlbums(tab);
	const [pageCount, setPageCount] = useState(1);
	const startIndex = (pageCount - 1) * 54;

	const getCordinates = useCallback((val: string[]) => {
		const newPoly = val.slice(1); // Remove the first index
		const coordinates = [];
		for (let i = 0; i < newPoly.length; i += 2) {
			const x = parseFloat(newPoly[i]);
			const y = parseFloat(newPoly[i + 1]);
			coordinates.push({ x, y });
		}
		return coordinates;
	}, []);

	const newAlbum = useMemo(
		() =>
			classes.length
				? albums
						.filter((x) => x.photoText.length > polygon)
						?.filter((y) => classes.includes(Number(y?.classes)))
				: albums.filter((x) => x.photoText.length > polygon),
		[albums, classes, polygon]
	);

	return (
		<main className="min-h-screen ">
			<div className="grid gap-x-10  lg:grid-cols-4 lg:px-8">
				<div className="col-span-1 hidden lg:block border rounded-2xl px-4 py-3">
					<SideCard
						polygon={polygon}
						setPolygon={setPolygon}
						classe={classes}
						setClasses={setClasses}
					/>
				</div>
				<div className="lg:col-span-3 ">
					<div className="flex flex-col ">
						<div className="flex flex-col justify-between mb-12 ">
							<div className="flex justify-between items-baseline">
								<h1 className=" text-[32px] leading-10 font-semibold">
									Bone-fracture-detection
								</h1>
								<div className="flex gap-x-1.5 text-base leading-5 font-bold">
									<span>
										{54 * pageCount > newAlbum?.length
											? newAlbum?.length
											: 54 * pageCount}
									</span>
									<span className="font-normal text-[#586A78]">0f</span>
									<span>{newAlbum?.length || 0}</span>
									<span className="font-normal text-[#586A78]">images</span>
								</div>
							</div>
						</div>
						<div className=" flex mb-6">
							<DashboardTabs tab={tab} />
						</div>
						{loading ? (
							<div className="h-[50vh] flex justify-center items-center">
								<div className="h-10 w-10 animate-spin rounded-full border-2 border-[grey] border-t-white m-auto" />
							</div>
						) : (
							<>
								<div className="grid grid-cols-3  lg:grid-cols-9 gap-2 mb-6">
									{newAlbum
										?.slice(startIndex, startIndex + 54)
										?.map(({ photoKey, photoUrl, photoText, classes }: any) => (
											<ImageCard
												key={photoKey}
												photoUrl={photoUrl}
												coordinates={getCordinates(photoText)}
												classes={classes}
											/>
										))}
								</div>
								<div className="flex justify-center mb-5">
									<Pagination
										isLoading={loading}
										pageCount={Math.ceil(newAlbum?.length / 54) || 1}
										onPageChange={(val) => setPageCount(val)}
										page={pageCount}
									/>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<GlobalModals />
		</main>
	);
}
