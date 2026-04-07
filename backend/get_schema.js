import pkg from "pg";
const { Client } = pkg;
const client = new Client({ connectionString: "postgresql://postgres:amit54321@localhost:5432/home_services_bookingDb" });
async function run() {
  await client.connect();
  const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
  console.log(res.rows);
  await client.end();
}
run().catch(console.error);
