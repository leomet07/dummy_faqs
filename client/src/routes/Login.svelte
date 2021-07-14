<script>
	let email_input;
	let password_input;
	import { onMount } from "svelte";
	import { navigate } from "svelte-routing";
	import { validauthtoken } from "../stores";

	async function login_handler(e) {
		e.preventDefault();
		console.log({ email_input, password_input });

		let response = await fetch(window.BASE_URL + "/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email_input,
				password: password_input,
			}),
		});

		let responsejson = await response.json();

		console.log(responsejson);

		if (responsejson.logged_in) {
			let token = responsejson.token;
			window.localStorage.setItem("auth-token", token);
			$validauthtoken = token;
			navigate("/", { replace: true });
		}
	}

	onMount(async () => {
		if ($validauthtoken != "") {
			navigate("/", { replace: true });
		}
	});
</script>

<h1>Login</h1>
{#if $validauthtoken == ""}
	<form on:submit={login_handler}>
		<input type="email" bind:value={email_input} />
		<input type="password" bind:value={password_input} />
		<input type="submit" id="submit_button" value="Send" />
	</form>
{:else}
	<h1>No need to login if you are already logged in.</h1>
{/if}
