const DEFAULT_COLOUR_CODE = "z07"

function codeToHex(code) {
    if(code === null) return codeToHex(DEFAULT_COLOUR_CODE)

    const num = parseInt(code)
    if(num === NaN) return codeToHex(DEFAULT_COLOUR_CODE)

    if(num >= 0 && num <= 256) {
        return `#${colourList[num][3]}`
    }

    const result = colourList.filter( elem => {
        return elem[0] === code
    })

    return result.length === 0 ? codeToHex(DEFAULT_COLOUR_CODE) : `#${result[0][3]}`
}

function codeToThresh(code) {

    if(code === null) return DEFAULT_COLOUR_CODE

    const num = parseInt(code)
    if(num === NaN) return DEFAULT_COLOUR_CODE

    if(num >= 0 && num <= 256) {
        return colourList[num][0]
    }

    return DEFAULT_COLOUR_CODE
}
