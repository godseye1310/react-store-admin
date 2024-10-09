const ImgDisplay = ({ imgArr = [] }) => {
	return (
		<div className="flex flex-wrap min-h-36 items-center justify-start w-full gap-3 rounded-lg bg-slate-100 bg-black/10 dark:bg-white/10 p-3">
			{imgArr.map((img, i) => (
				<img
					key={i}
					src={img}
					alt="product image"
					className="size-32 rounded object-cover"
				/>
			))}
		</div>
	);
};

export default ImgDisplay;
