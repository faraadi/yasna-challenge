import './counter.css';

// selecting template element from document fo futher usage.
const template = document.querySelector("#counter");

// Counter could be declarated as class aslo. but class instantiation needs more resources than function calling :)

// Counter returns a new instant of counter template element, defined in index.html. each has a totalSteps and a callback to updated it accroding to privded step value.

export default function Counter(step) {
	//always step starts at zero
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