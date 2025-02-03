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

const prepareImages = async(images: string[] ):Promise<string[]> => {
    
    const fileImages = images.filter( (image) => image.includes('file') )
    const currentImages = images.filter( (image) => !image.includes('file') )
    
    if( fileImages.length > 0 ){
        const uploadPromises = fileImages.map( (image) => uploadImages(image) )

        const uploadedImages = await Promise.all(uploadPromises)

        currentImages.push(...uploadedImages)
    }


    return currentImages.map((img) => img.split('/').pop()!) // (!) indica que siempre va a llegar algo.
}

const uploadImages = async(image: string):Promise<string> => {

    const formData = new FormData() as any
    formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: image.split('/').pop()
    })

    const { data } = await productsApi.post<{ image:string}>(
        '/files/product', 
        formData, 
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )


    return data.image

}


const updateProduct = async(product: Partial<Product>) =>{
    
    const { id, images = [], user, ...rest } = product
    
    try {

        const checkedImages = await prepareImages(images)
        
        const { data } = await productsApi.patch(`/products/${id}`, {
            ...rest,
            images: checkedImages
        })
        
        return data
    }
    catch (error) {
        throw new Error("Error al actualizar producto")
    }
}

const createProduct = async(product: Partial<Product>) => {
    
    const { id, images = [], user, ...rest } = product
    const checkedImages = await prepareImages(images)
        
    try {
        const { data } = await productsApi.post(`/products`, {
            ...rest,
            images: checkedImages
        })
        
        return data
    }
    catch (error) {
        console.log("error creado", error)
        throw new Error("Error al crear producto")
    }
}

