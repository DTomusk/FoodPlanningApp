import Image from 'next/image'

export default async function Page() {
  const data = await fetch("http://127.0.0.1:8000/recipes");
  const recipes = await data.json();
  return <div>
      <h1 className="pt-4 pb-4 text-4xl font-bold bg-blue-100 text-center">Dave and <span className="text-5xl bg-gradient-to-r from-amber-500 to-blue-300 shadow-xl text-transparent bg-clip-text">SOPH'S</span> Super cool awesome fun <span className="text-5xl bg-gradient-to-r from-blue-500 to-red-500 text-transparent bg-clip-text">RECIPE</span> website!</h1>
      <p className="bg-red-100 text-center">These are the recipes</p>
        <ul className="grid grid-cols-2 gap-4 p-4">
            {recipes.map((recipe) => (
                <li className="text-2xl bg-gray-200 p-4 rounded-lg shadow-xl" 
                    key={recipe.id}>
                    <h2 className="font-bold">{recipe.name}</h2>
                    <p className="mt-4">{recipe.cuisine}</p>
                    <ul>
                        {recipe.ingredients.map((ingredient) => (
                            <li className="mt-3" key={ingredient.ingredient.id}>
                              {ingredient.ingredient.name}: {ingredient.quantity} {ingredient.unit}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
        <Image src='/shutterstock_1166701054-header-1.webp' alt="Guinea pigs!" width={500} height={500}/>
    </div>
}