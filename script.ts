interface IVehicle {
    name: string;
    plate: string;
    parkDate: Date | string;
}


(function () {
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    function calcTime(mil: number) {
        const min = Math.floor(mil/ 60000)
        const sec = Math.floor((mil % 60000) / 1000)

        return `${min}m ${sec}s`;
    }

    function parking() {
        function read(): Array<IVehicle>  {
            return localStorage.parking ? JSON.parse(localStorage.parking) : [];

        }
        
        function add(vehicle: IVehicle, toSave?: boolean) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vehicle.name}</td>
                <td>${vehicle.plate}</td>
                <td>${vehicle.parkDate}</td>
                <td><button class="delete" data-plate="${vehicle.plate}">X</button></td>
            `
            
            row.querySelector(".delete")?.addEventListener("click", function() {
                remove(this.dataset.plate)
            })

            $("#parking")?.appendChild(row);

            if(toSave) save([...read(), vehicle]);

        }
        
        function save(vehicles: Array<IVehicle>) {
            localStorage.setItem("parking", JSON.stringify(vehicles));
        }

        function remove(plate: string) {
            const {parkDate }  = read().find(vehicle => vehicle.plate === plate)
            
            const time = calcTime(new Date().getTime() - parkDate.getTime());

            if(!confirm('Deseja enecerrar?')) return;

            save(read().filter(vehicle => vehicle.plate !== plate))

            render();
        }


        function render() {
            $("#parking")!.innerHTML = "";

            const parking = read();

            if(parking.length) {
                parking.forEach((car) => {
                    add(car);
                })
            }
        }

        return { read, add, remove, save, render}
    }

    parking().render();

    $('#register')?.addEventListener("click", (e) => {
        const name = $('#name')?.value;
        const plate = $('#plate')?.value;
        const parkDate = new Date();

        if(!name || !plate) {
            alert("Campos nome e placa são obrigatórios")
            return;
        }

        const vehicle: IVehicle = { name, plate, parkDate } 
        
        parking().add(vehicle, true)

    })

    
})()

