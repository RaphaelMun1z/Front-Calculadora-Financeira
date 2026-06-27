export default class ApiService {
	constructor(baseUrl) {
		this.baseUrl = baseUrl.replace(/\/$/, "");
	}

	async fetchCalculation(endpoint, params) {
		const normalizedEndpoint = endpoint.replace(/^\//, "");
		const url = new URL(`${this.baseUrl}/${normalizedEndpoint}`);

		Object.entries(params).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				value.forEach((item) => {
					if (item !== "" && item !== null && item !== undefined) {
						url.searchParams.append(key, item);
					}
				});
				return;
			}

			if (value !== "" && value !== null && value !== undefined) {
				url.searchParams.append(key, value);
			}
		});

		try {
			const response = await fetch(url);

			if (!response.ok) {
				const errorText = await response.text();
				let errorJson;

				try {
					errorJson = JSON.parse(errorText);
				} catch {
					errorJson = { error: errorText || "Erro desconhecido no servidor" };
				}

				throw {
					isBackendError: true,
					status: response.status,
					payload: errorJson,
				};
			}

			const textData = await response.text();

			try {
				const jsonData = JSON.parse(textData);
				return typeof jsonData === "object" ? jsonData : { resultado: jsonData };
			} catch {
				return { resultado: textData };
			}
		} catch (error) {
			console.error("Erro na API:", error);
			throw error;
		}
	}
}
