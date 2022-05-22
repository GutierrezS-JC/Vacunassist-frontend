const users = [
    {
        id: 0,
        email: "Manaos_light@gmail.com",
        nombre: "Manaos",
        apellido: "Light",
        DNI: "69696969",
        fecha_nac:"06/09/69",
        password:"420Manaos420",
        codigo: "935935"
    },
    {
        id: 1,
        email: "Gatubi@gmail.com",
        nombre: "Gatubi",
        apellido: "Hairball",
        DNI: "11511511",
        fecha_nac:"04/02/01",
        password:"420Gatubi420",
        codigo: "115115"
    },
    {
        id: 2,
        email: "Liily@gmail.com",
        nombre: "Liily",
        apellido: "TheBand",
        DNI: "9999999",
        fecha_nac:"01/02/03",
        password:"11Liily11",
        codigo: "011935"
    }
]

export const getUsers = () => {
    return users;
}

export const setUsers = (user) => {
    users.push(user);
}