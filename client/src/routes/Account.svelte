<script>
	import { validauthtoken } from "../stores";

	let user_data;

	(async () => {
		validauthtoken.subscribe(async (val) => {
			if (val != "") {
				user_data = await get_user_data(val);
				console.log(user_data);
			}
		});
	})();
	async function get_user_data(auth_token) {
		let response = await fetch(
			window.BASE_URL + "/api/auth/user/info/" + auth_token
		);
		let json = await response.json();
		return json.user;
	}
</script>

<h1>Account</h1>
{#if user_data}
	<h3>Name: {user_data.name}</h3>
	<h3>Email: {user_data.email}</h3>
{:else}
	<h2>Loading</h2>{/if}
