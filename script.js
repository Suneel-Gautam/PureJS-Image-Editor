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
    value: 30,
    unit: "%",
  },
  hueRotation: {
    max: 100,
    min: 0,
    value: 30,
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
    value: 30,
    unit: "%",
  },
  opacity: {
    max: 100,
    min: 0,
    value: 30,
    unit: "%",
  },
  invert: {
    max: 100,
    min: 0,
    value: 30,
    unit: "%",
  }
}


Object.keys(data).map(index => {
  console.log(index, data[index])
})


function createElement() {
  const div = document.createElement('div')


}