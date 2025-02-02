import { createUpdateProduct } from "@/core/products/actions/create-update-product.action"
import { getProductById } from "@/core/products/actions/get-product-by-id.action"
import { Product } from "@/core/products/interfaces/product.interface"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { Alert } from "react-native"

export const useProduct = ( productId: string) => {

    const QueryClient = useQueryClient()
    const productIdRef = useRef(productId) //new // uuid()

    const productsQuery = useQuery({
        queryKey: ['products', productId],
        queryFn: () => getProductById(productId),
        staleTime: 1000 * 60 * 5, // 1 hora
    })

    // Mutaciones
    const productMutation = useMutation({
        mutationFn: async( data: Product) => createUpdateProduct({
            ...data,
            id: productIdRef.current,
        }),
        
        onSuccess: (data: Product) => {

            productIdRef.current = data.id

            QueryClient.invalidateQueries({
                queryKey: ['products', 'infinite'],
            })

            QueryClient.invalidateQueries({
                queryKey: ['products', data.id],
            })

            Alert.alert('Producto guardado', `${data.title} se guardo correctamente`)
        },

        
    })

    

    return {
        productQuery: productsQuery,
        productMutation: productMutation,
    }

}
