const years = (length) => {
    let x = []
    const thisYear = new Date().getFullYear()
    for (let i = (thisYear-length); i <= thisYear; i++) {
        var obj = {}

        obj['value'] = i
        x.push(obj)
    }

    return x
}

const months = () => {
    let x = []
    for (let i = 1; i <= 12; i++) {
        var obj = {}

        obj['name'] = `Tháng ${i}`
        obj['value'] = i
        x.push(obj)
    }

    return x
}

const days = (currentMonth, currentYear) => {
    let dayNum
    const x = []
    if ([1,3,5,7,8,10,12].includes(currentMonth)) {
        dayNum = 31
    } else if ([4,6,9,11].includes(currentMonth)) {
        dayNum = 30
    } else {
        if (new Date(currentYear, 1, 29).getMonth() === 1) {
            dayNum = 29
        } else {
            dayNum = 28
        }
    }

    for (let i = 1; i <= dayNum; i++) {
        var obj = {}

        obj['value'] = i
        x.push(obj)
    }

    return x
}

export {
    years,
    months,
    days
}
