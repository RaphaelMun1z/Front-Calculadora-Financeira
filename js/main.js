import ApiService from "./api.js";
import CalculatorUI from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
	// URL base do seu backend
	const baseUrl = "http://localhost:8080/capitalizacao-simples";

	// Instancia as classes
	const apiService = new ApiService(baseUrl);
	const app = new CalculatorUI(apiService);
});
