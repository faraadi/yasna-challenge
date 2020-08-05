import "./styles/index.css";

const counterForm = document.querySelector("#counter-form");
const counterInput = document.querySelector("#counter-input");
const counterBtn = document.querySelector("#counter-btn");

const onAddCounter = e => {
	e.preventDefault();
	const step = Number(counterInput.value);
}

counterForm.addEventListener("submit", onAddCounter);
counterBtn.addEventListener("click", onAddCounter);