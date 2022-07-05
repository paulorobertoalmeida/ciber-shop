
const checkout = [
	{
		element: document.getElementById("fName"),
		regexp: /^[A-Za-z]{3,}$/,
		value: function () {
			return this.element.value;
		},
	},
	{
		element: document.getElementById("fLastN"),
		regexp: /^[A-Za-z]{3,}$/,
		value: function () {
			return this.element.value;
		},
	},
	{
		element: document.getElementById("fEmail"),
		regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		value: function () {
			return this.element.value;
		},
	},
	{
		element: document.getElementById("fPassword"),
		regexp: /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/,
		value: function () {
			return this.element.value;
		},
	},
	{
		element: document.getElementById("fAddress"),
		regexp: /^(?! )[A-Za-z0-9\s]{3,}$/,
		value: function () {
			return this.element.value;
		},
	},
	{
		element: document.getElementById("fPhone"),
		regexp: /^[0-9]{9}$/,
		value: function () {
			return this.element.value;
		},
	},
];

// Get form
let parentForm = document.querySelector("#checkout-form");
// Bind event submit to form
// https://developer.mozilla.org/en-US/docs/Web/Events link for reference
if (parentForm) {
	parentForm.addEventListener("submit", validate);
}

// Exercise 6
const validate = (e) => {
	for (let input of checkout) {
		if (input.regexp.test(input.value())) { 
			input.element.classList.remove("is-invalid");
			input.element.classList.add("is-valid");
		} else {
			input.element.classList.remove("is-valid");
			input.element.classList.add("is-invalid");
			e.preventDefault();
		}
	}
	console.log(e); 
}
