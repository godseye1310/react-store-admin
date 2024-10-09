import { IoCloudUploadOutline } from "react-icons/io5";

const ImgFileInput = ({ onChange, disabled }) => {
	return (
		<label
			htmlFor="file-input"
			className={`w-full h-full  flex items-center justify-center bg-transparent ${disabled ? " cursor-default" : "cursor-pointer"}`}
		>
			<p className="flex gap-2 items-center justify-center flex-col">
				<IoCloudUploadOutline className="text-5xl text-slate-500" />
				<input
					type="file"
					name="file"
					id="file-input"
					onChange={onChange}
					className="size-0.5 inline-block opacity-0 bg-transparent"
					required
					disabled={disabled}
				/>
				<span
					className={`text-xs font-medium font-palanquin rounded-xl bg-teal-500 text-white p-2 ${disabled ? "select-none" : "cursor-pointer group-hover:bg-teal-700"}`}
				>
					Choose An Image
				</span>
			</p>
		</label>
	);
};

export default ImgFileInput;
