const Employee = require("../employee.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Employee", () => {
  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();

      const uri = await fakeDB.getUri();

      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log(err);
    }
  });
  describe("Reading data", () => {
    before(async () => {
      const testEmpOne = new Employee({
        firstName: "Adam",
        lastName: "Zimy",
        department: "dep",
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: "Maciej",
        lastName: "Lo",
        department: "dep2",
      });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by params with "findOne" method', async () => {
      const firstName = await Employee.findOne({
        firstName: "Adam",
      });
      const expectedFirstName = "Adam";
      expect(firstName.firstName).to.be.equal(expectedFirstName);

      const lastName = await Employee.findOne({
        lastName: "Zimy",
      });
      const expectedLastName = "Zimy";
      expect(lastName.lastName).to.be.equal(expectedLastName);

      const department = await Employee.findOne({
        department: "dep",
      });
      const expectedDepartment = "dep";
      expect(department.department).to.be.equal(expectedDepartment);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe("Creating data", () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({
        firstName: "Adam",
        lastName: "Zimy",
        department: "dep",
      });
      await employee.save();
      expect(employee.isNew).to.be.false;
      after(async () => {
        await Employee.deleteMany();
      });
    });
  });

  describe("Updating data", () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: "John",
        lastName: "Doe",
        department: "Department #1",
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: "Anna",
        lastName: "Doe",
        department: "Department #2",
      });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne(
        { firstName: "John", lastName: "Doe", department: "Department #1" },
        {
          $set: {
            firstName: "Johnny",
            lastName: "Does",
            department: "Department #3",
          },
        }
      );
      const updatedEmployee = await Employee.findOne({
        firstName: "Johnny",
        lastName: "Does",
        department: "Department #3",
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: "John" });
      employee.firstName = "Johnny";
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: "Johnny" });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany(
        {},
        { $set: { firstName: "XXX", lastName: "YYY", department: "ZZZ" } }
      );
      const employees = await Employee.find({ firstName: "XXX" });
      expect(employees.length).to.be.equal(2);
    });
  });
  describe("Removing data", () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: "John",
        lastName: "Doe",
        department: "Department #1",
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: "Anna",
        lastName: "Doe",
        department: "Department #2",
      });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: "John" });
      const removeEmployee = await Employee.findOne({
        firstName: "John",
      });
      expect(removeEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: "Anna" });
      await employee.remove();
      const removedEmployee = await Employee.findOne({
        firstName: "Anna",
      });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      const employees = await Employee.deleteMany();
      const removedEmployee = await Employee.find();
      expect(removedEmployee.length).to.be.equal(0);
    });
  });
});
