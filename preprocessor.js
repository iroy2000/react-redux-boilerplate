var babelJest = require("babel-jest");

// If you want to ignore extra stuff when sending to  unit test, please add it here
module.exports = {
    process: function(src, filename) {
        if (filename.indexOf('node_modules') === -1) {
            src = babelJest.process(src, filename)
                .replace(/^require.*\.css.*;$/gm, '');
        }

        return src;
    }
};