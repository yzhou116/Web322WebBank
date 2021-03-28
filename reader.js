const fs = require('fs');

const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        console.error('The file does not exist');
        return [];
    }
};

const writeData = (data, filePath) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 4), (err) => { if (err) throw err; });
};
module.exports.readData = readData;
module.exports.writeData = writeData;