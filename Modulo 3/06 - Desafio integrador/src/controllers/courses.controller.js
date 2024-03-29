import { coursesService } from '../services/repository/services.js';

// export default class CoursesServiceDao {
    export const getAll = async (req, res) => {
    // getAll = async (req, res) => {
        try {
            let courses = await coursesService.getAll();
            res.send(courses);
        } catch (error) {
            res.status(500).send({error:  error, message: "No se pudo obtener los cursos."});
        }
    }
    
    export const save = async (req, res) => {
    // save = async (req, res) => {
        try {
            let result = await coursesService.save(req.body);        
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send({error:  error, message: "No se pudo guardar el curso."});
        }
    }
// }