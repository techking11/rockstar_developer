import {
	Box,
	Alert,
	Button,
	Typography,
	OutlinedInput,
	InputAdornment,
} from "@mui/material";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:8888/users";

export default function Login() {
	const nameInput = useRef();
	const handleInput = useRef();
	const profileInput = useRef();
	const passwordInput = useRef();

	const [hasError, setHasError] = useState(false);
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

					const name = nameInput.current.value;
					const handle = handleInput.current.value;
					const profile = profileInput.current.value;
					const password = passwordInput.current.value;


					
					(async () => {
						const res = await fetch(url, {
							method: 'post',
							body: JSON.stringify({
								name,
								handle,
								profile,
								password,
							}),
							headers: {
								"Content-Type": "application/json",
							}
			
						});
			
						if(res.ok) navigate("/login") ;
						else setHasError(true);
					})();

				}}>

				<OutlinedInput
					required
					inputRef={nameInput}
					placeholder="Name"
					fullWidth={true}
					sx={{ mb: 2 }}
				/>

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
					inputRef={profileInput}
					placeholder="Profile"
					fullWidth={true}
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
					Register
				</Button>
			</form>
		</Box>
	);
}