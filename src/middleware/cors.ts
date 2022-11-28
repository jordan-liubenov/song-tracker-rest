module.exports = () => (req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Auth-Token")

  next()
}
