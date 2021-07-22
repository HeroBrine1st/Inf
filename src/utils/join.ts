const join = (...paths: String[]) => {
  let root = paths.shift()
  while (paths.length > 0) {
    let other = paths.shift()
    if (root.charAt(root.length - 1) !== "/")
      root += "/"
    if (other.charAt(0) === "/")
      other = other.slice(1, other.length)
    root = root + other
  }
  return root
}

export default join