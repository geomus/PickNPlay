const fs = require('fs');
const path = require('path');

// ************ Function to Read an HTML File ************
function readEJS (fileName) {
	let ejsFile = fs.readFileSync(path.join(__dirname, `/../views/${fileName}.ejs`), 'utf-8');
	return ejsFile;
}

const controller = {
	home: (req, res) => {
		let ejs = readEJS('index');
		res.send(ejs);
	}
};
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
//   });

module.exports = controller