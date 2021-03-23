export const findMax = (objectArray) => {
  let max = objectArray[0]
  for (let i = 0; i < objectArray.length; i++) {
    if (objectArray[i].value > max.value) {
      max = objectArray[i]
    }
  }
  return max
}

export const findMin = (objectArray) => {
  let min = objectArray[0]
  for (let i = 0; i < objectArray.length; i++) {
    if (objectArray[i].value < min.value) {
      min = objectArray[i]
    }
  }
  return min
}
