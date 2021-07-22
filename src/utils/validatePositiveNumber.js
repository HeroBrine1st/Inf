const regex = /^\d+$/

function validatePositiveNumber(str) {
  return regex.test(str)
}

export default validatePositiveNumber