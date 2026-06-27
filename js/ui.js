export default class CalculatorUI {
	constructor(apiService) {
		this.api = apiService;
		this.currentOperation = null;
		this.activePart = "1";

		const rateUnits = [
			{ val: "Dia", label: "ao dia" },
			{ val: "Mes", label: "ao mês" },
			{ val: "Trimestre", label: "ao trimestre" },
			{ val: "Semestre", label: "ao semestre" },
			{ val: "Ano", label: "ao ano" },
		];

		const timeUnits = [
			{ val: "Dia", label: "Dias" },
			{ val: "Mes", label: "Meses" },
			{ val: "Trimestre", label: "Trimestres" },
			{ val: "Semestre", label: "Semestres" },
			{ val: "Ano", label: "Anos" },
		];

		this.operationsByPart = {
			1: [
				{
					id: "vp",
					name: "Valor Presente (VP)",
					endpoint: "capitalizacao-simples/valor-presente",
					icon: "ph-coins",
					params: [
						{ key: "VF", label: "Montante (VF)", placeholder: "Ex: 1100", icon: "ph-money" },
						{
							key: "i",
							label: "Taxa (i) decimal",
							placeholder: "Ex: 0.05",
							icon: "ph-percent",
							hasUnits: true,
							unitKey: "unidadeTaxaJurosEnum",
							unitOptions: rateUnits,
						},
						{
							key: "n",
							label: "Tempo (n)",
							placeholder: "Ex: 24",
							icon: "ph-calendar-blank",
							hasUnits: true,
							unitKey: "unidadeTempoEnum",
							unitOptions: timeUnits,
						},
					],
				},
				{
					id: "vf",
					name: "Valor Futuro (VF)",
					endpoint: "capitalizacao-simples/valor-futuro",
					icon: "ph-trend-up",
					params: [
						{ key: "VP", label: "Capital (VP)", placeholder: "Ex: 1000", icon: "ph-coins" },
						{
							key: "i",
							label: "Taxa (i) decimal",
							placeholder: "Ex: 0.05",
							icon: "ph-percent",
							hasUnits: true,
							unitKey: "unidadeTaxaJurosEnum",
							unitOptions: rateUnits,
						},
						{
							key: "n",
							label: "Tempo (n)",
							placeholder: "Ex: 24",
							icon: "ph-calendar-blank",
							hasUnits: true,
							unitKey: "unidadeTempoEnum",
							unitOptions: timeUnits,
						},
					],
				},
				{
					id: "j",
					name: "Juros (J)",
					endpoint: "capitalizacao-simples/juros",
					icon: "ph-hand-coins",
					params: [
						{ key: "VP", label: "Capital (VP)", placeholder: "Ex: 1000", icon: "ph-coins" },
						{
							key: "i",
							label: "Taxa (i) decimal",
							placeholder: "Ex: 0.05",
							icon: "ph-percent",
							hasUnits: true,
							unitKey: "unidadeTaxaJurosEnum",
							unitOptions: rateUnits,
						},
						{
							key: "n",
							label: "Tempo (n)",
							placeholder: "Ex: 24",
							icon: "ph-calendar-blank",
							hasUnits: true,
							unitKey: "unidadeTempoEnum",
							unitOptions: timeUnits,
						},
					],
				},
				{
					id: "taxa",
					name: "Taxa (i)",
					endpoint: "capitalizacao-simples/taxa",
					icon: "ph-percent",
					params: [
						{ key: "VP", label: "Capital (VP)", placeholder: "Ex: 1000", icon: "ph-coins" },
						{ key: "VF", label: "Montante (VF)", placeholder: "Ex: 1100", icon: "ph-money" },
						{
							key: "n",
							label: "Tempo (n)",
							placeholder: "Ex: 24",
							icon: "ph-calendar-blank",
							hasUnits: true,
							unitKey: "unidadeTempoEnum",
							unitOptions: timeUnits,
						},
					],
				},
				{
					id: "tempo",
					name: "Tempo (n)",
					endpoint: "capitalizacao-simples/tempo",
					icon: "ph-hourglass",
					params: [
						{ key: "VP", label: "Capital (VP)", placeholder: "Ex: 1000", icon: "ph-coins" },
						{ key: "VF", label: "Montante (VF)", placeholder: "Ex: 1100", icon: "ph-money" },
						{
							key: "i",
							label: "Taxa (i) decimal",
							placeholder: "Ex: 0.05",
							icon: "ph-percent",
							hasUnits: true,
							unitKey: "unidadeTaxaJurosEnum",
							unitOptions: rateUnits,
						},
					],
				},
				{
					id: "desc-com",
					name: "Tx. Desconto Com. (ic)",
					endpoint: "capitalizacao-simples/taxa-desconto-comercial",
					icon: "ph-tag-chevron",
					params: [
						{
							key: "I",
							label: "Taxa Efetiva (I) decimal",
							placeholder: "Ex: 0.10",
							icon: "ph-percent",
							hasUnits: true,
							unitKey: "unidadeTaxaJurosEnum",
							unitOptions: rateUnits,
						},
						{
							key: "n",
							label: "Tempo (n)",
							placeholder: "Ex: 6",
							icon: "ph-calendar-blank",
							hasUnits: true,
							unitKey: "unidadeTempoEnum",
							unitOptions: timeUnits,
						},
					],
				},
				{
					id: "tx-efetiva",
					name: "Taxa Efetiva (i)",
					endpoint: "capitalizacao-simples/taxa-efetiva",
					icon: "ph-chart-line-up",
					params: [
						{
							key: "Ic",
							label: "Taxa Comercial (Ic) decimal",
							placeholder: "Ex: 0.05",
							icon: "ph-percent",
							hasUnits: true,
							unitKey: "unidadeTaxaJurosEnum",
							unitOptions: rateUnits,
						},
						{
							key: "n",
							label: "Tempo (n)",
							placeholder: "Ex: 1",
							icon: "ph-calendar-blank",
							hasUnits: true,
							unitKey: "unidadeTempoEnum",
							unitOptions: timeUnits,
						},
					],
				},
			],
			2: [
				{
					id: "vp-composto",
					name: "Valor Presente (VP)",
					endpoint: "capitalizacao-composta/valor-presente",
					icon: "ph-coins",
					params: [
						{ key: "VF", label: "Montante (VF)", placeholder: "Ex: 1210", icon: "ph-money" },
						{
							key: "i",
							label: "Taxa (i) decimal",
							placeholder: "Ex: 0.10",
							icon: "ph-percent",
							hasUnits: true,
							unitKey: "unidadeTaxaJurosEnum",
							unitOptions: rateUnits,
						},
						{
							key: "n",
							label: "Tempo (n)",
							placeholder: "Ex: 2",
							icon: "ph-calendar-blank",
							hasUnits: true,
							unitKey: "unidadeTempoEnum",
							unitOptions: timeUnits,
						},
					],
				},
				{
					id: "vf-composto",
					name: "Valor Futuro (VF)",
					endpoint: "capitalizacao-composta/valor-futuro",
					icon: "ph-trend-up",
					params: [
						{ key: "VP", label: "Capital (VP)", placeholder: "Ex: 1000", icon: "ph-coins" },
						{
							key: "i",
							label: "Taxa (i) decimal",
							placeholder: "Ex: 0.10",
							icon: "ph-percent",
							hasUnits: true,
							unitKey: "unidadeTaxaJurosEnum",
							unitOptions: rateUnits,
						},
						{
							key: "n",
							label: "Tempo (n)",
							placeholder: "Ex: 2",
							icon: "ph-calendar-blank",
							hasUnits: true,
							unitKey: "unidadeTempoEnum",
							unitOptions: timeUnits,
						},
					],
				},
				{
					id: "juros-compostos",
					name: "Juros Compostos (J)",
					endpoint: "capitalizacao-composta/juros",
					icon: "ph-hand-coins",
					params: [
						{ key: "VP", label: "Capital (VP)", placeholder: "Ex: 1000", icon: "ph-coins" },
						{
							key: "i",
							label: "Taxa (i) decimal",
							placeholder: "Ex: 0.10",
							icon: "ph-percent",
							hasUnits: true,
							unitKey: "unidadeTaxaJurosEnum",
							unitOptions: rateUnits,
						},
						{
							key: "n",
							label: "Tempo (n)",
							placeholder: "Ex: 2",
							icon: "ph-calendar-blank",
							hasUnits: true,
							unitKey: "unidadeTempoEnum",
							unitOptions: timeUnits,
						},
					],
				},
				{
					id: "taxa-composta",
					name: "Taxa Composta (i)",
					endpoint: "capitalizacao-composta/taxa",
					icon: "ph-percent",
					params: [
						{ key: "VP", label: "Capital (VP)", placeholder: "Ex: 1000", icon: "ph-coins" },
						{ key: "VF", label: "Montante (VF)", placeholder: "Ex: 1210", icon: "ph-money" },
						{
							key: "n",
							label: "Tempo (n)",
							placeholder: "Ex: 2",
							icon: "ph-calendar-blank",
							hasUnits: true,
							unitKey: "unidadeTempoEnum",
							unitOptions: timeUnits,
						},
						{
							key: "unidadeTaxaJurosEnum",
							label: "Período da taxa calculada",
							type: "select",
							icon: "ph-arrows-left-right",
							options: rateUnits,
						},
					],
				},
				{
					id: "tempo-composto",
					name: "Tempo Composto (n)",
					endpoint: "capitalizacao-composta/tempo",
					icon: "ph-hourglass",
					params: [
						{ key: "VP", label: "Capital (VP)", placeholder: "Ex: 1000", icon: "ph-coins" },
						{ key: "VF", label: "Montante (VF)", placeholder: "Ex: 1210", icon: "ph-money" },
						{
							key: "i",
							label: "Taxa (i) decimal",
							placeholder: "Ex: 0.10",
							icon: "ph-percent",
							hasUnits: true,
							unitKey: "unidadeTaxaJurosEnum",
							unitOptions: rateUnits,
						},
						{
							key: "unidadeTempoEnum",
							label: "Unidade do tempo calculado",
							type: "select",
							icon: "ph-calendar-blank",
							options: timeUnits,
						},
					],
				},
				{
					id: "taxa-proporcional",
					name: "Taxa Proporcional",
					endpoint: "capitalizacao-composta/taxa-proporcional",
					icon: "ph-divide",
					params: [
						{ key: "iNominal", label: "Taxa nominal (ik)", placeholder: "Ex: 0.24", icon: "ph-percent" },
						{ key: "k", label: "Número de capitalizações (k)", placeholder: "Ex: 12", icon: "ph-number-circle-one" },
					],
				},
				{
					id: "taxa-nominal",
					name: "Taxa Nominal",
					endpoint: "capitalizacao-composta/taxa-nominal",
					icon: "ph-multiply",
					params: [
						{ key: "iProporcional", label: "Taxa proporcional", placeholder: "Ex: 0.02", icon: "ph-percent" },
						{ key: "k", label: "Número de capitalizações (k)", placeholder: "Ex: 12", icon: "ph-number-circle-one" },
					],
				},
				{
					id: "taxa-equivalente",
					name: "Taxa Equivalente",
					endpoint: "capitalizacao-composta/taxa-equivalente",
					icon: "ph-arrows-left-right",
					params: [
						{
							key: "i",
							label: "Taxa efetiva de origem",
							placeholder: "Ex: 0.01",
							icon: "ph-percent",
							hasUnits: true,
							unitKey: "unidadeTaxaOrigemEnum",
							unitOptions: rateUnits,
						},
						{
							key: "unidadeTaxaDestinoEnum",
							label: "Período da taxa equivalente",
							type: "select",
							icon: "ph-arrow-right",
							options: rateUnits,
						},
					],
				},
			],
			3: [
				{
					id: "amortizacao-sac",
					name: "Amortização SAC",
					endpoint: "amortizacao-vpl/amortizacao-sac",
					icon: "ph-table",
					params: [
						{ key: "VP", label: "Financiamento (VP)", placeholder: "Ex: 10000", icon: "ph-bank" },
						{
							key: "i",
							label: "Taxa (i) decimal",
							placeholder: "Ex: 0.02",
							icon: "ph-percent",
							hasUnits: true,
							unitKey: "unidadeTaxaJurosEnum",
							unitOptions: rateUnits,
						},
						{
							key: "n",
							label: "Quantidade de parcelas (n)",
							placeholder: "Ex: 12",
							icon: "ph-calendar-blank",
							hasUnits: true,
							unitKey: "unidadeTempoEnum",
							unitOptions: timeUnits,
						},
					],
				},
				{
					id: "vpl",
					name: "Valor Presente Líquido",
					endpoint: "amortizacao-vpl/vpl",
					icon: "ph-chart-line-up",
					params: [
						{ key: "investimento", label: "Investimento inicial", placeholder: "Ex: 10000", icon: "ph-wallet" },
						{
							key: "i",
							label: "Taxa (i) decimal",
							placeholder: "Ex: 0.01",
							icon: "ph-percent",
							hasUnits: true,
							unitKey: "unidadeTaxaJurosEnum",
							unitOptions: rateUnits,
						},
						{
							key: "n",
							label: "Quantidade de períodos (n)",
							placeholder: "Ex: 3",
							icon: "ph-calendar-blank",
							hasUnits: true,
							unitKey: "unidadeTempoEnum",
							unitOptions: timeUnits,
						},
						{
							key: "fluxosCaixa",
							label: "Fluxos de caixa",
							placeholder: "Ex: 3000, 4000, 5000",
							icon: "ph-list-numbers",
							type: "textarea",
							fullWidth: true,
							multipleValues: true,
							help: "Informe um valor por período, separado por vírgula, ponto e vírgula ou quebra de linha.",
						},
						{ key: "valorResidual", label: "Valor residual", placeholder: "Ex: 1000", icon: "ph-coins" },
						{
							key: "periodoValorResidual",
							label: "Período do valor residual",
							placeholder: "Ex: 3",
							icon: "ph-calendar-check",
						},
					],
				},
			],
		};

		this.initElements();
		this.renderMenu();
		this.bindEvents();
	}

	initElements() {
		this.tabs = document.querySelectorAll(".part-tab");
		this.calculatorPage = document.getElementById("calculator-page");
		this.blankPage = document.getElementById("blank-page");
		this.menuContainer = document.getElementById("operation-menu");
		this.menuTitle = document.getElementById("menu-title");
		this.menuSubtitle = document.getElementById("menu-subtitle");
		this.menuIcon = document.getElementById("menu-icon");
		this.formTitle = document.getElementById("form-title");
		this.formSubtitle = document.getElementById("form-subtitle");
		this.calcForm = document.getElementById("calc-form");
		this.dynamicInputs = document.getElementById("dynamic-inputs");
		this.emptyState = document.getElementById("empty-state");
		this.resultCard = document.getElementById("result-card");
		this.resultTitle = document.getElementById("result-title");
		this.resultContent = document.getElementById("result-content");
		this.submitBtn = document.getElementById("submit-btn");
		this.btnIcon = document.getElementById("btn-icon");
		this.spinner = document.getElementById("loading-spinner");
		this.btnText = document.getElementById("btn-text");
	}

	bindEvents() {
		this.tabs.forEach((tab) => {
			tab.addEventListener("click", () => this.switchPart(tab.dataset.part));
		});

		this.calcForm.addEventListener("submit", async (event) => {
			event.preventDefault();
			if (!this.currentOperation) return;

			this.setLoading(true);
			this.resultCard.classList.add("hidden");

			try {
				const params = this.serializeForm();
				const data = await Promise.all([
					this.api.fetchCalculation(this.currentOperation.endpoint, params),
					new Promise((resolve) => setTimeout(resolve, 400)),
				]).then((results) => results[0]);

				this.showResult(data);
			} catch (error) {
				this.showErrorPopup(error);
			} finally {
				this.setLoading(false);
			}
		});
	}

	switchPart(part) {
		this.activePart = part;
		this.currentOperation = null;

		this.tabs.forEach((tab) => {
			tab.classList.toggle("active", tab.dataset.part === part);
		});

		this.blankPage.classList.add("hidden");
		this.calculatorPage.classList.remove("hidden");
		this.menuTitle.textContent = `Parte ${part}`;

		const partSettings = {
			1: { subtitle: "Capitalização simples", icon: "ph-list-bullets" },
			2: { subtitle: "Capitalização composta", icon: "ph-chart-line-up" },
			3: { subtitle: "Amortização e VPL", icon: "ph-chart-pie-slice" },
		};
		const settings = partSettings[part];
		this.menuSubtitle.textContent = settings.subtitle;
		this.menuIcon.className = `ph ${settings.icon} text-3xl text-primary`;
		this.resetWorkspace();
		this.renderMenu();
	}

	resetWorkspace() {
		this.calcForm.reset();
		this.calcForm.classList.add("hidden");
		this.emptyState.classList.remove("hidden");
		this.resultCard.classList.add("hidden");
		this.dynamicInputs.innerHTML = "";
		this.resultContent.innerHTML = "";
		this.formTitle.textContent = "Selecione uma operação";
		this.formSubtitle.textContent = "Escolha um item ao lado para iniciar";
	}

	renderMenu() {
		this.menuContainer.innerHTML = "";
		const operations = this.operationsByPart[this.activePart] || [];

		operations.forEach((operation) => {
			const button = document.createElement("button");
			button.type = "button";
			button.className = "w-full text-left px-4 py-3 rounded-sm transition-colors duration-200 flex items-center gap-3 font-medium text-slate-600 hover:bg-sky-50 hover:text-primary border border-transparent outline-none focus:ring-2 focus:ring-sky-100";
			button.dataset.id = operation.id;
			button.innerHTML = `<i class="ph ${operation.icon} text-xl"></i><span>${operation.name}</span>`;
			button.addEventListener("click", () => this.selectOperation(operation, button));
			this.menuContainer.appendChild(button);
		});
	}

	selectOperation(operation, buttonElement) {
		this.currentOperation = operation;

		Array.from(this.menuContainer.children).forEach((button) => {
			button.classList.remove("bg-sky-100", "text-primary", "border-sky-200");
			button.classList.add("text-slate-600", "border-transparent");
		});

		buttonElement.classList.add("bg-sky-100", "text-primary", "border-sky-200");
		buttonElement.classList.remove("text-slate-600", "border-transparent");

		this.formTitle.textContent = `Calcular ${operation.name}`;
		this.formSubtitle.textContent = `Preencha os dados para consultar /${operation.endpoint}`;
		this.dynamicInputs.innerHTML = "";

		operation.params.forEach((param) => this.renderInput(param));

		this.emptyState.classList.add("hidden");
		this.calcForm.classList.remove("hidden");
		this.resultCard.classList.add("hidden");
	}

	renderInput(param) {
		const wrapperClass = param.fullWidth ? "sm:col-span-2" : "";
		let controlHtml;

		if (param.type === "textarea") {
			controlHtml = `
				<div class="relative">
					<div class="absolute top-3 left-0 pl-3 flex items-center pointer-events-none text-slate-400 z-10">
						<i class="ph ${param.icon} text-lg"></i>
					</div>
					<textarea id="${param.key}" name="${param.key}" rows="4" placeholder="${param.placeholder}" required class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-y"></textarea>
				</div>
			`;
		} else if (param.type === "select") {
			const optionsHtml = param.options
				.map((option) => `<option value="${option.val}">${option.label}</option>`)
				.join("");
			controlHtml = `
				<div class="relative">
					<div class="absolute top-0 left-0 h-full pl-3 flex items-center pointer-events-none text-slate-400 z-10">
						<i class="ph ${param.icon} text-lg"></i>
					</div>
					<select id="${param.key}" name="${param.key}" required class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer">
						${optionsHtml}
					</select>
				</div>
			`;
		} else {
			const inputClass = param.hasUnits
				? "w-full sm:w-2/3 pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-sm sm:rounded-r-none focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
				: "w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all";

			let selectHtml = "";
			if (param.hasUnits) {
				const optionsHtml = param.unitOptions
					.map((option) => `<option value="${option.val}">${option.label}</option>`)
					.join("");

				selectHtml = `
					<select name="${param.unitKey}" class="w-full sm:w-1/3 bg-slate-50 border border-slate-300 sm:border-l-0 rounded-sm sm:rounded-l-none px-2 py-2.5 sm:py-0 text-sm text-slate-700 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all hover:bg-slate-100 cursor-pointer mt-2 sm:mt-0">
						${optionsHtml}
					</select>
				`;
			}

			const containerClass = param.hasUnits ? "relative flex flex-col sm:flex-row" : "relative flex";
			controlHtml = `
				<div class="${containerClass}">
					<div class="absolute top-0 left-0 h-10 sm:h-full pl-3 flex items-center pointer-events-none text-slate-400 z-10">
						<i class="ph ${param.icon} text-lg"></i>
					</div>
					<input type="number" step="any" id="${param.key}" name="${param.key}" placeholder="${param.placeholder}" required class="${inputClass}" />
					${selectHtml}
				</div>
			`;
		}

		const helpHtml = param.help ? `<p class="text-xs text-slate-500 ml-1">${param.help}</p>` : "";
		this.dynamicInputs.insertAdjacentHTML(
			"beforeend",
			`<div class="flex flex-col gap-1 fade-in w-full ${wrapperClass}">
				<label for="${param.key}" class="text-sm font-semibold text-slate-700 ml-1">${param.label}</label>
				${controlHtml}
				${helpHtml}
			</div>`,
		);
	}

	serializeForm() {
		const formData = new FormData(this.calcForm);
		const params = {};

		for (const [key, value] of formData.entries()) {
			if (Object.prototype.hasOwnProperty.call(params, key)) {
				params[key] = Array.isArray(params[key]) ? [...params[key], value] : [params[key], value];
			} else {
				params[key] = value;
			}
		}

		const multipleParams = this.currentOperation.params.filter((param) => param.multipleValues);
		multipleParams.forEach((param) => {
			const rawValue = params[param.key] || "";
			params[param.key] = rawValue
				.toString()
				.split(/[;,\n]+/)
				.map((value) => value.trim())
				.filter((value) => value !== "");
		});

		return params;
	}

	showResult(data) {
		this.resultContent.innerHTML = "";

		if (this.currentOperation.id === "amortizacao-sac") {
			this.showAmortizationResult(data);
		} else if (this.currentOperation.id === "vpl") {
			this.showVplResult(data);
		} else {
			this.showSimpleResult(data);
		}

		this.resultCard.classList.remove("hidden", "fade-in");
		void this.resultCard.offsetWidth;
		this.resultCard.classList.add("fade-in");
	}

	showSimpleResult(data) {
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

		this.resultTitle.textContent = this.currentOperation.name;
		this.resultContent.innerHTML = `<p class="text-3xl font-bold text-slate-800 break-words">${this.formatNumber(finalValue)}</p>`;
	}

	showVplResult(data) {
		const vpl = this.getValue(data, "VPL", "vpl");
		this.resultTitle.textContent = "Valor Presente Líquido";
		this.resultContent.innerHTML = `
			<div class="bg-emerald-50 border border-emerald-200 rounded-sm p-5 mb-5">
				<p class="text-sm font-medium text-emerald-700">VPL</p>
				<p class="text-3xl font-bold text-emerald-700 mt-1">${this.formatNumber(vpl)}</p>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
				${this.resultMetric("Investimento", this.getValue(data, "investimento"))}
				${this.resultMetric("Taxa", this.getValue(data, "i"), this.getValue(data, "unidadeTaxaJurosEnum"))}
				${this.resultMetric("Tempo", this.getValue(data, "n"), this.getValue(data, "unidadeTempoEnum"))}
				${this.resultMetric("VP dos fluxos", this.getValue(data, "valorPresenteFluxos"))}
				${this.resultMetric("VP residual", this.getValue(data, "valorPresenteResidual"))}
			</div>
		`;
	}

	showAmortizationResult(data) {
		const parcelas = this.getValue(data, "parcelas") || [];
		const rows = parcelas.map((parcela) => `
			<tr>
				<td>${this.formatPeriod(this.getValue(parcela, "periodo"))}</td>
				<td>${this.formatNumber(this.getValue(parcela, "saldoDevedorInicial"))}</td>
				<td>${this.formatNumber(this.getValue(parcela, "amortizacao"))}</td>
				<td>${this.formatNumber(this.getValue(parcela, "juros"))}</td>
				<td>${this.formatNumber(this.getValue(parcela, "PMT", "pmt"))}</td>
				<td>${this.formatNumber(this.getValue(parcela, "saldoDevedorFinal"))}</td>
			</tr>
		`).join("");

		this.resultTitle.textContent = "Tabela de Amortização SAC";
		this.resultContent.innerHTML = `
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
				${this.resultMetric("Financiamento (VP)", this.getValue(data, "VP", "vp"))}
				${this.resultMetric("Amortização constante", this.getValue(data, "amortizacaoConstante"))}
				${this.resultMetric("Total de juros", this.getValue(data, "totalJuros"))}
				${this.resultMetric("Total das prestações", this.getValue(data, "totalPrestacoes"))}
			</div>
			<div class="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500 mb-4">
				<span><strong class="text-slate-700">Taxa:</strong> ${this.formatNumber(this.getValue(data, "i"))} ${this.escapeHtml(this.getValue(data, "unidadeTaxaJurosEnum") || "")}</span>
				<span><strong class="text-slate-700">Tempo:</strong> ${this.formatPeriod(this.getValue(data, "n"))} ${this.escapeHtml(this.getValue(data, "unidadeTempoEnum") || "")}</span>
			</div>
			<div class="result-table-wrapper">
				<table class="result-table">
					<thead>
						<tr>
							<th>Período</th>
							<th>Saldo inicial</th>
							<th>Amortização</th>
							<th>Juros</th>
							<th>Prestação (PMT)</th>
							<th>Saldo final</th>
						</tr>
					</thead>
					<tbody>${rows}</tbody>
				</table>
			</div>
		`;
	}

	resultMetric(label, value, suffix = "") {
		return `
			<div class="bg-slate-50 border border-slate-200 rounded-sm p-4">
				<p class="text-xs font-medium uppercase tracking-wide text-slate-500">${this.escapeHtml(label)}</p>
				<p class="text-lg font-bold text-slate-800 mt-1 break-words">${this.formatNumber(value)}${suffix ? ` <span class="text-xs font-medium text-slate-500">${this.escapeHtml(suffix)}</span>` : ""}</p>
			</div>
		`;
	}

	getValue(object, ...keys) {
		if (!object || typeof object !== "object") return undefined;
		for (const key of keys) {
			if (object[key] !== undefined && object[key] !== null) return object[key];
		}
		return undefined;
	}

	formatNumber(value) {
		if (value === undefined || value === null || value === "") return "---";
		const number = Number(value);
		if (!Number.isFinite(number)) return this.escapeHtml(String(value));
		return number.toLocaleString("pt-BR", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 6,
		});
	}

	formatPeriod(value) {
		if (value === undefined || value === null || value === "") return "---";
		const number = Number(value);
		if (!Number.isFinite(number)) return this.escapeHtml(String(value));
		return number.toLocaleString("pt-BR", { maximumFractionDigits: 6 });
	}

	escapeHtml(value) {
		return String(value)
			.replaceAll("&", "&amp;")
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;")
			.replaceAll('"', "&quot;")
			.replaceAll("'", "&#039;");
	}

	showErrorPopup(error) {
		if (error && error.isBackendError && error.payload) {
			const data = error.payload;

			if (data.messages && typeof data.messages === "object") {
				const items = Object.entries(data.messages)
					.map(([field, message]) => `<li><strong>Dado '${this.escapeHtml(field)}':</strong> ${this.escapeHtml(message)}</li>`)
					.join("");

				Swal.fire({
					html: `
						<div class="flex flex-col items-center pt-6 pb-2">
							<div class="bg-amber-50 text-amber-500 p-4 rounded-full mb-5 shadow-sm"><i class="ph ph-warning-circle text-5xl"></i></div>
							<h3 class="text-xl font-bold text-slate-800 font-sans mb-1">${this.escapeHtml(data.error || "Dados inválidos")}</h3>
							<p class="text-sm text-slate-500 font-sans">Corrija os problemas abaixo:</p>
							<ul class="w-full text-left text-sm text-slate-600 mt-5 list-disc list-inside bg-slate-50 p-4 rounded-sm border border-slate-200">${items}</ul>
						</div>`,
					showConfirmButton: true,
					confirmButtonText: "Entendi, vou corrigir",
					buttonsStyling: false,
					customClass: this.swalClasses(),
				});
				return;
			}

			Swal.fire({
				html: `
					<div class="flex flex-col items-center pt-6 pb-2">
						<div class="bg-rose-50 text-rose-500 p-4 rounded-full mb-5 shadow-sm"><i class="ph ph-x-circle text-5xl"></i></div>
						<h3 class="text-xl font-bold text-slate-800 font-sans mb-2">${this.escapeHtml(data.error || "Erro no cálculo")}</h3>
						<p class="text-sm text-slate-500 font-sans text-center">${this.escapeHtml(data.message || "Verifique os valores informados e tente novamente.")}</p>
					</div>`,
				showConfirmButton: true,
				confirmButtonText: "Tentar novamente",
				buttonsStyling: false,
				customClass: this.swalClasses(),
			});
			return;
		}

		Swal.fire({
			html: `
				<div class="flex flex-col items-center pt-8 pb-4">
					<div class="bg-rose-50 text-rose-500 p-4 rounded-full mb-5 shadow-sm"><i class="ph ph-plugs text-5xl"></i></div>
					<h3 class="text-xl font-bold text-slate-800 font-sans mb-3">Servidor inacessível</h3>
					<p class="text-sm text-slate-500 font-sans leading-relaxed px-4 text-center">Não foi possível conectar com a API em<br><strong class="text-slate-700 bg-slate-100 px-2 py-0.5 rounded break-all">${this.escapeHtml(this.api.baseUrl)}</strong></p>
				</div>`,
			showConfirmButton: true,
			confirmButtonText: "Entendi, vou verificar",
			buttonsStyling: false,
			customClass: this.swalClasses(),
		});
	}

	swalClasses() {
		return {
			popup: "custom-swal-popup shadow-2xl",
			container: "font-sans",
			actions: "pb-8 pt-3 w-full px-8",
			confirmButton: "w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-sm transition-all focus:ring-4 focus:ring-slate-200 outline-none",
		};
	}

	setLoading(isLoading) {
		this.spinner.classList.toggle("hidden", !isLoading);
		this.btnIcon.classList.toggle("hidden", isLoading);
		this.btnText.textContent = isLoading ? "Calculando..." : "Calcular";
		this.submitBtn.classList.toggle("opacity-90", isLoading);
		this.submitBtn.classList.toggle("cursor-not-allowed", isLoading);
		this.submitBtn.classList.toggle("pointer-events-none", isLoading);
	}
}
