const fs = require('fs/promises');
const handlebars = require('handlebars');

const htmlCompiler = async (file, context) => {
    const htmlFile = await fs.readFile(file);
    const compiler = handlebars.compile(htmlFile.toString());
    const htmlText = compiler(context);

    return htmlText;
};

module.exports = htmlCompiler