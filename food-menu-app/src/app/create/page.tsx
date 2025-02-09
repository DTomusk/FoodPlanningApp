"use client"

import { useEffect, useState } from "react"
import { Cuisine, Ingredient, RecipeInput } from "../types"
import { submitRecipe } from "./actions"

export default function Page() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [recipeName, setRecipeName] = useState<string>("")
    const [cuisine, setCuisine] = useState<Cuisine>(Cuisine.CHINESE)
    const [difficulty, setDifficulty] = useState<number>(0)
    const [isVegetarian, setIsVegetarian] = useState<boolean>(false)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/ingredients")
            .then((data) => data.json())
            .then((ingredients) => {
                setIngredients(ingredients)
                setLoading(false)
            })
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const recipe: RecipeInput = {
            name: recipeName,
            cuisine: cuisine,
            difficulty: difficulty,
            isVegetarian: isVegetarian,
            ingredients: []
        }
        await submitRecipe(recipe); // Call the server action
        alert("Recipe submitted!");
      };

    if (loading) return <p>Loading...</p>

    return <div>
        <h1>You made it to the new page!</h1>
        <div className="grid grid-cols-2 gap-4">
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <label>
                Cuisine:
                <select name="cuisine"
                    onChange={(event) => setCuisine(event.target.value as Cuisine)}
                    >
                    {Object.values(Cuisine).map((cuisine) => (
                        <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}

                </select>
            </label>
            <label>
                Difficulty:
                <input type="number" name="difficulty" />
            </label>
            <label>
                Vegetarian:
                <input type="checkbox" name="isVegetarian" />
            </label>
        </form>
        <ul>
            {ingredients.map((ingredient: Ingredient) => (
                <li key={ingredient.id}>{ingredient.name}</li>
            ))}
        </ul>
        </div>
    </div>
}