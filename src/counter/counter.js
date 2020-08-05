import './counter.css';

const template = document.querySelector("#counter");

export default function Counter(step) {
	this.totalSteps = 0;

	const counter = template.content.cloneNode(true);

	counter.querySelector(".counter-step").innerText = step;

	const totalStepsEl = counter.querySelector(".counter-total");
	totalStepsEl.innerText = this.totalSteps;

	const stepper = counter.querySelector(".stepper");
	stepper.addEventListener("click", e => {
		e.preventDefault();
		totalStepsEl.innerText = this.totalSteps += step;
	});

	return counter;
}