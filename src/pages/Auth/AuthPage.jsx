import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth-Slice";
import { FaReact } from "react-icons/fa";
import { RiLoader2Fill } from "react-icons/ri";
import { DarkThemeToggle } from "flowbite-react";

const AuthPage = ({ isSignUp }) => {
	// const [isSignUp, setIsSignUp] = useState(false);

	const [errMessage, setErrMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const confirmPasswordRef = useRef();

	const dispatch = useDispatch();
	// const { isLoggedIn } = useSelector((state) => state.auth);

	const navigate = useNavigate();

	const handleAuthentication = async (event) => {
		event.preventDefault();

		setIsLoading(true);
		setErrMessage("");

		try {
			let userCredential;

			if (!isSignUp) {
				// sign in logic
				userCredential = await signInWithEmailAndPassword(
					auth,
					email,
					password
				);
			} else {
				// sign up logic
				if (password !== confirmPasswordRef.current.value) {
					throw new Error(`Password Doesn't match`);
				}
				userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
			}

			// Extract user info
			const user = userCredential.user;

			const {
				accessToken,
				displayName,
				email: userEmail, // Renamed to userEmail
				emailVerified,
				photoURL,
				uid,
				phoneNumber,
				providerData,
			} = user;

			// Create serializable user object
			const userObj = {
				accessToken,
				displayName,
				email: userEmail, // Renamed to userEmail
				emailVerified,
				photoURL,
				uid,
				phoneNumber,
				providerData,
			};

			// Save user data to localStorage
			// localStorage.setItem("user", JSON.stringify(userObj));
			localStorage.setItem("token", accessToken);
			console.log(userObj);
			// Dispatch user data to Redux store
			dispatch(login(userObj));
			// Navigate after successful authentication
			navigate("/admin", { replace: true });
		} catch (error) {
			console.log(error);

			// Handle error correctly
			const errorCode = error.code;
			const errorMessage = errorCode || error.message || "Unknown error";
			setErrMessage(errorMessage);
			console.log("Error during authentication:", errorMessage);
		} finally {
			// Always stop loading state after request is done
			setIsLoading(false);
			setTimeout(() => setErrMessage(""), 3000);
		}
	};

	useEffect(() => {
		setEmail("");
		setPassword("");
		if (confirmPasswordRef.current) {
			confirmPasswordRef.current.value = "";
		}
	}, [isSignUp]); // Clear inputs when the `isSignUp` state changes

	return (
		<div>
			<section className="bg-gray-50 dark:bg-gray-900 relative">
				<span className="justify-self-center h-fit absolute top-0 right-[50%] translate-x-1/2">
					<DarkThemeToggle className="dark:text-amber-500 text-blue-600" />
				</span>
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<b
						htmlFor="#"
						className="flex items-center mb-6 text-3xl font-semibold font-poppins text-teal-500"
					>
						<img className="w-8 h-8" src="/vite.svg" alt="logo" />
						<span className="text-lg text-coral-red mx-2">+</span>
						<FaReact className="aniduration w-8 h-8 mr-2 text-teal-600 dark:text-teal-400 animate-spin" />
						React Admin
					</b>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								{isSignUp
									? "Sign in to your account"
									: "Create an account"}
							</h1>
							<form
								onSubmit={handleAuthentication}
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
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
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
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										name="password"
										id="password"
										className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="••••••••"
										required=""
										autoComplete="current-password"
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
											ref={confirmPasswordRef}
											type="password"
											name="confirm-password"
											id="confirm-password"
											className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="••••••••"
											required=""
											autoComplete="confirm-password"
										/>
									</div>
								)}
								<span
									className={`err p-1 flex h-8 text-red-500 ${errMessage ? "visible" : "invisible"}`}
								>
									{errMessage}
								</span>
								<div
									className={`info flex items-center ${!isSignUp ? "justify-between" : ""}`}
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
									className="w-full h-10 text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 inline-flex items-center justify-center"
								>
									{!isLoading && (
										<span>
											{isSignUp ? "Sign up" : "Sign in"}
										</span>
									)}
									{isLoading && (
										<p className="inline-flex items-center gap-3 justify-center animate-pulse">
											<span className=" ">
												Authenticating
											</span>
											<RiLoader2Fill className="w-5 h-5 animate-spin aniduration2" />
										</p>
									)}
								</button>
								{!isSignUp && (
									<p className="text-sm font-light text-gray-800 dark:text-gray-400">
										Don’t have an account yet?{" "}
										<Link
											to="/signup"
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
