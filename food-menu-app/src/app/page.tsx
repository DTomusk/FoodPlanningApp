import Image from 'next/image'
import Link from 'next/link';
import { Recipe } from './types';

export default async function Page() {
  const data = await fetch("http://127.0.0.1:8000/recipes");
  const recipes = await data.json();
  return <div>
      <div className='flex max-w-screen-lg mx-auto flex-col items-center'>
      <Link href="/create">Add a recipe</Link>
      <ul className="grid grid-cols-3 gap-6 p-4">
          {recipes.map((recipe: Recipe) => (
              <li className="text-2xl rounded-xl shadow-xl overflow-hidden hover:bg-gray-100" 
                  key={recipe.id}>
                  <h2 className="p-4 font-bold bg-blue-500 text-white">{recipe.name}</h2>
                  <p className="m-4">{recipe.cuisine}</p>
                  <ul className='text-grey-800'>
                      {recipe.ingredients.map((ingredient) => (
                          <li className="m-4" key={ingredient.ingredient.id}>
                            {ingredient.ingredient.name}: {ingredient.quantity} {ingredient.unit}</li>
                      ))}
                  </ul>
              </li>
          ))}
        </ul>
        <Image src='/shutterstock_1166701054-header-1.webp' alt="Guinea pigs!" width={500} height={500}/>
        </div>
    </div>
}