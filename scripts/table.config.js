function getFlag(country, className = 'small-flag') {
  return `<div class="flex align-center">
    <img class="${className}" src="./images/flags/l/${this.countryCodes.get(
    country
  )}.svg" /> ${country}
  </div>`
}



function mainHeaderTemplate() {
  return fakePromise(`
    <div class="h-16 flex justify-center items-center font-roboto">
  
      </label>
    </div>
  `)
}

function headerTemplate() {
  const name = this.name
  const icon = this.icon

  return loadSvg(icon).then(iconStr => {
    return `<button class="header-btn flex align-center justify-center">
      <div class="w-full">
        <div class="icon p-1 pt-2">${iconStr}</div>
        <div class="label text-black px-0.5 py-2 font-light">${name}</div>
      </div>
    </button>`
  })
}

function mainCellTemplate(d) {
  const propName = this.propName
  return `<div class="bg-lightbrown w-full h-full rounded-md py-1 px-3 text-black text-[14px] flex items-center">
    <img src="./images/flags/l/${d["Country Code"]}.svg" class="mr-2 w-[20px] h-[15px]" /> 
    <div class="truncate ..."> ${d[propName]} </div>
  </div>`
}

function cellTemplate(d, i, arr, showValue) {
  const format = this.format || (m => m)
  const scale = this.colorScale
  const rank = d[this.rankProp]
  const color = scale(rank)
  const textColor = '#ffffff'
  const prefix = d[this.rankProp + '_is_equal'] ? '=' : ''

  let value = showValue ? d[this.propName] : `${prefix}${format(rank)}`

  if (this.isOverall) {
    value = format(d[this.propName])
  }

  return `<div class="color-box" style="background-color: ${color}; color: ${textColor};">
    ${value}
  </div>`
}

function sortFunc(a, b, order) {
  let orderFunc = order == 'asc' ? 'ascending' : 'descending'

  return d3[orderFunc](a[this.rankProp], b[this.rankProp])
}

// const colors = [
//   '#124385',
//   'rgba(18, 67, 133, 0.5)',

// ]

function getHeaders(data, colors) {
  const columns = [
    {
      id: 1,
      isMainColumn: true,
      name: '',
      propName: 'Island',
      rankProp: 'Island',
      description: '',
      icon: '',
      class: '',
      cellTemplate: mainCellTemplate,
      headerTemplate: mainHeaderTemplate,
    },
    {
      id: 2,
      isOverall: true,
      name: 'Overall',
      propName: 'Overall Rank',
      rankProp: 'Overall Rank',
      description: '',
      order: 'asc',
      icon: './images/overall.svg',
      class: '',
      infoOrder: 6,
      cellTemplate,
      format: ordinal_suffix_of,
      sort: sortFunc,
      headerTemplate,
    },
    {
      id: 3,
      name: 'British Cuisine',
      propName: 'British Cuisine Availability',
      rankProp: 'British Cuisine Rank',
      description: '',
      icon: './images/cuisine.svg',
      class: '',
      infoOrder: 1,
      format: ordinal_suffix_of,
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
    },
    {
      id: 4,
      name: 'English language',
      propName: 'English Language Prevalence',
      rankProp: 'English Language Prevalence Rank',
      description: '',
      icon: './images/language.svg',
      infoOrder: 2,
      class: '',
      format: ordinal_suffix_of,
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
    },
    {
      id: 5,
      name: 'English speaking activities',
      propName: 'ENGLISH SPEAKING ACTIVITIES',
      rankProp: 'Things To Do Rank',
      icon: './images/activity.svg',
      description: '',
      infoOrder: 3,
      class: '',
      format: ordinal_suffix_of,
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
    },
    {
      id: 6,
      name: 'Rain fall',
      propName: 'RAINFALL',
      rankProp: 'Rainfall Rank',
      description: '',
      icon: './images/rainfall.svg',
      infoOrder: 4,
      class: '',
      format: ordinal_suffix_of,
      sort: sortFunc,
      cellTemplate,
      headerTemplate,
    },
  ]

  return columns.map((d, i) => {
    const col = {
      ...d,
      id: i + 1,
    }

    if (!d.isMainColumn) {
      const extent = d3.extent(data, x => x[d.rankProp])
      col.colorScale = d3.scaleQuantile(extent, colors)

      data.forEach(datum => {
        datum[d.rankProp + '_is_equal'] = data.filter(x => x[d.rankProp] === datum[d.rankProp]).length > 1
      })
    }

    return col
  })
}