<script>
	let faqs = [];
	import { validauthtoken } from "../stores";
	(async () => {
		validauthtoken.subscribe(async (val) => {
			if (val != "") {
				faqs = await get_faqs({}, val);
				console.log(faqs);
			}
		});
	})();
	async function get_faqs(body, auth_token) {
		let response = await fetch(window.BASE_URL + "/api/db/get_faqs", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				"auth-token": auth_token,
			},
		});
		let json = await response.json();
		return json.faqs;
	}
</script>

<main id="faqs_main">
	<h1>FAQS</h1>
	{#each faqs as faq}
		<h4>
			Question: {faq.question}
		</h4>
		<h4>
			Answer: {faq.answer}
		</h4>
	{/each}
</main>

<style>
	#faqs_main {
		text-align: center;
	}
</style>
