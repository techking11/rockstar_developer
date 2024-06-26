import {
	Box,
	Alert,
	Button,
	Typography,
	OutlinedInput,
	InputAdornment,
} from "@mui/material";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const handleInput = useRef();
	const passwordInput = useRef();

	const [hasError, setHasError] = useState(false);

	const url = "http://localhost:8888/login";
	const navigate = useNavigate();

	return (
		<Box>
			<Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
				Login
			</Typography>

			{hasError && (
				<Alert severity="warning" sx={{ mb: 3 }}>
					Handle or password incorrect
				</Alert>
			)}

			<form
				onSubmit={e => {
					e.preventDefault();

					setHasError(false);

					const handle = handleInput.current.value;
					const password = passwordInput.current.value;


					(async () => {
						const res = await fetch(url, {
							method: 'post',
							body: JSON.stringify({
								handle,
								password,
							}),
							headers: {
								"Content-Type": "application/json",
							}
			
						});
			
						if(res.ok) navigate("/");
						else setHasError(true);
					})();
				}}>
				<OutlinedInput
					required
					inputRef={handleInput}
					placeholder="Handle"
					fullWidth={true}
					startAdornment={
						<InputAdornment position="start">@</InputAdornment>
					}
					sx={{ mb: 2 }}
				/>

				<OutlinedInput
					required
					inputRef={passwordInput}
					placeholder="Password"
					fullWidth={true}
					inputProps={{ type: "password" }}
					sx={{ mb: 3 }}
				/>

				<Button
					type="submit"
					variant="contained"
					color="info"
					fullWidth={true}>
					Login
				</Button>
			</form>
		</Box>
	);
}
