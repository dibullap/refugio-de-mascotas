import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animal from 'App/Models/Animal';

export default class AnimalsController {
    //Ingresar registro nuevo
    public async setRegistrarAnimal({request, response}: HttpContextContract) {
        const data = request.only([
            'codigo_animal', 'nombre_animal', 'especie', 'raza', 'sexo', 'edad'
        ])
        try {
            let ca: number = data.codigo_animal;
            let animalExists = await Animal.findBy('codigo_animal', ca);
            
            if (animalExists === null){
                await Animal.create(data);
                response.status(200).json({"msg": "Animal registrado exitosamente"});
            } else {
                response.status(400).json({"msg": "Animal ya existe"});
            }
        } catch (error) {
            response.status(500).json({"msg": "Error en el servidor"});
            console.log(error);
        }
    }

    //Listar todos los animales
    public async getListarAnimales(): Promise<Animal[]> {
        const animal = await Animal.all();
        return animal;
    }
    //filtrar por menores de 8 años
    public async getListarAnimalesMenoresDe8(): Promise<Animal[]> {
        const animal = await (await Animal.query().where('edad', '<', 8).from('animals');
        return animal;
    }

    //Filtrar por especie
    public async getListarAnimalesPorEspecie(especie: number): Promise<Animal[]> {
        const animal = await (await Animal.query().where('especie', especie).from('animals');
        return animal;
    }

    //modificar 
    public async putEditarAnimal(codigo_animal: number, {request, response}: HttpContextContract) {
        const data = request.body();
        try {
            let animalExists = await Animal.findBy('codigo_animal', codigo_animal);
            
            if (animalExists !== null){
                const sp = {codigo_animal: codigo_animal};
                await Animal.updateOrCreate(sp, data);
                response.status(200).json({"msg": "Animal editado exitosamente"});
            } else {
                response.status(400).json({"msg": "Animal no existe"});
            }
        } catch (error) {
            response.status(500).json({"msg": "Error en el servidor"});
            console.log(error);
        }
    }

    //eliminar
    public async deleteBorrarAnimal(codigo_animal: number, {response}: HttpContextContract) {
        
        try {
            let animalExists = await Animal.findBy('codigo_animal', codigo_animal);
            
            if (animalExists !== null){
                await animalExists.delete();
                response.status(200).json({"msg": "Animal borrado exitosamente"});
            } else {
                response.status(400).json({"msg": "Animal no existe"});
            }
        } catch (error) {
            response.status(500).json({"msg": "Error en el servidor"});
            console.log(error);
        }
    }
}
