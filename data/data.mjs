import fs from 'fs'

const initCash = function (dbName) {
  const filePath = `./data/${dbName}.json`
  let data
  try {
    data = fs.readFileSync(filePath, 'utf8')
  } catch (e) {
    // if no file - create one
    const examplePath = `./data/${dbName}_example.json`
    data = fs.readFileSync(examplePath, 'utf8')
    fs.writeFileSync(filePath, data, 'utf8')
  }
  return JSON.parse(data)
}

const dataMap = {
  orders: initCash('orders'),
  price: initCash('price'),
  news: initCash('news')
}

export function getData(name) {
  return dataMap[name]
}

export function setData(name, data) {
  if (dataMap[name]) {
    dataMap[name] = data
    fs.writeFileSync(`./data/${name}.json`, JSON.stringify(getData('price'), null, 2), 'utf-8')
  }
}
