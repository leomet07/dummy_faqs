<!-- App.svelte -->
<script>
	import { onMount } from "svelte";
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	import FAQS from "./routes/FAQS.svelte";
	import Account from "./routes/Account.svelte";
	import Questions from "./routes/Questions.svelte";
	import Login from "./routes/Login.svelte";
	import { validauthtoken } from "./stores";

	window.BASE_URL = "https://dummyfaqs.herokuapp.com";
	if (
		window.location.hostname == "localhost" ||
		window.location.hostname == "127.0.0.1"
	) {
		console.log("In development mode");
		window.BASE_URL = "http://127.0.0.1:4269";
	}

	onMount(async () => {
		const localAuthToken = window.localStorage.getItem("auth-token");

		console.log("Local Auth Token: ", localAuthToken);

		if (localAuthToken) {
			// Verify the token
			const response = await fetch(
				window.BASE_URL + "/api/auth/verify/" + localAuthToken,
				{
					method: "GET",
					headers: {},
				}
			);

			const verifyjson = await response.json();
			console.log(verifyjson);
			if (verifyjson.valid) {
				console.log("Saved auth token is valid");
				$validauthtoken = localAuthToken;
			} else {
				console.log("Saved auth token is invalid");
				$validauthtoken = "";
			}
		}
	});

	export let url = "";
</script>

<Router {url}>
	<nav>
		<Link to="/">Home</Link> |
		{#if $validauthtoken}
			<Link to="faqs">Faqs</Link> |
			<Link to="questions">Questions</Link> |
			<Link to="account">Account</Link> |
		{:else}
			<Link to="login">Login</Link> |
		{/if}

		<Link to="about">About</Link>
	</nav>
	<div>
		<Route class="route" path="about"><About /></Route>
		{#if $validauthtoken}
			<Route class="route" path="faqs"><FAQS /></Route>
			<Route class="route" path="questions"><Questions /></Route>
			<Route class="route" path="account"><Account /></Route>
		{:else}
			<Route class="route" path="login"><Login /></Route>
		{/if}

		<Route class="route" path="/"><Home /></Route>
	</div>
</Router>

<style>
	nav {
		text-align: center;
	}
</style>
