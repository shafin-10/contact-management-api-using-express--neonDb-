import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config";
import { Pool } from "pg";

const app: Application = express();
app.use(express.json());

const pool = new Pool({
  connectionString: config.connection_string,
});

const initDB = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);`);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

initDB();

app.post("/api/v1/contacts", async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    const result = await pool.query(
      ` INSERT INTO contacts (name, email, subject, message) VALUES
            ($1, $2, $3, $4) RETURNING *
            `,
      [name, email, subject, message],
    );
    res.status(201).json({
      success: true,
      message: "Contact message created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
});

app.get("/api/v1/contacts", async (req : Request, res : Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM contacts`);

      res.status(401).json({
        success : true,
        message : "Contact message fetched successfully",
        data : result.rows
      });
  } catch (error : any) {
    res.status(500).json({
      success : false,
      message : error?.message,
    });
  }
})

app.get("/api/v1/contacts/:id", async(req : Request, res : Response) => {
  try {
    const {id} = req.params;

    const result = await pool.query(`SELECT * FROM contacts WHERE id = $1`, [id]);
    //console.log(result.rows);
    
     if(result.rowCount === 0){
      res.status(404).json({
        success : false,
        message : "user not found"
      })
    }

    res.status(201).json({
      success : true,
      message : "Contact fetched successfully",
      data : result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
})


app.delete("/api/v1/contacts/:id", async (req : Request, res : Response) => {
  try {
    const {id} = req.params;

    const result = await pool.query(`DELETE FROM contacts where ID = $1 RETURNING *`, [id]);

     if(result.rowCount === 0){
      res.status(404).json({
        success : false,
        message : "user not found"
      })
    }

    res.status(201).json({
      success : true,
      message : "User deleted sucessfully",
      data : result.rows[0]
    })


  }  catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
})

app.put("/api/v1/contacts/:id", async (req : Request, res : Response) => {
  try {
    const {id} = req.params;

    const { name, email, subject, message } = req.body;

    const result = await pool.query(`
        UPDATE contacts
        SET 
        name = COALESCE($1, name),
       email = COALESCE($2,  email),
        subject = COALESCE($3, subject),
        message = COALESCE($4, message)
        WHERE id = $5 RETURNING *
      `, [name ?? null, email ?? null, subject ?? null, message ?? null, id]);

    if(result.rowCount === 0){
      res.status(404).json({
        success : false,
        message : "user not found"
      })
    }

    res.status(201).json({
      success : true,
      message : "User updated successfully",
      data : result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
})

app.listen(config.port, () => {
  console.log(`Server litsening to port ${config.port}`);
});
