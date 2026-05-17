export default class CalculatorUI {
	constructor(apiService) {
		this.api = apiService;
		this.currentOperation = null;

		const rateUnits = [
			{ val: "ao_mes", label: "ao mês" },
			{ val: "ao_ano", label: "ao ano" },
			{ val: "ao_dia", label: "ao dia" },
		];

		const timeUnits = [
			{ val: "meses", label: "Meses" },
			{ val: "anos", label: "Anos" },
			{ val: "dias", label: "Dias" },
		];

		this.operations = [
			{
				id: "vp",
				name: "Valor Presente (VP)",
				endpoint: "valor-presente",
				icon: "ph-coins",
				params: [
					{
						key: "VF",
						label: "Montante (VF)",
						placeholder: "Ex: 1100",
						icon: "ph-money",
					},
					{
						key: "i",
						label: "Taxa (i) decimal",
						placeholder: "Ex: 0.05",
						icon: "ph-percent",
						hasUnits: true,
						unitKey: "unidade_i",
						unitOptions: rateUnits,
					},
					{
						key: "n",
						label: "Tempo (n)",
						placeholder: "Ex: 2",
						icon: "ph-calendar-blank",
						hasUnits: true,
						unitKey: "unidade_n",
						unitOptions: timeUnits,
					},
				],
			},
			{
				id: "vf",
				name: "Valor Futuro (VF)",
				endpoint: "valor-futuro",
				icon: "ph-trend-up",
				params: [
					{
						key: "VP",
						label: "Capital (VP)",
						placeholder: "Ex: 1000",
						icon: "ph-coins",
					},
					{
						key: "i",
						label: "Taxa (i) decimal",
						placeholder: "Ex: 0.05",
						icon: "ph-percent",
						hasUnits: true,
						unitKey: "unidade_i",
						unitOptions: rateUnits,
					},
					{
						key: "n",
						label: "Tempo (n)",
						placeholder: "Ex: 2",
						icon: "ph-calendar-blank",
						hasUnits: true,
						unitKey: "unidade_n",
						unitOptions: timeUnits,
					},
				],
			},
			{
				id: "j",
				name: "Juros (J)",
				endpoint: "juros",
				icon: "ph-hand-coins",
				params: [
					{
						key: "VP",
						label: "Capital (VP)",
						placeholder: "Ex: 1000",
						icon: "ph-coins",
					},
					{
						key: "i",
						label: "Taxa (i) decimal",
						placeholder: "Ex: 0.05",
						icon: "ph-percent",
						hasUnits: true,
						unitKey: "unidade_i",
						unitOptions: rateUnits,
					},
					{
						key: "n",
						label: "Tempo (n)",
						placeholder: "Ex: 2",
						icon: "ph-calendar-blank",
						hasUnits: true,
						unitKey: "unidade_n",
						unitOptions: timeUnits,
					},
				],
			},
			{
				id: "taxa",
				name: "Taxa (i)",
				endpoint: "taxa",
				icon: "ph-percent",
				params: [
					{
						key: "VP",
						label: "Capital (VP)",
						placeholder: "Ex: 1000",
						icon: "ph-coins",
					},
					{
						key: "VF",
						label: "Montante (VF)",
						placeholder: "Ex: 1100",
						icon: "ph-money",
					},
					{
						key: "n",
						label: "Tempo (n)",
						placeholder: "Ex: 2",
						icon: "ph-calendar-blank",
						hasUnits: true,
						unitKey: "unidade_n",
						unitOptions: timeUnits,
					},
				],
			},
			{
				id: "tempo",
				name: "Tempo (n)",
				endpoint: "tempo",
				icon: "ph-hourglass",
				params: [
					{
						key: "VP",
						label: "Capital (VP)",
						placeholder: "Ex: 1000",
						icon: "ph-coins",
					},
					{
						key: "VF",
						label: "Montante (VF)",
						placeholder: "Ex: 1100",
						icon: "ph-money",
					},
					{
						key: "i",
						label: "Taxa (i) decimal",
						placeholder: "Ex: 0.05",
						icon: "ph-percent",
						hasUnits: true,
						unitKey: "unidade_i",
						unitOptions: rateUnits,
					},
				],
			},
			{
				id: "desc-com",
				name: "Tx. Desconto Com. (ic)",
				endpoint: "taxa-desconto-comercial",
				icon: "ph-tag-chevron",
				params: [
					{
						key: "I",
						label: "Taxa Efetiva (I) decimal",
						placeholder: "Ex: 0.10",
						icon: "ph-percent",
						hasUnits: true,
						unitKey: "unidade_I",
						unitOptions: rateUnits,
					},
					{
						key: "n",
						label: "Tempo (n)",
						placeholder: "Ex: 2",
						icon: "ph-calendar-blank",
						hasUnits: true,
						unitKey: "unidade_n",
						unitOptions: timeUnits,
					},
				],
			},
			{
				id: "tx-efetiva",
				name: "Taxa Efetiva (i)",
				endpoint: "taxa-efetiva",
				icon: "ph-chart-line-up",
				params: [
					{
						key: "Ic",
						label: "Taxa Comercial (Ic) decimal",
						placeholder: "Ex: 0.05",
						icon: "ph-percent",
						hasUnits: true,
						unitKey: "unidade_Ic",
						unitOptions: rateUnits,
					},
					{
						key: "n",
						label: "Tempo (n)",
						placeholder: "Ex: 2",
						icon: "ph-calendar-blank",
						hasUnits: true,
						unitKey: "unidade_n",
						unitOptions: timeUnits,
					},
				],
			},
		];

		this.initElements();
		this.renderMenu();
		this.bindEvents();
	}

	initElements() {
		this.menuContainer = document.getElementById("operation-menu");
		this.formTitle = document.getElementById("form-title");
		this.formSubtitle = document.getElementById("form-subtitle");
		this.calcForm = document.getElementById("calc-form");
		this.dynamicInputs = document.getElementById("dynamic-inputs");
		this.emptyState = document.getElementById("empty-state");
		this.resultCard = document.getElementById("result-card");
		this.resultValue = document.getElementById("result-value");

		this.submitBtn = document.getElementById("submit-btn");
		this.btnIcon = document.getElementById("btn-icon");
		this.spinner = document.getElementById("loading-spinner");
		this.btnText = document.getElementById("btn-text");
	}

	renderMenu() {
		this.menuContainer.innerHTML = "";
		this.operations.forEach((op) => {
			const btn = document.createElement("button");
			btn.className =
				"w-full text-left px-4 py-3 rounded-sm transition-colors duration-200 flex items-center gap-3 font-medium text-slate-600 hover:bg-sky-50 hover:text-primary border border-transparent outline-none focus:ring-2 focus:ring-sky-100";
			btn.dataset.id = op.id;
			btn.innerHTML = `<i class="ph ${op.icon} text-xl"></i> <span>${op.name}</span>`;

			btn.addEventListener("click", () => this.selectOperation(op, btn));
			this.menuContainer.appendChild(btn);
		});
	}

	selectOperation(operation, buttonElement) {
		this.currentOperation = operation;

		Array.from(this.menuContainer.children).forEach((btn) => {
			btn.classList.remove(
				"bg-sky-100",
				"text-primary",
				"border-sky-200",
			);
			btn.classList.add("text-slate-600", "border-transparent");
		});
		buttonElement.classList.add(
			"bg-sky-100",
			"text-primary",
			"border-sky-200",
		);
		buttonElement.classList.remove("text-slate-600", "border-transparent");

		this.formTitle.textContent = `Calcular ${operation.name}`;
		this.formSubtitle.textContent = `Preencha os dados para obter o resultado da rota /${operation.endpoint}`;

		this.dynamicInputs.innerHTML = "";
		operation.params.forEach((param) => {
			const inputClass = param.hasUnits
				? "w-full sm:w-2/3 pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-sm sm:rounded-r-none focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
				: "w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all";

			let selectHtml = "";
			if (param.hasUnits) {
				const optionsHtml = param.unitOptions
					.map(
						(opt) =>
							`<option value="${opt.val}">${opt.label}</option>`,
					)
					.join("");
				selectHtml = `
                    <select name="${param.unitKey}" class="w-full sm:w-1/3 bg-slate-50 border border-slate-300 sm:border-l-0 rounded-sm sm:rounded-l-none px-2 py-2.5 sm:py-0 text-sm text-slate-700 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all hover:bg-slate-100 cursor-pointer mt-2 sm:mt-0">
                        ${optionsHtml}
                    </select>
                `;
			}

			const containerClass = param.hasUnits
				? "relative flex flex-col sm:flex-row"
				: "relative flex";

			const inputHtml = `
                <div class="flex flex-col gap-1 fade-in w-full">
                    <label for="${param.key}" class="text-sm font-semibold text-slate-700 ml-1">${param.label}</label>
                    <div class="${containerClass}">
                        <div class="absolute top-0 left-0 h-10 sm:h-full pl-3 flex items-center pointer-events-none text-slate-400 z-10">
                            <i class="ph ${param.icon} text-lg"></i>
                        </div>
                        <input type="number" step="any" id="${param.key}" name="${param.key}" placeholder="${param.placeholder}" required
                            class="${inputClass}">
                        ${selectHtml}
                    </div>
                </div>
            `;
			this.dynamicInputs.insertAdjacentHTML("beforeend", inputHtml);
		});

		this.emptyState.classList.add("hidden");
		this.calcForm.classList.remove("hidden");
		this.resultCard.classList.add("hidden");
	}

	bindEvents() {
		this.calcForm.addEventListener("submit", async (e) => {
			e.preventDefault();
			if (!this.currentOperation) return;

			this.setLoading(true);
			this.resultCard.classList.add("hidden");

			const formData = new FormData(this.calcForm);
			const params = {};
			for (let [key, value] of formData.entries()) {
				params[key] = value;
			}

			try {
				const data = await Promise.all([
					this.api.fetchCalculation(
						this.currentOperation.endpoint,
						params,
					),
					new Promise((res) => setTimeout(res, 600)),
				]).then((results) => results[0]);

				this.showResult(data);
			} catch (error) {
				this.showErrorPopup(error);
			} finally {
				this.setLoading(false);
			}
		});
	}

	showErrorPopup(error) {
		// Cenário 1: O erro veio do backend (Validação, Regra de Negócio, etc)
		if (error && error.isBackendError && error.payload) {
			const data = error.payload;

			// Tratamento específico para o objeto "messages" de validação do Spring Boot
			if (data.messages && typeof data.messages === "object") {
				let errorListHtml =
					'<ul class="text-left text-sm text-slate-600 mt-3 list-disc list-inside bg-slate-50 p-4 rounded-sm border border-slate-200">';

				for (const [field, msg] of Object.entries(data.messages)) {
					errorListHtml += `<li><strong>Dado '${field}':</strong> ${msg}</li>`;
				}
				errorListHtml += "</ul>";

				Swal.fire({
					html: `
                                <div class="flex flex-col items-center pt-6 pb-2">
                                    <div class="bg-amber-50 text-amber-500 p-4 rounded-full mb-5 shadow-sm">
                                        <i class="ph ph-warning-circle text-5xl"></i>
                                    </div>
                                    <h3 class="text-xl font-bold text-slate-800 font-sans mb-1">${data.error || "Dados Inválidos"}</h3>
                                    <p class="text-sm text-slate-500 font-sans">Por favor, corrija os problemas abaixo:</p>
                                    <div class="w-full mt-2">
                                        ${errorListHtml}
                                    </div>
                                </div>
                            `,
					showConfirmButton: true,
					confirmButtonText: "Entendi, vou corrigir",
					buttonsStyling: false,
					customClass: {
						popup: "custom-swal-popup shadow-2xl",
						container: "font-sans",
						actions: "pb-8 pt-2 w-full px-8",
						confirmButton:
							"w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-sm transition-all focus:ring-4 focus:ring-slate-200 outline-none",
					},
				});
				return; // Para a execução aqui
			}

			// Caso seja um erro tratado do backend, mas sem a estrutura "messages"
			Swal.fire({
				html: `
                            <div class="flex flex-col items-center pt-6 pb-2">
                                <div class="bg-rose-50 text-rose-500 p-4 rounded-full mb-5 shadow-sm">
                                    <i class="ph ph-x-circle text-5xl"></i>
                                </div>
                                <h3 class="text-xl font-bold text-slate-800 font-sans mb-2">${data.error || "Erro no Cálculo"}</h3>
                                <p class="text-sm text-slate-500 font-sans text-center">${data.message || "Verifique os valores informados e tente novamente."}</p>
                            </div>
                        `,
				showConfirmButton: true,
				confirmButtonText: "Tentar novamente",
				buttonsStyling: false,
				customClass: {
					popup: "custom-swal-popup shadow-2xl",
					container: "font-sans",
					actions: "pb-8 pt-4 w-full px-8",
					confirmButton:
						"w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-sm transition-all focus:ring-4 focus:ring-slate-200 outline-none",
				},
			});
			return;
		}

		// Cenário 2: Erro genérico (Servidor offline, CORS bloqueado, Sem internet)
		Swal.fire({
			html: `
                        <div class="flex flex-col items-center pt-8 pb-4">
                            <div class="bg-rose-50 text-rose-500 p-4 rounded-full mb-5 shadow-sm">
                                <i class="ph ph-plugs text-5xl"></i>
                            </div>
                            <h3 class="text-xl font-bold text-slate-800 font-sans mb-3">Servidor Inacessível</h3>
                            <p class="text-sm text-slate-500 font-sans leading-relaxed px-4 text-center">
                                Não conseguimos conectar com a sua API.<br/>
                                Certifique-se de que o backend está rodando em<br/>
                                <strong class="text-slate-700 bg-slate-100 px-2 py-0.5 rounded">localhost:8080</strong>
                            </p>
                        </div>
                    `,
			showConfirmButton: true,
			confirmButtonText: "Entendi, vou verificar",
			buttonsStyling: false,
			customClass: {
				popup: "custom-swal-popup shadow-2xl",
				container: "font-sans",
				actions: "pb-8 pt-0 w-full px-8",
				confirmButton:
					"w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-sm transition-all focus:ring-4 focus:ring-slate-200 outline-none",
			},
		});
	}

	showResult(data) {
		let finalValue = "---";

		if (data && typeof data === "object") {
			if (data.resultado !== undefined) finalValue = data.resultado;
			else if (data.valor !== undefined) finalValue = data.valor;
			else {
				const firstKey = Object.keys(data)[0];
				if (firstKey) finalValue = data[firstKey];
			}
		} else {
			finalValue = data;
		}

		if (!isNaN(finalValue) && finalValue.toString().includes(".")) {
			finalValue = parseFloat(finalValue).toFixed(4);
		}

		this.resultValue.textContent = finalValue;

		this.resultCard.classList.remove("hidden");
		this.resultCard.classList.remove("fade-in");
		void this.resultCard.offsetWidth;
		this.resultCard.classList.add("fade-in");
	}

	setLoading(isLoading) {
		if (isLoading) {
			this.spinner.classList.remove("hidden");
			this.btnIcon.classList.add("hidden");
			this.btnText.textContent = "Calculando...";
			this.submitBtn.classList.add(
				"opacity-90",
				"cursor-not-allowed",
				"pointer-events-none",
			);
		} else {
			this.spinner.classList.add("hidden");
			this.btnIcon.classList.remove("hidden");
			this.btnText.textContent = "Calcular";
			this.submitBtn.classList.remove(
				"opacity-90",
				"cursor-not-allowed",
				"pointer-events-none",
			);
		}
	}
}
