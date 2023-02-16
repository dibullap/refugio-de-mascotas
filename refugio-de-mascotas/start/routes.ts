/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import AnimalsController from 'App/Controllers/Http/AnimalsController'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/listar-animales', 'AnimalsController.getListarAnimales')
  Route.get('/listar-animales-menores-8', 'AnimalsController.getListarAnimalesMenoresDe8')
  Route.get('/listar-animales-especie/:esp', async ({params}) => {
    return new AnimalsController().getListarAnimalesPorEspecie((Number(params.esp)));
  })

  Route.post('/registrar-animal', async ({request, response}) => {
    return new AnimalsController().setRegistrarAnimal({request, response});
  })

  Route.put('/editar-animal/:ca', async ({request, response, params}) => {
    return new AnimalsController().putEditarAnimal(Number(params.ca), {request, response});
  })

  Route.delete('/borrar-animal/:ca', async ({response, params}) => {
    return new AnimalsController().deleteBorrarAnimal(Number(params.ca), {response});
  })
  
}).prefix('/animales')