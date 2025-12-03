 import {
  seleccionarCantidadGustos,
  ingresarCliente,
  seleccionarProducto,
  seleccionarSabores,
} from "./dataEntry.js";

import fs from "fs";
import readlineSync from "readline-sync";

let sabores = JSON.parse(fs.readFileSync("./data/sabores.json", "utf-8"));
let productos = JSON.parse(fs.readFileSync("./data/productos.json", "utf-8"));
let pedidos = JSON.parse(fs.readFileSync("./data/pedidos.json", "utf-8"));

let cliente = ingresarCliente();

let productosPedido = [];
let total = 0;
let seguir = "s";

while (seguir === "s") {
  let producto = seleccionarProducto(productos);
  let gustos = seleccionarCantidadGustos(producto.maxGustos);
  let saboresElegidos = seleccionarSabores(sabores, gustos);

  productosPedido.push({
    nombre: producto.nombre,
    precio: producto.precio,
    sabores: saboresElegidos,
  });

  total += producto.precio;

  seguir = readlineSync
    .question("¿Querés agregar otro producto? (s/n) ")
    .toLowerCase();
}

let pedido = {
  cliente: cliente,
  productos: productosPedido,
  total: total,
};

pedidos.push(pedido);

fs.writeFileSync("./data/pedidos.json", JSON.stringify(pedidos, null, 2));

