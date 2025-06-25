
function dbDriver() {
	if (!global.sql) {
		global.sql = {
			driver: require('msnodesqlv8'),
			connStr: `Driver={ODBC Driver 18 for SQL Server};Server=127.0.0.1,1433;Database=node;UID=node_user;PWD=StrongPassword123!;TrustServerCertificate=yes;;Connect Timeout=10`
		}
	}
	return global.sql
}

export default dbDriver

