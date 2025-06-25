const generateOtp = () => {
    return Math.floor(Math.random() * 90000) + 100000
}

export default generateOtp