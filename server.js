import app from "./app.js";

const PORT = process.env.PORT || 3000;

try {
  app.listen(PORT, () => {
    console.info(`listening on port ${PORT}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
