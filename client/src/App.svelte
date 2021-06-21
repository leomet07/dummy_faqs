<!-- App.svelte -->
<script>
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	import FAQS from "./routes/FAQS.svelte";
	import Account from "./routes/Account.svelte";
	import Questions from "./routes/Questions.svelte";

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
		<Route path="about" component={About} />
		<Route path="faqs" component={FAQS} />
		<Route path="questions" component={Questions} />
		<Route path="account" component={Account} />
		<Route path="/"><Home /></Route>
	</div>
</Router>

<style>
	nav {
		text-align: center;
	}
</style>
