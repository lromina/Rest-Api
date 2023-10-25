import {pool} from "./database.js";

class LibroController{
    async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);// respuesta que le damos al cliente
    }

    //Añadir un Nuevo Libro
    async add(req, res){
        const libro = req.body; // permite obtener la solicitud de la carga de usuario
        const schema = {
            nombre: String,
            autor: String,
            categoria: String,
            anioPublicacion: Date,
            ISBN: String,
          
        };
        
        try {
          // Verifica si los atributos de la solicitud coinciden con el schema
            for (const atributo in libro) {
              if (!schema.hasOwnProperty(atributo)) {
              // El atributo no existe en el schema
                res.status(400).json({ Error: `El atributo ${atributo} no existe` });
                return;
              }
            }

          const [existeLibro] = await pool.query(
            `SELECT * FROM libros WHERE ISBN = ?`,[libro.ISBN]);

            if (existeLibro.length > 0) {
              res.status(409).json({ Error: 'El libro ya existe en la base de datos' });
          } else {
              // Si no se encontró un registro existente, realiza la inserción
              const [result] = await pool.query(
                  'INSERT INTO libros (nombre, autor, categoria, anioPublicacion, ISBN) VALUES (?, ?, ?, ?, ?)',
                  [libro.nombre, libro.autor, libro.categoria, libro.anioPublicacion, libro.ISBN]
              );
              res.json({ "Id Insertado": result.insertId });
          }
      } catch (error) {
          res.status(500).json({ Error: 'Error en los datos de la base' });
      }

    }
    
    //Eliminar un Registro
    async delete(req, res){
        const libro = req.body;
        try {
          const [existeLibro] = await pool.query(
            `SELECT * FROM libros WHERE ISBN = ?`,[libro.ISBN]);

          if (existeLibro.length > 0) {
              const [result] = await pool.query (`DELETE FROM libros WHERE ISBN=(?)`, [libro.ISBN]);
              res.json({"Registro Eliminado": result.affectedRows});
          } else {
            res.status(404).json({ Error: 'Libro no encontrado', libro});
          }
          
        } catch (error) {
          res.status(404).json({ Error: 'No es posible eliminar el Registro', Id: libro});
        } 
        
        
    }

    //Modificar un Registro
    async update(req, res){
        const libro = req.body; 
        const schema = {
          nombre: String,
          autor: String,
          categoria: String,
          anioPublicacion: Date,
          ISBN: String,
        
        };
      
        try {
          for (const atributo in libro) {
            if (!schema.hasOwnProperty(atributo)) {
            // El atributo no existe en el schema
              res.status(400).json({ Error: `El atributo ${atributo} no existe` });
              return;
            }
          }
          const [existeLibro] = await pool.query(
            `SELECT * FROM libros WHERE ISBN = ?`,[libro.ISBN]);

            if (existeLibro.length > 0) {
              const [result] = await pool.query (`UPDATE libros SET nombre =(?), autor=(?), categoria=(?), anioPublicacion=(?) WHERE ISBN=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.anioPublicacion, libro.ISBN]);
              res.json({"Registro Modificado": result.changedRows});       
          } else {
            res.status(404).json({ Error: 'Libro no encontrado' });         

          }
        } catch (error) {
          res.status(500).json({ Error: 'Error en los datos de la base' });
        }

    }

    //Obtener un Registro
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



 
            
  
