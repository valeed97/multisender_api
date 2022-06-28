var multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const { parse } = require('fast-csv');

exports.readData = async(req, res) => {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {

        if (files.fileupload) {
            let oldpath = files.fileupload[0].path;
            let filename = files.fileupload[0].originalFilename;
            let type = path.extname(filename);
            type = type.toLocaleLowerCase();

            if (type == '.csv') {
                let rows = [];
                let invalidData = [];

                fs.createReadStream(oldpath)
                    .pipe(parse({ headers: true }))
                    .on('error', error => console.error(error))
                    .validate(function(data) {
                        return data.address.trim() != '' && data.address.trim() != null && data.address.trim() != undefined && data.amount.trim() != '' && data.amount.trim() != null && data.amount.trim() != undefined && data.amount.trim() > 0; //return employees whose salary greater than 10000 and age greater than 40 
                    })
                    .on("data-invalid", function(data) {
                        invalidData.push(data)
                            //return employees whose address is emapty or amount is blank or 0;
                    })
                    .on('data', row => {
                        //each row can be written to db
                        rows.push(row);
                    })
                    .on('end', rowCount => {
                        // console.log(`Parsed ${rowCount} rows`);
                        res.status(200).send({ success: true, msg: 'success..', data: rows, invalid: invalidData, number: rowCount });
                    });
            } else {
                res.status(201).send({ success: false, msg: 'Please choose csv file', data: '' });
            }
        }

    });


}