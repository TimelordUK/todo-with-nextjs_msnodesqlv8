
function dbDriver() {
	if (!global.sql) {
		global.sql = {
			driver: require('msnodesqlv8'),
			connStr: `Driver={ODBC Driver 18 for SQL Server}; Server=DESKTOP-VIUCH90;UID=linux; PWD=linux; Database=node;Encrypt=no;`
		}
	}
	return global.sql
}

export default dbDriver

