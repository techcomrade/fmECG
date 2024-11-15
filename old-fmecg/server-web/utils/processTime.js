const convertTimeToString = (timestamps) =>{
    const date = new Date(timestamps)
    return date.toString();
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms*1000));


const calculateAge = (timestamp) => {
    // Tạo đối tượng Date từ timestamp
    const birthDate = new Date(timestamp);
    const today = new Date();

    // Tính tuổi
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Điều chỉnh tuổi nếu ngày sinh chưa đến trong năm hiện tại
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

module.exports = {
    calculateAge
}