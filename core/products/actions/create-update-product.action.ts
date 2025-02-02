import { productsApi } from "@/core/api/productsApi";
import { Product } from "../interfaces/product.interface";


export const createUpdateProduct = async (product: Partial<Product>) => {
    
    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock)
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price)

    if( product.id && product.id !== 'new' ){
        
        return updateProduct(product)
    }

    return createProduct(product)

}

const updateProduct = async(product: Partial<Product>) =>{
    
    const { id, images = [], user, ...rest } = product
    
    try {
        
        const { data } = await productsApi.patch(`/products/${id}`, {
            ...rest,
        })
        
        return data
    }
    catch (error) {
        throw new Error("Error al actualizar producto")
    }
}

const createProduct = async(product: Partial<Product>) => {
    console.log("data creado", product)
    const { id, images = [], user, ...rest } = product
    
    try {
        const { data } = await productsApi.post(`/products`, {
            ...rest,
        })
        
        return data
    }
    catch (error) {
        console.log("error creado", error)
        throw new Error("Error al crear producto")
    }
}

