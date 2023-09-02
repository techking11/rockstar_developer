import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:8888/posts";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const token = localStorage.getItem("token");

			const res = await fetch(url, {
				headers: {
					"Authorization": `Bearer ${token}`,
				}
			});

			if(res.ok) {
				const data = await res.json();
				setPosts(data);
				setLoading(false);
			}else {
				navigate("/login");
			}
		})();
	}, []);

	return (
		<>
			{loading ? (
				<Box sx={{textAlign: 'center'}}>Loading...</Box>
			) : (
				posts.map(post => {
					return <PostCard key={post._id} post={post} />;
				})
			)}
		</>
	);
}
