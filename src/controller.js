import {pool} from "./database.js";

class LibroController{
    async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);// respuesta que le damos al cliente
    }

    async add(req, res){
        const libro = req.body; // permite obtener la solicitud de la carga de usuario
        const [result] = await pool.query (`INSERT INTO libros (nombre, autor, categoria, anioPublicacion, ISBN) VALUES (?,?,?,?,?)`, [libro.nombre, libro.autor, libro.categoria, libro.anioPublicacion, libro.ISBN]);
        res.json({"Id Insertado": result.insertId});
    }
    async delete(req, res){
        const libro = req.body; 
        const [result] = await pool.query (`DELETE FROM libros WHERE id=(?)`, [libro.id]);
        res.json({"Registro Eliminado": result.affectedRows});
    }

    async update(req, res){
        const libro = req.body; 
        const [result] = await pool.query (`UPDATE libros SET nombre =(?), autor=(?), categoria=(?), anioPublicacion=(?), ISBN=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.anioPublicacion, libro.ISBN, libro.id]);
        res.json({"Registro Modificado": result.changedRows});
    }

    async getOne(req, res) {
        const libro = req.params.id; // Obtenemos el ID de la URL
        //const libro = req.body.id; // obtenemos el Id cargando en el body
        const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [libro]);

        if (result.length > 0) {
            res.json(result[0]);
          } else {
            res.status(404).json({ Error: 'Libro no encontrado', Id: libro});
          }
      }
    

}

export const libro = new LibroController();

//Asincronas: que el servidor no se encuentre trabado es decir que pueda
//recibir varias solicitudes sin quedarse colgado. 




  
