interface IVehicle {
    name: string;
    plate: string;
    parkDate: Date;
}


(function () {
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

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
            
            $("#parking")?.appendChild(row);

            if(toSave) save([...read(), vehicle]);

        }
        
        function save(vehicles: Array<IVehicle>) {
            localStorage.setItem("parking", JSON.stringify(vehicles));
        }

        function remove() {

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

