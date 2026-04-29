console.log("we are running")

const data = {
  brightness: {
    max: 100,
    min: 0,
    value: 30,
    unit: "%",
  },
  contrast: {
    max: 100,
    min: 0,
    value: 30,
    unit: "%",
  },
  exposure: {
    max: 100,
    min: 0,
    value: 30,
    unit: "%",
  },
  saturation: {
    max: 100,
    min: 0,
    value: 0,
    unit: "%",
  },
  hueRotation: {
    max: 100,
    min: 0,
    value: 0,
    unit: "deg",
  },
  blur: {
    max: 100,
    min: 0,
    value: 30,
    unit: "px",
  },
  grayscale: {
    max: 100,
    min: 0,
    value: 30,
    unit: "px",
  },
  sepia: {
    max: 100,
    min: 0,
    value: 0,
    unit: "%",
  },
  opacity: {
    max: 100,
    min: 0,
    value: 0,
    unit: "%",
  },
  invert: {
    max: 100,
    min: 0,
    value: 0,
    unit: "%",
  }
}
const filterDiv = document.getElementById("filters")
const chooseImage = document.querySelector('#choose-image')
const inputImage = document.querySelector('#image-choose')
const placeHolder = document.querySelector('.placeholder')
const canva = document.querySelector('#mycanvas')
const ctx = canva.getContext('2d')


chooseImage.addEventListener('click', () => {
  inputImage.click()
})

inputImage.addEventListener('change', (e) => {
  console.log(e.target.files[0])
  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 0, 0)
  }
  img.src = URL.createObjectURL(e.target.files[0])

})

Object.keys(data).map(item => {
  const items = data[item]
  createElement(item, items.max, items.min, items.unit, items.value)
})


function createElement(name, max, min, unit = "%", value) {
  const div = document.createElement('div')
  div.classList.add('rangesection')
  filterDiv.appendChild(div)

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

  return div

}