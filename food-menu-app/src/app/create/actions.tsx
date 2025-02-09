"use server"

import { RecipeInput } from "../types";

export async function submitRecipe(recipe: RecipeInput) {
    try {
        const response = await fetch("http://127.0.0.1:8000/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                recipe
            })
        })
    } catch (error) {
        console.error("Error in submitting form: ", error)
    }
}