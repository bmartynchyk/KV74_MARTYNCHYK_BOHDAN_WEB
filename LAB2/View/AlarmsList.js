let alarmsBuffer = [];

class AlarmsList {
    constructor(hours, minutes, date) {
        this.hours = hours;
        this.minutes = minutes;
        this.date = date;
    }

    showAlarms = () => {
        let table = document.getElementById("alarms-list-table");
        let newRow = table.insertRow(-1);

        let hoursCell = newRow.insertCell(0);
        let minutesCell = newRow.insertCell(1);
        let dateCell = newRow.insertCell(2);
        let buttonCell = newRow.insertCell(3);

        let newText = document.createTextNode(this.hours);
        hoursCell.appendChild(newText);

        newText = document.createTextNode(this.minutes);
        minutesCell.appendChild(newText);

        newText = document.createTextNode(this.date);
        dateCell.appendChild(newText);

        this.addButtonToRow(buttonCell, this.hours, this.minutes, this.date);
    }

    addButtonToRow = (buttonCell, hours, minutes, date) => {
        let button = document.createElement('input');
        button.type = "button";
        button.className = "btn btn-danger";
        button.value = "remove";
        button.onclick = function () {
            deleteRow(this);
            removeAlarmFromBuffer(hours, minutes, date);
        };
        buttonCell.appendChild(button);
    }
}

let deleteRow = (button) => {
    let row = button.parentNode.parentNode;
    let table = document.getElementById('alarms-list-table');

    table.deleteRow(row.rowIndex);
}

let removeAlarmFromBuffer = (hours, minutes, date) => {
    let alarmTime = (hours + ':' + minutes + ':' + date);
    console.log(alarmTime);
    const index = alarmsBuffer.indexOf(alarmTime);
    if (index > -1) {
        alarmsBuffer.splice(index, 1);
    }
}
