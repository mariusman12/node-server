exports.shuffleArray = array => array.sort(() => 0.5 - Math.random())

exports.takeFirstElements = (array, n) => array.slice(0, n)

exports.addNewBookInArray = (array, newBookId) => {
  return {
    books: [...array, newBookId]
  }
}

exports.removeElementFromArray = (array, value) => array.filter(el => el !== value)