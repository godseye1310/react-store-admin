import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthPage = () => {
	const [isSignUp, setIsSignUp] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isErrorVisible, setIsErrorVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const isSignUpHandler = () => {
		setIsSignUp((prev) => !prev);
		// setEmail("");
		// setPassword("");
	};

	const navigate = useNavigate();

	const handleAuthentication = (event) => {
		event.preventDefault();
		setIsLoading(true);
		setIsErrorVisible(false);
		setErrorMessage("");
		if (isSignUp) {
			// sign up logic
		} else {
			// sign in logic
		}

		setIsLoading(false);
		navigate("/", { replace: true });
	};

	return (
		<div>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<b
						htmlFor="#"
						className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
					>
						<img
							className="w-8 h-8 mr-2"
							src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
							alt="logo"
						/>
						Flowbite
					</b>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								{isSignUp
									? "Sign in to your account"
									: "Create an account"}
							</h1>
							<form
								onClick={handleAuthentication}
								className="space-y-4 md:space-y-6"
								action="#"
							>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your email
									</label>
									<input
										type="email"
										name="email"
										id="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@company.com"
										required=""
									/>
								</div>
								{isSignUp && (
									<div>
										<label
											htmlFor="cid"
											disabled
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Company Id
										</label>
										<input
											type="number"
											name="cid"
											id="cid"
											placeholder="**********"
											value="369123691315"
											disabled
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-400/50"
										/>
									</div>
								)}
								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>
									<input
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
									/>
								</div>
								{isSignUp && (
									<div>
										<label
											htmlFor="confirm-password"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Confirm Password
										</label>
										<input
											type="password"
											name="confirm-password"
											id="confirm-password"
											placeholder="••••••••"
											className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											required=""
										/>
									</div>
								)}
								<span className="p-2.5 mt-2">hello</span>
								<div
									className={`flex items-center ${!isSignUp ? "justify-between" : ""}`}
								>
									{!isSignUp && (
										<Link
											// to="/forgot-password"
											htmlFor="#"
											className="text-sm font-medium text-teal-600 hover:underline dark:text-teal-500"
										>
											Forgot password?
										</Link>
									)}
									{isSignUp && (
										<>
											<div className="flex items-center h-5">
												<input
													id="terms"
													aria-describedby="terms"
													type="checkbox"
													className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-teal-600 dark:ring-offset-gray-800"
													required=""
												/>
											</div>
											<div className="ml-3 text-sm">
												<label
													htmlFor="terms"
													className="font-light text-gray-500 dark:text-gray-300"
												>
													I accept the{" "}
													<a
														className="font-medium text-teal-600 hover:underline dark:text-teal-500"
														href="#"
													>
														Terms and Conditions
													</a>
												</label>
											</div>
										</>
									)}
								</div>
								<button
									type="submit"
									className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
								>
									Sign in
								</button>
								{!isSignUp && (
									<p className="text-sm font-light text-gray-800 dark:text-gray-400">
										Don’t have an account yet?{" "}
										<Link
											to="/signup"
											onClick={isSignUpHandler}
											className="font-medium text-teal-600 hover:underline dark:text-teal-500"
										>
											Sign up
										</Link>
									</p>
								)}
								{isSignUp && (
									<p className="text-sm font-light text-gray-800 dark:text-gray-400">
										Already have an account?{" "}
										<Link
											to="/login"
											onClick={isSignUpHandler}
											className="font-medium text-teal-600 hover:underline dark:text-teal-500"
										>
											Login here
										</Link>
									</p>
								)}
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AuthPage;
