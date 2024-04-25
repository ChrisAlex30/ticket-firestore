const express=require('express')

const path = require('path');
const app=express()
const jwt = require('jsonwebtoken');
var admin = require("firebase-admin");
const { v4: uuidv4 } = require('uuid');
const cors=require('cors')
// const fs = require('fs');
const { randomUUID } = require('crypto')


const multer = require("multer");

var serviceAccount = require("./case-6467f-firebase-adminsdk-betri-3133232f4a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:"gs://case-6467f.appspot.com"
});

const bucket=admin.storage().bucket()
const storage=multer.memoryStorage();
const upload=multer({storage:storage})


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = '../tickets-react/vite-project/public/upload-files/';
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         // const uploadDir = '../vite-project/public/upload-files/';
//         // const fullFilePath = path.join(uploadDir, file.originalname);
//         // console.log('File stored at:', fullFilePath);
//       cb(null,file.originalname);
//     },
//   });
  
//   const upload = multer({ storage: storage });

const connection=require('./connection');
const { log } = require('console');

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {    
      jwt.verify(authHeader, 'hello', (err, username) => {
        if (err) {
          return res.sendStatus(403);
           }  
        else{
            req.headers.id=username.id
            req.headers.role=username.role
          next();
          }
      });
    } else {
      res.sendStatus(401);
    }
  };


  app.post('/api/emp/emplogin', async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password)
            return res.status(401).json({ msg: 'Invalid username or password' });

        const results = await connection.query('SELECT * FROM employee WHERE empname=? AND emppassword=?', [name, password]);

       
        if (results[0].length === 0)
            return res.status(401).json({ msg: 'Invalid username or password' });
        else {
            const empid = results[0][0].empid;
            const emprole=results[0][0].emprole
            const token = jwt.sign({ name, id: empid,role:emprole }, 'hello');
            return res.status(200).json({ msg: 'Login successful', token, role: results[0][0].emprole });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
});


app.get('/api/emp/getOrganisations', authenticateJwt, async (req, res) => {
    try {
        const results = await connection.query('SELECT organcode, organisationname FROM organisation');

       
        if (results[0].length === 0) {
            return res.status(200).json({ msg: [] });
        } else {
            // console.log(results);
            res.status(200).json({ msg: results[0] });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
});




app.post('/api/emp/addTicket', upload.array('files'), authenticateJwt, async (req, res) => {
    try {
        const { organid, caseId, applicantName, mobileNo, verificationType, address, triggered, empid } = req.body;

        const { id } = req.headers;
        let uploadedFiles = [];

        if (!organid || !applicantName || !verificationType || !empid || !id) {
            return res.status(401).json({ msg: "Case Is Not Registered" });
        }

     
        const fileUploadPromises = req.files.map((file) => {
            return new Promise((resolve, reject) => {
                const uuid = uuidv4();
                const destination = `upload-files/${uuid}${path.extname(file.originalname)}`;
                const storageRef = bucket.file(destination);
                const uploadTask = storageRef.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                        metadata: {
                            firebaseStorageDownloadTokens: uuid
                        }
                    },
                    resumable: false
                });
        
                uploadTask.on('error', (error) => {
                    return res.status(401).json({ msg: "Error Storing data" });
                    reject(error);
                });
        
                uploadTask.on('finish', () => {
                    storageRef.getSignedUrl({
                        action: 'read',
                        expires: '03-09-2500'
                    }, (error, url) => {
                        if (error) {
                            return res.status(401).json({ msg: "Error getting download URL" });
                            reject(error); 
                        } else {
                            console.log(url);
                            uploadedFiles.push(url);
                            resolve(url);
                        }
                    });
                });
        
                uploadTask.end(file.buffer);
            });
        });
        
            const uploadedFileDestinations = await Promise.all(fileUploadPromises);
            console.log('Uploaded files destination:', uploadedFileDestinations);
            console.log('uploadedFiles',uploadedFiles);
        const ticketResult = await connection.query('SELECT * FROM tickets WHERE staffid=? ORDER BY oid DESC', [empid]);
        let oid = (ticketResult[0].length === 0) ? 0 : parseInt(ticketResult[0][0].oid) + 1;
        // console.log(oid);
        const caseuid = empid + '-' + oid;

        const insertResult = await connection.query('INSERT INTO tickets (organisationid, caseid, caseuid, oid,issuedby, applicantname, ticketstatus, staffid, mobileno, verificationtype, address, triggered) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
            [parseInt(organid), caseId, caseuid, oid,id, applicantName,"Pending", parseInt(empid), mobileNo, verificationType, address, triggered]);

        if (insertResult[0].affectedRows !== 1) {
            return res.status(401).json({ msg: "Case Not! Registered" });
        }

        for (const file of uploadedFiles) {
            
            const fileInsertResult = await connection.query('INSERT INTO file (filename, ticketid) VALUES (?, ?)', [file, caseuid]);

            if (fileInsertResult[0].affectedRows !== 1) {
                return res.status(401).json({ msg: "Files Not! Added" });
            }
        }

        return res.status(201).json({ msg: "Case Registered" });
    } catch (error) {
        console.error(error);
        return res.status(501).send({ msg: 'Cannot Generate Bill' });
    }
});

app.delete('/api/emp/deletecase/:code', authenticateJwt, async (req, res) => {
    try {
        const { code } = req.params;
        if (!code) {
            return res.status(401).json({ msg: "Please Send a Valid Code!!" });
        }
        const result = await connection.query('DELETE FROM tickets WHERE caseuid=?', [code]);
        console.log(result);
        // const fileCheckResult = await connection.query('SELECT * FROM file WHERE ticketid=?', [code]);
        // if (fileCheckResult[0].length === 0) {
        //     return res.status(201).json({ msg: "Ticket Deleted" });
        // }

        const result1=await connection.query('DELETE FROM file WHERE ticketid=?', [code]);
        console.log(result1[0]);

        return res.status(201).json({ msg: "Ticket Deleted" });

        // if (result[0].affectedRows !== 0 && result1[0].affectedRows !== 0) {
          
        // } else {
        //     return res.status(401).json({ msg: "Ticket NOT! Deleted" });
        // }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});



app.post('/api/emp/addOrganisation', authenticateJwt, async (req, res) => {
    try {
        const { organisationname } = req.body;

        if (!organisationname) {
            return res.status(401).json({ msg: "Plz Fill All Fields" });
        }

        const existingOrgResult = await connection.query('SELECT * FROM organisation WHERE organisationname=?', [organisationname]);
        
        if (existingOrgResult[0].length !== 0) {
            return res.status(401).json({ msg: "Organisation Already exists!!" });
        }

        const insertResult = await connection.query('INSERT INTO organisation (organisationname) VALUES (?)', [organisationname]);  
        
        if (insertResult[0].affectedRows !== 1) {
            return res.status(401).json({ msg: "Organisation Name NOT! Saved" });
        }

        return res.status(201).json({ msg: "Organisation Name Saved" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error" });
    }
});

app.put('/api/emp/updateOrganisation/:organcode', authenticateJwt, async (req, res) => {
    try {
        const { organisationname } = req.body;

        if (!organisationname) {
            return res.status(401).json({ msg: "Plz Fill All Fields" });
        }

        const result = await connection.query('UPDATE organisation SET organisationname=? WHERE organcode=?', [organisationname, req.params.organcode]);

        if (result[0].affectedRows !== 0) {
            return res.status(201).json({ msg: "Organisation Updated" });
        } else {
            return res.status(401).json({ msg: "Organisation NOT! Updated" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error" });
    }
});



app.delete('/api/emp/deleteOrganisation/:code', authenticateJwt, async (req, res) => {
    try {
        const { code } = req.params;
        if (!code) {
            return res.status(401).json({ msg: "Please Send a Valid Code!!" });
        }
        const result = await connection.query('DELETE FROM organisation WHERE organcode=?', [code]);
        if (result[0].affectedRows !== 0) {
            return res.status(201).json({ msg: "Organisation Deleted" });
        } else {
            return res.status(401).json({ msg: "Organisation NOT! Deleted" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});

app.get('/api/emp/getStaffEmployees', authenticateJwt, async (req, res) => {
    try {
        const result = await connection.query('SELECT empid, empname, emppassword, emprole FROM employee WHERE emprole=?', ['staff']);
        if (result[0].length === 0) {
            return res.status(200).json({ msg: [] });
        } else {
            // console.log(result);
            return res.status(200).json({ msg: result[0] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});


app.get('/api/emp/getEmployees', authenticateJwt, async (req, res) => {
    try {
        const result = await connection.query('SELECT empid, empname, emppassword, emprole FROM employee');

        if (result[0].length === 0) {
            return res.status(200).json({ msg: [] });
        } else {
            // console.log(result);
            return res.status(200).json({ msg: result[0] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});


app.post('/api/emp/addEmployees', authenticateJwt, async (req, res) => {
    try {
        const { uniqueId, empname, emppassword, emprole } = req.body;

        if (!empname || !emppassword || !emprole) {
            return res.status(401).json({ msg: "Plz Fill All Fields" });
        }

        const existingEmpResult = await connection.query('SELECT * FROM employee WHERE empname=? and emprole=?', [empname,emprole]);
        console.log(existingEmpResult[0]);
        if (existingEmpResult[0].length !== 0) {
            return res.status(401).json({ msg: "Employee Already exists!!" });
        }

        const insertResult = await connection.query('INSERT INTO employee (empid, empname, emppassword, emprole) VALUES (?, ?, ?, ?)', [uniqueId, empname, emppassword, emprole]);
        if (insertResult[0].affectedRows !== 1) {
            return res.status(401).json({ msg: "Employee NOT! Saved" });
        }

        return res.status(201).json({ msg: "Employee Saved" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});



app.put('/api/emp/UpdateTicketStatus/:caseuid', authenticateJwt, async (req, res) => {
    try {
       const {caseuid}=req.params
        if(!caseuid)
        return res.status(401).json({ msg: "Error Updating Case" });

        console.log('caseuid',caseuid);

        const result = await connection.query('UPDATE tickets SET ticketstatus=? WHERE caseuid=?', ["Done",caseuid]);

        if (result[0].affectedRows !== 0) {
            return res.status(201).json({ msg: "Case Updated" });
        } else {
            return res.status(401).json({ msg: "Case NOT! Updated" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});


app.put('/api/emp/updateEmployees/:empid', authenticateJwt, async (req, res) => {
    try {
        const { empname, emppassword, emprole } = req.body;

        if (!empname || !emppassword || !emprole) {
            return res.status(401).json({ msg: "Plz Fill All Fields" });
        }

        const result = await connection.query('UPDATE employee SET empname=?, emppassword=?, emprole=? WHERE empid=?', [empname, emppassword, emprole, req.params.empid]);

        if (result[0].affectedRows !== 0) {
            return res.status(201).json({ msg: "Employee Details Updated" });
        } else {
            return res.status(401).json({ msg: "Employee Details NOT! Updated" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});

app.delete('/api/emp/deleteEmployees/:code', authenticateJwt, async (req, res) => {
    try {
        const { code } = req.params;
        if (!code) {
            return res.status(401).json({ msg: "Please Send a Valid Code!!" });
        }
        const result = await connection.query('DELETE FROM employee WHERE empid=?', [code]);
        if (result[0].affectedRows !== 0) {
            return res.status(201).json({ msg: "Employee Deleted" });
        } else {
            return res.status(401).json({ msg: "Employee NOT! Deleted" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});

app.get('/api/emp/Dashboardcases', authenticateJwt, async (req, res) => {
    try {
      
        const {role,id}=req.headers
        let result;
        if(!role || !id)
        return res.status(401).json({ msg: "Plz Login Again" });

        if(role==='superadmin')
        {
        result=await connection.query(`SELECT t.*, o.organisationname AS organisation, e.empname AS employees,f.empname AS issued FROM tickets t 
        LEFT JOIN organisation o ON t.organisationid=o.organcode
        LEFT JOIN employee e ON t.staffid=e.empid
        LEFT JOIN employee f ON t.issuedby=f.empid
        where t.ticketstatus=?
        ORDER BY t.createdAt ASC`,["Pending"]);
        }
        else{
        result = await connection.query(`SELECT t.*, o.organisationname AS organisation, e.empname AS employees FROM tickets t 
        LEFT JOIN organisation o ON t.organisationid=o.organcode
        LEFT JOIN employee e ON t.staffid=e.empid
        where t.ticketstatus=? and t.issuedby=?
        ORDER BY t.createdAt ASC`,["Pending",id]);
        }

        console.log(result[0]);
        if (result[0].length === 0) {
            return res.status(201).json({ msg: [],role });
        }

        return res.status(201).json({ msg: result[0],role });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});


app.post('/api/emp/AdmincasesByDate', authenticateJwt, async (req, res) => {
    try {
      
        const { dateStart, dateEnd } = req.body;

        console.log(dateStart);
        console.log(dateEnd);

        if (!dateStart || !dateEnd) {
            return res.status(401).json({ msg: "Plz Fill All Fields" });
        }

       
        
    

        const result = await connection.query(`SELECT t.*, o.organisationname AS organisation,e.empname AS employees,f.empname AS issued  FROM tickets t 
        LEFT JOIN organisation o ON t.organisationid=o.organcode
        LEFT JOIN employee e ON t.staffid=e.empid
        LEFT JOIN employee f ON t.issuedby=f.empid
        WHERE DATE(t.createdAt) BETWEEN ? AND ?`, [dateStart, dateEnd]);

        if (result[0].length === 0) {
            return res.status(201).json({ msg: [] });
        }

        return res.status(201).json({ msg: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});

app.post('/api/emp/casesByDate', authenticateJwt, async (req, res) => {
    try {
       
        const { dateStart, dateEnd } = req.body;

        console.log(dateStart);
        console.log(dateEnd);

        if (!dateStart || !dateEnd) {
            return res.status(401).json({ msg: "Plz Fill All Fields" });
        }

        const { id } = req.headers;
        console.log(id,'id');
        
        const result = await connection.query(`SELECT t.*, o.organisationname AS organisation FROM tickets t 
        LEFT JOIN organisation o ON t.organisationid=o.organcode
        WHERE DATE(t.createdAt) BETWEEN ? AND ? AND t.staffid=? and t.ticketstatus=? `, [dateStart, dateEnd, id,"Pending"]);

        console.log(result[0]);
        if (result[0].length === 0) {
            return res.status(201).json({ msg: [] });
        }

        return res.status(201).json({ msg: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});


app.post('/api/emp/getFileData', authenticateJwt, async (req, res) => {
    try {
        const { ticketid } = req.body;

        if (!ticketid) {
            return res.status(401).json({ msg: "Plz Fill All Fields" });
        }

        const result = await connection.query('SELECT * FROM file WHERE ticketid=?', [ticketid]);

        if (result[0].length === 0) {
            return res.status(201).json({ msg: [] });
        }

        return res.status(201).json({ msg: result[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});


app.use(express.static(path.join(__dirname, '../vite-project/dist')));

app.get('*', (req, res) =>
res.sendFile(
    path.resolve(__dirname, '../', 'vite-project', 'dist', 'index.html')
)
);

const port=3000
app.listen(port,()=> {
    console.log(`server is running in port:`,port)
})