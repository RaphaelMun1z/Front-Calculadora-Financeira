import ApiService from "./api.js";
import CalculatorUI from "./ui.js";

const isLocalhost = false;

document.addEventListener("DOMContentLoaded", () => {
	const baseUrl = isLocalhost
		? "http://localhost:8080"
		: "https://spring-calculadora-financeira.onrender.com";

	const apiService = new ApiService(baseUrl);
	new CalculatorUI(apiService);
});
