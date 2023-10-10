// initialize our express app
const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.get("/",(req,res)=>{
    // render main.html
    res.render('main',{
        layout:false
    });
})

const numberMiddleware = (req, res, next) => {
    const input = req.body.input;

    // Cek inputan
    if (!parseInt(input)) {
        return res.status(400).send({
            status: 'Error',
            message: 'Inputan tidak boleh kosong'
        });
    }

    const isNumber = /^\d+$/.test(input);
    if (!isNumber) {
        return res.status(400).send({
            status: 'Error',
            message: 'Inputan harus berupa angka'
        });
    }

    next();
}

app.post('/generate-segitiga', numberMiddleware, (req, res) => {
    const input = req.body.input;
    const arr = input.split('');
    const length = arr.length;
    let result = '';
    let counter = 0;

    for (let i = 0; i < length; i++) {
        result += arr[i]+'0'.repeat(counter+1);
        counter++;
        result += '<br>';
    }

    res.status(200).send({
        status: 'Success',
        message: 'Generate segitiga berhasil',
        result
    });
});

app.post('/generate-bilangan-ganjil', numberMiddleware, (req, res) => {
    const maxBilangan = parseInt(req.body.input);

    let result = '';
    for (let i = 1; i <= maxBilangan; i++) {
        if (i % 2 == 1) {
            result += i + '<br>';
        }
    }

    res.status(200).send({
        status: 'Success',
        message: 'Generate bilangan ganjil berhasil',
        result
    });
})

app.post('/generate-bilangan-prima', numberMiddleware, (req, res) => {
    const maxBilangan = parseInt(req.body.input);

    let result = '';
    for (let i = 2; i <= maxBilangan; i++) {
        let isPrima = true;
        for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                isPrima = false;
                break;
            }
        }

        if (isPrima) {
            result += i + '<br>';
        }
    }

    res.status(200).send({
        status: 'Success',
        message: 'Generate bilangan prima berhasil',
        result
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
}
);

