onmessage = (event) => {
    let today = event.data;
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

     hours = padZero(hours);
     minutes = padZero(minutes);
     seconds = padZero(seconds);
     day = padZero(day);
     month = padZero(month + 1);
     year = padZero(year);

    let time = hours + ':' + minutes + ':' + seconds;
    let date = year + '-' + month + '-' + day;
    let currentDate = time + ':' + date;

    postMessage(currentDate.split(':'));
}

let padZero = (num) => {
    if (num < 10) {
        num = "0" + num;
    } else {
        num = num.toString();
    }
    return num;
}


