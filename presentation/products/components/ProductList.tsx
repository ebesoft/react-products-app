import { Product } from "@/core/products/interfaces/product.interface"
import { RefreshControl } from "react-native"
import { FlatList } from "react-native"
import { ProductCard } from "./ProductCard"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

interface Props {
    products: Product[]
    loadNextPage: () => void
}

const ProductList = ({ products, loadNextPage }: Props) => {

    const [ isRefreshing, setIsRefreshing ] = useState(false)
    const QueryClient = useQueryClient()

    const onPullToRefresh = async() => {
        setIsRefreshing(true)

        await new Promise((resolve) => setTimeout(resolve, 200))
        
        // invalidar cache.
        QueryClient.invalidateQueries({
            queryKey: ['products', 'infinite'],
        })
        
        setIsRefreshing(false)
    }

    return (
        <FlatList
            data={ products }
            numColumns={ 2 }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => 
                <ProductCard product={ item } />
            }

            onEndReached={ loadNextPage }
            onEndReachedThreshold={ 0.8 }
            showsVerticalScrollIndicator={ false }
            refreshControl={
                <RefreshControl refreshing={ isRefreshing } onRefresh={ onPullToRefresh } />
            }
        />
    )
}

export default ProductList