class App {
	constructor() {
		this.loadDataAndInit()
	}

	async loadDataAndInit() {
		try {
			const data = await d3.csv('./data/islands.csv', d3.autoType)
			const britsAbroad = await d3.csv('./data/brits-abroad.csv', d3.autoType)
			const local = await d3.csv('./data/local-culture.csv', d3.autoType)
			let chosenLocal = true
			this.table = Table({
				headers: getHeaders(data, ['#124385', 'rgba(18, 67, 133, 0.5)']),
				container: '#table',
				data: local,
			}).render()

			d3.select('#show_values').on('change', e => {
				chosenLocal = !chosenLocal
				if (chosenLocal) {
					this.table = Table({
						headers: getHeaders(data, ['#124385', 'rgba(18, 67, 133, 0.5)']),
						container: '#table',
						data: local,
					}).render()
				} else {
					this.table = Table({
						headers: getHeaders(data, ['#E20F12', 'rgba(226, 15, 18, 0.5)']),
						container: '#table',
						data: britsAbroad,
					}).render()
				}
			})
		} catch (e) {
			console.error(e)
		}
	}

	highlightRow(island) {
		this.table.highlightRow(d => d.Island === island)
	}
}

new App()
