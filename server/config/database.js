const connectDB = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://admin:7+26w!9a;niG&QV@cluster0.vjeqfa4.mongodb.net/&appName=Cluster0",
};
export default connectDB;
