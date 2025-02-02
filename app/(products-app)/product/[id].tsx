import { Size } from "@/core/products/interfaces/product.interface"
import ProductImages from "@/presentation/products/components/ProductImages"
import { useProduct } from "@/presentation/products/hooks/useProduct"
import ThemedButton from "@/presentation/theme/components/ThemedButton"

import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup"
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput"
import { ThemedView } from "@/presentation/theme/components/ThemedView"
import { Ionicons } from "@expo/vector-icons"
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router"
import { Formik } from "formik"
import { useEffect } from "react"
import { View, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native"


const ProductScreen = () => {

    const {id } = useLocalSearchParams()
    const navigation = useNavigation()

    const { productQuery, productMutation } = useProduct(`${id}`)

    useEffect(() => {

        // TODO: comolocar nombre de producto.

        navigation.setOptions({
            headerRight: () => <Ionicons name="camera-outline" size={ 24 } />,
        })
    }, [])

    useEffect(() => {
        if( productQuery.data){
            navigation.setOptions({
                headerTitle: productQuery.data.title,
            })
        }
    }, [ productQuery.data ])

    if( productQuery.isLoading ){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} />
            </View>
        )
    }


    if( !productQuery.data ){
        return <Redirect href='/(products-app)/(home)' />
    }

    const product = productQuery.data

    return (
        
        <Formik
            initialValues={product}
            onSubmit={(productLike) => productMutation.mutate(productLike)}
        >
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
                <KeyboardAvoidingView
                    behavior={ Platform.OS === "ios" ? "padding" : undefined }
                >
                    <ScrollView>

                        <ProductImages 
                            images={values.images}
                        />

                        <ThemedView style={{ marginHorizontal: 10, marginTop: 20}}>
                            <ThemedTextInput 
                                placeholder="Titulo" 
                                style={{ marginVertical:5 }}
                                value={ values.title }
                                onChangeText={handleChange('title')}
                            />
                            <ThemedTextInput 
                                placeholder="Slug" 
                                style={{ marginVertical:5 }}
                                value={ values.slug }
                                onChangeText={handleChange('slug')}
                            />
                            <ThemedTextInput 
                                placeholder="Description" 
                                style={{ marginVertical:5 }}
                                multiline
                                numberOfLines={ 5 }
                                value={ values.description }
                                onChangeText={handleChange('description')}
                            />
                        </ThemedView>

                        <ThemedView 
                            style={{ 
                                marginHorizontal: 10, 
                                marginVertical: 5, 
                                flexDirection: "row", 
                                gap:10 
                            }}
                        >
                            <ThemedTextInput 
                                placeholder="Precio" 
                                style={{ marginVertical:5, flex: 1 }}
                                value={ values.price.toString() }
                                onChangeText={handleChange('price')}
                            />
                            <ThemedTextInput 
                                placeholder="Stock" 
                                style={{ marginVertical:5, flex: 1 }}
                                value={ values.stock.toString() }
                                onChangeText={handleChange('stock')}
                            />

                        </ThemedView>

                        <ThemedView 
                            style={{
                                marginHorizontal:10
                            }}
                        >
                            <ThemedButtonGroup 
                                options={[ 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                                selectedOptions={values.sizes}
                                onSelect={(selectedSize) => {
                                    const newSizeVAlue = values.sizes.includes(
                                        selectedSize as Size
                                    )
                                    ? values.sizes.filter((s) => s !== selectedSize)
                                    : [ ...values.sizes, selectedSize ]
                
                                    setFieldValue('sizes', newSizeVAlue)
                                    
                                    
                                }}
                            />

                            <ThemedButtonGroup 
                                options={[ 'kid', 'women', 'men', 'unixes']}
                                selectedOptions={[values.gender]}
                                onSelect={(selectedGender) => setFieldValue('gender', selectedGender)}
                            />

                        </ThemedView>

                        <View
                            style={{
                                marginHorizontal: 10,
                                marginBottom: 50,
                                marginTop: 20,
                            }}
                        >
                            <ThemedButton
                                icon='save-outline'
                                onPress={() => handleSubmit()}
                            >
                                Guardar
                            </ThemedButton>
                        </View>
                    
                    </ScrollView>
                </KeyboardAvoidingView>
            )}
            
        </Formik>
        
    )
}

export default ProductScreen