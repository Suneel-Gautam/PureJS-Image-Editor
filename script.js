console.log("we are running")

const data = {
  brightness: {
    min: 0,
    max: 200,
    value: 100,
    unit: "%",
  },
  contrast: {
    min: 0,
    max: 200,
    value: 100,
    unit: "%",
  },
  saturation: {
    min: 0,
    max: 200,
    value: 100,
    unit: "%",
  },
  hueRotation: {
    min: 0,
    max: 360,
    value: 0,
    unit: "deg",
  },
  blur: {
    min: 0,
    max: 20,
    value: 0,
    unit: "px",
  },
  grayscale: {
    min: 0,
    max: 100,
    value: 0,
    unit: "%",
  },
  sepia: {
    min: 0,
    max: 100,
    value: 0,
    unit: "%",
  },
  opacity: {
    min: 0,
    max: 100,
    value: 100,
    unit: "%",
  },
  invert: {
    min: 0,
    max: 100,
    value: 0,
    unit: "%",
  }
};
const presets = {
  original: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  enhance: {
    brightness: 105,
    contrast: 110,
    saturation: 110,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  brighten: {
    brightness: 120,
    contrast: 105,
    saturation: 105,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  sharpen: {
    brightness: 100,
    contrast: 115,
    saturation: 105,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  soft: {
    brightness: 102,
    contrast: 95,
    saturation: 98,
    hueRotation: 0,
    blur: 1,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  vivid: {
    brightness: 105,
    contrast: 110,
    saturation: 125,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  fade: {
    brightness: 105,
    contrast: 85,
    saturation: 90,
    hueRotation: 0,
    blur: 0,
    grayscale: 5,
    sepia: 10,
    opacity: 100,
    invert: 0
  },

  coolTone: {
    brightness: 100,
    contrast: 105,
    saturation: 95,
    hueRotation: 200,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  warmTone: {
    brightness: 105,
    contrast: 105,
    saturation: 110,
    hueRotation: 10,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0
  }
};

const filterDiv = document.getElementById("filters")
const chooseImage = document.querySelector('#choose-image')
const inputImage = document.querySelector('#image-choose')
const canva = document.querySelector('#mycanvas')
const ctx = canva.getContext('2d')
const placeholder = document.querySelector('#placeholder')
const resetFilter = document.querySelector('#reset')
const downloadButton = document.querySelector('#dowload-image')
const presetFilters = document.querySelector('#presetFilters')

let image = null

// input clicked when user click the choose button 
chooseImage.addEventListener('click', () => {
  inputImage.click()
})

// load image on canvas
inputImage.addEventListener('change', (e) => {
  console.log(e.target.files[0])
  canva.style.display = 'flex'
  const img = new Image()
  img.onload = () => {
    image = img
    const maxWidth = 800;
    const maxHeight = 600;
    let width = img.width;
    let height = img.height;
    if (width > maxWidth) {
      height = height * (maxWidth / width);
      width = maxWidth;
    }
    if (height > maxHeight) {
      width = width * (maxHeight / height);
      height = maxHeight;
    }
    canva.width = width;
    canva.height = height;
    // Draw scaled image
    ctx.drawImage(img, 0, 0, width, height);
  }
  img.src = URL.createObjectURL(e.target.files[0])
  placeholder.style.display = 'none'

})


// download image 
downloadButton.addEventListener('click', () => {
  const link = document.createElement('a')
  link.download = "canvasimage.png"
  link.href = canva.toDataURL()
  link.click()
})

function applyFilter() {
  ctx.clearRect(0, 0, canva.width, canva.height);
  ctx.filter = `
  brightness(${data.brightness.value}${data.brightness.unit})
  contrast(${data.contrast.value}${data.contrast.unit})
  saturate(${data.saturation.value}${data.saturation.unit})
  hue-rotate(${data.hueRotation.value}${data.hueRotation.unit})
  blur(${data.blur.value}${data.blur.unit})
  grayscale(${data.grayscale.value}${data.grayscale.unit})
  sepia(${data.sepia.value}${data.sepia.unit})
  opacity(${data.opacity.value}${data.opacity.unit})
  invert(${data.invert.value}${data.invert.unit})
  `
  ctx.drawImage(image, 0, 0, canva.width, canva.height)
}

resetFilter.addEventListener('click', () => {
  data.brightness.value = 100
  data.contrast.value = 100
  data.saturation.value = 100
  data.hueRotation.value = 0
  data.blur.value = 0
  data.grayscale.value = 0
  data.invert.value = 0
  data.sepia.value = 0
  data.opacity.value = 100
  data.invert.value = 0
  applyFilter()
  filterDiv.innerHTML = ''
  presetFilters.innerHTML = ""


  displayFilter()

})

function displayFilter() {
  Object.keys(data).map(item => {
    const items = data[item]
    createElement(item, items.max, items.min, items.unit, items.value)
  })
  Object.keys(presets).map(item => {
    createPreset(item)

  })
}
displayFilter()

// creating element filters section
function createElement(name, max, min, unit = "%", value) {
  const div = document.createElement('div')
  div.classList.add('rangesection')
  const span = document.createElement('span')
  span.innerHTML = `${name}`
  div.appendChild(span)
  const input = document.createElement('input')
  input.type = 'range'
  input.max = max
  input.min = min
  input.value = value
  input.id = name
  div.appendChild(input)
  filterDiv.appendChild(div)

  input.addEventListener('change', (e) => {
    data[name].value = e.target.value
    applyFilter()
  })

  const presetDiv = document.createElement('div')
  return div
}

function createPreset(name) {
  const button = document.createElement('button')
  button.innerHTML = `${name}`
  button.classList.add('buttons')
  presetFilters.appendChild(button)
  button.addEventListener('click', () => {
    let preset = presets[name]
    Object.keys(preset).forEach(item => {
      data[item].value = preset[item]
      applyFilter()

      filterDiv.innerHTML = ''
      presetFilters.innerHTML = ""
      displayFilter()
    })

  })
  return button
}