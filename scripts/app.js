class App {
	constructor() {
		this.loadDataAndInit()
	}

	async loadDataAndInit() {
		try {
			const data = await d3.csv('./data/islands.csv', d3.autoType)
			const localData = data.slice(14, data.length)
			const abroadData = data.slice(0, 14)
			let chosenLocal = true
			this.table = Table({
				headers: getHeaders(data, ['#124385', 'rgba(18, 67, 133, 0.5)']),
				container: '#table',
				data: localData,
			}).render()

			d3.select('#show_values').on('change', e => {
				chosenLocal = !chosenLocal
				if (chosenLocal) {
					this.table = Table({
						headers: getHeaders(data, ['#124385', 'rgba(18, 67, 133, 0.5)']),
						container: '#table',
						data: localData,
					}).render()
				} else {
					this.table = Table({
						headers: getHeaders(data, ['#E20F12', 'rgba(226, 15, 18, 0.5)']),
						container: '#table',
						data: abroadData,
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
