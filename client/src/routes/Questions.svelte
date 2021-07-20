<script>
	let questions = [];
	import { validauthtoken } from "../stores";
	(async () => {
		validauthtoken.subscribe(async (val) => {
			if (val != "") {
				questions = await get_questions({}, val);
				console.log(questions);
			}
		});
	})();
	async function get_questions(body, auth_token) {
		let response = await fetch(window.BASE_URL + "/api/db/get_questions", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				"auth-token": auth_token,
			},
		});
		let json = await response.json();
		return json.questions;
	}
</script>

<main id="questions_main">
	<h1>Questions</h1>
	{#each questions as question}
		<h4>
			Question: {question.question}
		</h4>
		<h4>
			Answer: {question.answer}
		</h4>
	{/each}
</main>

<style>
	#questions_main {
		text-align: center;
	}
</style>
