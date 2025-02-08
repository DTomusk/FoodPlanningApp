from typing import List
from pydantic import BaseModel
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.enums import Cuisine, Unit

class Base(DeclarativeBase):
    pass

class RecipeIngredient(Base):
    __tablename__ = 'recipe_ingredients'

    recipe_id: Mapped[int] = mapped_column(ForeignKey('recipes.id'), primary_key=True)
    ingredient_id: Mapped[int] = mapped_column(ForeignKey('ingredients.id'), primary_key=True)
    quantity: Mapped[int] = mapped_column()
    unit: Mapped[Unit] = mapped_column()

    ingredient: Mapped["Ingredient"] = relationship(lazy='joined')
    
class Ingredient(Base):
    __tablename__ = 'ingredients'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))

class Recipe(Base):
    __tablename__ = 'recipes'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    cuisine: Mapped[Cuisine] = mapped_column()
    difficulty: Mapped[int] = mapped_column()
    isVegetarian: Mapped[bool] = mapped_column()

    ingredients: Mapped[List["RecipeIngredient"]] = relationship(lazy='joined')

class IngredientInput(BaseModel):
    name: str
    quantity: int
    unit: Unit

class RecipeInput(BaseModel):
    name: str
    cuisine: Cuisine
    difficulty: int
    isVegetarian: bool
    ingredients: List[IngredientInput]