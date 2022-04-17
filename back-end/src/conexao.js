const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dindin",
  password: "Lt_lopes1994",
  port: 5432,
});

const query = (text, param) => {
  return pool.query(text, param);
};

module.exports = {
<<<<<<< HEAD
  query,
};
=======
    query
}
>>>>>>> 15d8a02c82656ada72b193d15e30c1caf0c559d2
