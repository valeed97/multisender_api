const dotenv = require('dotenv');
dotenv.config();
var multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const { parse } = require('fast-csv');

exports.readData = async(req, res) => {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        const tokenType = fields.type[0];
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
                        if(tokenType == 'Token'){
                            return data.address.trim() != '' && data.address.trim() != null && data.address.trim() != undefined && data.amount.trim() != '' && data.amount.trim() != null && data.amount.trim() != undefined && data.amount.trim() > 0;  
                        }else if(tokenType == 'erc721'){
                            return data.address.trim() != '' && data.address.trim() != null && data.address.trim() != undefined && data.id.trim() != '' && data.id.trim() != null && data.id.trim() != undefined && data.id.trim() > 0;
                        }else if(tokenType == 'erc1155'){
                            return data.address.trim() != '' && data.address.trim() != null && data.address.trim() != undefined && data.id.trim() != '' && data.id.trim() != null && data.id.trim() != undefined && data.id.trim() > 0 && data.count.trim() != '' && data.count.trim() != null && data.count.trim() != undefined && data.count.trim() > 0;
                        }
                        
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
                        console.log(rows);
                        res.status(200).send({ success: true, msg: 'success..', data: rows, invalid: invalidData, number: rowCount });
                    });
            } else {
                res.status(201).send({ success: false, msg: 'Please choose csv file', data: '' });
            }
        }

    });


}