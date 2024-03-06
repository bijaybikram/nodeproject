const bcrypt = require("bcrypt");

const seedAdmin = async (users) => {
  const adminExists = await users.findAll({
    where: {
      email: "admin@gmail.com",
    },
  });
  // 1st way if(!adminExists){....}
  if (adminExists.length > 0) {
    console.log("admin already seeded!");
    return;
  } else {
    await users.create({
      email: "admin@gmail.com",
      username: "admin",
      password: bcrypt.hashSync("admin", 8),
      role: "admin",
    });
  }
  console.log("Admin seeded succesfully!");
};

module.exports = seedAdmin;
