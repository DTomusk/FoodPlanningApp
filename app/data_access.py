from sqlalchemy.orm import Session 
from app.models import Ingredient, Recipe, RecipeIngredient, RecipeInput
from app.database import engine

def get_recipes():
    with Session(engine) as session:
        return session.query(Recipe).all()
    
def get_ingredients():
    with Session(engine) as session:
        return session.query(Ingredient).all()
    
# this is a big function, break it down 
def insert_recipe(input: RecipeInput):
    recipe = Recipe(name=input.name, cuisine=input.cuisine, difficulty=input.difficulty, isVegetarian=input.isVegetarian)
    with Session(engine) as session:
        # Check if the recipe exists, and return it if it does
        existing_recipe = session.query(Recipe).filter(Recipe.name == input.name).first()
        if existing_recipe:
            print("Recipe already exists")
            return existing_recipe 
        print(f"Adding new recipe: {recipe.name}")
        session.add(recipe)
        session.commit()
        # Get the id of the recipe that was just added for the joining table
        recipe_id = session.query(Recipe).filter(Recipe.name == input.name).first().id
        for ingredient_input in input.ingredients:
            print("Adding ingredient: ", ingredient_input)
            # Check if ingredient already exists and add a new one if not 
            existing_ingredient = session.query(Ingredient).filter(Ingredient.name == ingredient_input.name).first()
            if not existing_ingredient:
                print("Adding new ingredient: ", ingredient_input.name)
                ingredient = Ingredient(name=ingredient_input.name)
                session.add(ingredient)
                session.commit()
            ingredient_id = session.query(Ingredient).filter(Ingredient.name == ingredient_input.name).first().id
            recipe_ingredient = RecipeIngredient(recipe_id=recipe_id, ingredient_id=ingredient_id, quantity=ingredient_input.quantity, unit=ingredient_input.unit)
            session.add(recipe_ingredient)
            session.commit()
            
        session.commit()
    
def insert_ingredient(name: str):
    ingredient = Ingredient(name=name)
    with Session(engine) as session:
        session.add(ingredient)
        session.commit()