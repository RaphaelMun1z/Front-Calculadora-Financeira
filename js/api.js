export default class ApiService {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	async fetchCalculation(endpoint, params) {
		const url = new URL(`${this.baseUrl}/${endpoint}`);

		// Anexa os parâmetros na URL (Query Params)
		Object.keys(params).forEach((key) => {
			if (params[key]) url.searchParams.append(key, params[key]);
		});

		try {
			const response = await fetch(url);

			if (!response.ok) {
				const errorText = await response.text();
				let errorJson = null;

				try {
					errorJson = JSON.parse(errorText);
				} catch (e) {
					// Se não for JSON (ex: erro HTML do Tomcat), mantém como string
					errorJson = {
						error: errorText || "Erro desconhecido no servidor",
					};
				}

				// Lança um erro customizado com os dados do backend
				throw {
					isBackendError: true,
					status: response.status,
					payload: errorJson,
				};
			}

			const textData = await response.text();

			try {
				const jsonData = JSON.parse(textData);
				return typeof jsonData === "object"
					? jsonData
					: { resultado: jsonData };
			} catch (e) {
				return { resultado: textData };
			}
		} catch (error) {
			console.error("Erro na API:", error);
			throw error; // Lançado para ser capturado pela interface
		}
	}
}
