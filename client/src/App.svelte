<!-- App.svelte -->
<script>
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	import FAQS from "./routes/FAQS.svelte";
	import Account from "./routes/Account.svelte";
	import Questions from "./routes/Questions.svelte";

	window.BASE_URL = "https://dummyfaqs.herokuapp.com";
	if (
		window.location.hostname == "localhost" ||
		window.location.hostname == "127.0.0.1"
	) {
		console.log("In development mode");
		window.BASE_URL = "http://127.0.0.1:4269";
	}

	export let url = "";
</script>

<Router {url}>
	<nav>
		<Link to="/">Home</Link> |
		<Link to="faqs">Faqs</Link> |
		<Link to="questions">Questions</Link> |
		<Link to="account">Account</Link> |
		<Link to="about">About</Link>
	</nav>
	<div>
		<Route path="about"><About /></Route>
		<Route path="faqs"><FAQS /></Route>
		<Route path="questions"><Questions /></Route>
		<Route path="account"><Account /></Route>
		<Route path="/"><Home /></Route>
	</div>
</Router>

<style>
	nav {
		text-align: center;
	}
</style>
