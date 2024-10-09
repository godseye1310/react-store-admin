const ImgDummy = ({ img, perc }) => {
	return (
		<div className="relative flex items-center justify-between w-full gap-3 rounded-lg bg-slate-300 dark:bg-white/15 p-3">
			{/* UpLoading State */}
			{perc > 0 && perc < 100 && (
				<div className="absolute left-1/2 -translate-x-1/2 px-6 py-3 text-sm w-[90%] backdrop-blur font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full dark:bg-blue-900/65 dark:text-blue-200">
					<p className="animate-pulse">
						Uploading Image... {perc?.toFixed(0)}%
					</p>
				</div>
			)}
			<img
				className="size-24 rounded object-cover"
				src={
					img
						? URL.createObjectURL(img)
						: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
				}
				alt="image border border-gray-200 rounded-lg dark:border-gray-800"
			/>
			<span className="text-xs font-palanquin flex-1">
				{img?.name || "Product Image title"}
			</span>
		</div>
	);
};

export default ImgDummy;
