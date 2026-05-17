import ApiService from "./api.js";
import CalculatorUI from "./ui.js";


document.addEventListener("DOMContentLoaded", () => {
	const baseUrl = "http://localhost:8080/capitalizacao-simples";

	const apiService = new ApiService(baseUrl);
	const app = new CalculatorUI(apiService);
});