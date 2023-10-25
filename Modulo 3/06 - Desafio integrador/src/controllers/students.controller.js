import { studentService } from '../services/repository/services.js';
import { sendEmailCheckout } from './emailController.js';

export const getAll = async (req, res) => {
    try {
        let students = await studentService.getAll();        
        res.send(students);
    } catch (error) {
        res.status(500).send({ error: error, message: "No se pudo obtener los estudiantes." });
    }
}

export const createStudent = async (req, res) => {
    try {
        let result = await studentService.createStudent(req.body);
        res.status(201).send(result);
        sendEmailCheckout(req.body)
    } catch (error) {
        res.status(500).send({ error: error, message: "No se pudo guardar el estudiante." });
    }
}
