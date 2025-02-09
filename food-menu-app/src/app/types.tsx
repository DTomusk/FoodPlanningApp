export type Ingredient = {
    id: number
    name: string
}

export type Recipe = {
    id: number
    name: string
    cuisine: Cuisine
    difficulty: number
    isVegetarian: boolean
    ingredients: Array<{
        recipeId: number
        ingredientId: number
        quantity: number
        unit: Unit
        ingredient: Ingredient
    }>
}

export type RecipeInput = {
    name: string
    cuisine: Cuisine
    difficulty: number
    isVegetarian: boolean
    ingredients: Array<{
        name: string
        quantity: number
        unit: Unit
    }>
}

export enum Cuisine {
    CHINESE = 'Chinese',
    JAPANESE = 'Japanese',
    KOREAN = 'Korean',
    THAI = 'Thai',
    VIETNAMESE = 'Vietnamese',
    INDIAN = 'Indian',
    MEXICAN = 'Mexican',
    ITALIAN = 'Italian',
    FRENCH = 'French',
    SPANISH = 'Spanish',
    GREEK = 'Greek',
    MIDDLE_EASTERN = 'Middle Eastern',
    AMERICAN = 'American',
    LATIN_AMERICAN = 'Latin American',
    AFRICAN = 'African',
    BRITISH = 'British',
    OTHER = 'Other'
}

export type Unit = 'mL' | 'L' | 'g' | 'kg' | 'tsp' | 'tbsp' | 'oz' | 'lb' | 'cup' | 'number'