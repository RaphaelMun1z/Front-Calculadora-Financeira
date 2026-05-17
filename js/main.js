import ApiService from "./api.js";
import CalculatorUI from "./ui.js";

const isLocalhost = false;

document.addEventListener("DOMContentLoaded", () => {
	const baseUrl = isLocalhost ? 
	"http://localhost:8080/capitalizacao-simples" : 
	"https://spring-calculadora-financeira.onrender.com/capitalizacao-simples";

	const apiService = new ApiService(baseUrl);
	const app = new CalculatorUI(apiService);
});