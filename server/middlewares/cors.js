const cors = require('cors');
const defaultOrigins = [
    'http://localhost:4200',
    'http://127.0.0.1:4200',
    'http://localhost:4300',
    'http://127.0.0.1:4300'
];

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
    : defaultOrigins;

const corsOptions = {
    origin : function(origin, callback){
        if(!origin) {
            return callback(null,true);
        }
        else
        {
            if(allowedOrigins.includes(origin)){
                return callback(null,true)
            }
            else{
                return callback(new Error('Cors policy: origin not allowed'))
            }
        }
    },
    credentials: true,
    methods: ['GET','POST','PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type','Authorization']
}

module.exports = cors(corsOptions);
