import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUrl } from "../services/url/call";
import { useToast } from "../context/toastContext";

const Redirect = () => {
	const { code } = useParams();
	const navigate = useNavigate();
	const { showToast } = useToast();
	useEffect(() => {
		let isMounted = true;
		if (!code) return;
			getUrl(code).then((res) => {
				window.location.href = res.request.responseURL;
		}).catch(() => {
			if (isMounted) {
				showToast("This URL does not exist 🚨", "danger");
				navigate("/");
			}
		});
		return () => {
			isMounted = false;
		};
	}, [code]);
	return null;
};

export default Redirect;