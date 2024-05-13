import Pool from "./Pool";

export const getFlags = async () => {
  const db = await Pool.connect();
  try {
    const response = await db.query(`SELECT DISTINCT flag FROM task`);
    return response.rows;
  } catch (err) {
    throw new Error(`Could not get flags:\n${err}`);
  } finally {
    db.release();
  }
};

export const getTasks = async () => {
  const db = await Pool.connect();
  try {
    const response = await db.query(
      `SELECT * FROM task WHERE status NOT LIKE $1 ORDER BY id`,
      ["done"],
    );
    return response.rows;
  } catch (err) {
    throw new Error(`Could not get tasks:\n${err}`);
  } finally {
    db.release();
  }
};

export const addTask = async (task) => {
  const db = await Pool.connect();
  try {
    // insert task
    const response = await db.query(
      `INSERT INTO task (title, text, flag, status) VALUES ($1, $2, $3, $4)`,
      [task.title, task.text, task.flag, task.status],
    );
  } catch (err) {
    throw new Error(`Could not get tasks:\n${err}`);
  } finally {
    db.release();
  }
};

export const deleteTask = async (id) => {
  const db = await Pool.connect();
  try {
    // insert task
    const response = await db.query(`DELETE FROM task WHERE id = $1;`, [id]);
    console.log(`Task with id ${id} deleted`);
  } catch (err) {
    throw new Error(`Could not delete tasks:\n${err}`);
  } finally {
    db.release();
  }
};

export const completeTask = async (id) => {
  const db = await Pool.connect();
  try {
    // insert task
    const response = await db.query(
      `UPDATE task SET status = $1 WHERE id = $2`,
      ["done", id],
    );
    console.log(`Task with id ${id} completed`);
  } catch (err) {
    throw new Error(`Could not complete task:\n${err}`);
  } finally {
    db.release();
  }
};

export const editTask = async (id, task) => {
  const db = await Pool.connect();
  try {
    const response = await db.query(
      `UPDATE task SET title = $1, text = $2, flag = $3, status = $4 WHERE id = $5`,
      [task.title, task.text, task.flag, task.status, id],
    );
    console.log(`Task with id ${id} Updated`);
  } catch (err) {
    throw new Error(`Could not Update task:\n${err}`);
  } finally {
    db.release();
  }
};

export const getLastTask = async () => {
  const db = await Pool.connect();
  try {
    const response = await db.query(`SELECT * From task LIMIT 1`);
    return response.rows[0];
  } catch (err) {
    throw new Error(`Could not get task:\n${err}`);
  } finally {
    db.release();
  }
};
