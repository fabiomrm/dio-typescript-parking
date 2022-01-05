(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTime(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m ${sec}s`;
    }
    function parking() {
        function read() {
            return localStorage.parking ? JSON.parse(localStorage.parking) : [];
        }
        function add(vehicle, toSave) {
            var _a, _b;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vehicle.name}</td>
                <td>${vehicle.plate}</td>
                <td>${vehicle.parkDate}</td>
                <td><button class="delete" data-plate="${vehicle.plate}">X</button></td>
            `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remove(this.dataset.plate);
            });
            (_b = $("#parking")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (toSave)
                save([...read(), vehicle]);
        }
        function save(vehicles) {
            localStorage.setItem("parking", JSON.stringify(vehicles));
        }
        function remove(plate) {
            const { parkDate } = read().find(vehicle => vehicle.plate === plate);
            const time = calcTime(new Date().getTime() - parkDate.getTime());
            if (!confirm('Deseja enecerrar?'))
                return;
            save(read().filter(vehicle => vehicle.plate !== plate));
            render();
        }
        function render() {
            $("#parking").innerHTML = "";
            const parking = read();
            if (parking.length) {
                parking.forEach((car) => {
                    add(car);
                });
            }
        }
        return { read, add, remove, save, render };
    }
    parking().render();
    (_a = $('#register')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
        var _a, _b;
        const name = (_a = $('#name')) === null || _a === void 0 ? void 0 : _a.value;
        const plate = (_b = $('#plate')) === null || _b === void 0 ? void 0 : _b.value;
        const parkDate = new Date();
        if (!name || !plate) {
            alert("Campos nome e placa são obrigatórios");
            return;
        }
        const vehicle = { name, plate, parkDate };
        parking().add(vehicle, true);
    });
})();
