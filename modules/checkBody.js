function checkBody(body, tabChamps) {
    let isValid = true

    for (let element of tabChamps) {
        console.log(tabChamps)
        console.log(body[element])
        if(!body[element]) {
            isValid = false
            return isValid
        }
    }

    return isValid
}

module.exports = { checkBody }