import "./styles/index.css";
import Counter from './counter';

const counters = document.querySelector("#counters");

if (document.createElement("template").content) {
	const counterForm = document.querySelector("#counter-form");
	const counterInput = document.querySelector("#counter-input");
	const counterBtn = document.querySelector("#counter-btn");

	const onAddCounter = e => {
		e.preventDefault();
		const step = Number(counterInput.value);

		counters.appendChild(new Counter(step))
		counterInput.value = null;
	}

	counterForm.addEventListener("submit", onAddCounter);
	counterBtn.addEventListener("click", onAddCounter);
}
else {
	counters.innerHTML = `
	<div class="col browser-not-support-wrapper">
		<div class='card'>
			<div class='card-body'>
				<p>Sorry, your browser does not supports html templates. try the latest version of major browsers</p>
			</div>
		</div>
	</div>
	`;
}