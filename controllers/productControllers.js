// Controladores de cada tabla de la base de datos mysql
// Unimos el controlador con el modelo de la tabla
// Ejemplo: modelProducts --> productsControllers

import { modelProducts } from "../models/product.js";

// Mostrar todos los productos

export const productsControllers = async (req, res) => {
  try {
    const products = await modelProducts.findAll();

    res.json({
      res: "Productos mostrados exitosamente",
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Agregar nuevos productos ala tabla products

export const addProductsControllers = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const addProducts = await modelProducts.create({
      name,
      description,
      price,
    });

    res.json({
      res: "¡Producto añadido correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un products por id

export const deleteProductsControllers = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteProducts = await modelProducts.destroy({
      where: {
        id,
      },
    });

    res.json({
      res: "¡Producto con el id " + id + " Eliminado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Modificar un producto por id

export const updateProductControllers = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body

  try {
    const updateProducts = await modelProducts.findOne({
      where: {
        id,
      },
    });

    updateProducts.set({
      name, description, price
    });
    await updateProducts.save();
    res.json({
      res: "¡Producto actualizado exitosamente!"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
