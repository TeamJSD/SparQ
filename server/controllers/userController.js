const db =require('./../db');

const Developer = db.Developer;
const sequelize = db.Conn;

function addUser(req, res, next) {
	Developer.create(req.body[0], err => {
		if(err) console.log(err);
	});
	next();
}

module.exports = { addUser }