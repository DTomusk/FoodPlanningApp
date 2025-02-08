from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.data_access import get_recipes, get_ingredients, insert_recipe, insert_ingredient
from app.models import RecipeInput

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ingredients")
def read_ingredients():
    return get_ingredients()

@app.get("/recipes")
def read_recipes():
    return get_recipes()

@app.post("/recipes")
def create_recipe(recipe_input: RecipeInput):
    recipe = insert_recipe(recipe_input)
    return recipe

@app.post("/ingredients")
def create_ingredient(name: str):
    insert_ingredient(name)
    return {"message": "ingredient created"}

@app.get("/menu")
def generate_menu(number_of_recipes: int):
    # create service for this 
    pass