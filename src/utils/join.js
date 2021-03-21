const join = (path, other) => { // react router не умеет так
  path = String(path)
  other = String(other)
  if(path.charAt(path.length-1) !== "/") {
    path += "/"
  }
  if(other.charAt(0) === "/") {
    other = other.slice(1, other.length)
  }
  return path+other
}

export default join