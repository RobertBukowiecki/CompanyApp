const Employee = require("../employee.model.js");
const expect = require("chai").expect;

describe("Employee", () => {
  it('should throw an error if no "firstName, lastName, department" args', () => {
    const emp = new Employee({});

    emp.validate((err) => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });

  it("should throw an error if some args are missing", () => {
    const case1 = { firstName: "John", lastName: "Doe" };
    const case2 = { firstName: "John", department: "IT" };
    const case3 = { lastName: "John", department: "IT" };
    const case4 = { firstName: "John" };
    const case5 = { lastName: "Doe" };
    const case6 = { department: "IT" };

    const cases = [case1, case2, case3, case4, case5, case6];

    for (let example of cases) {
      const emp = new Employee(example);
      emp.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if "firstName, lastName, department" args are not string', () => {
    const case1 = { firstName: {} };
    const case2 = { firstName: [] };
    const case3 = { lastName: {} };
    const case4 = { lastName: [] };
    const case5 = { department: {} };
    const case6 = { department: [] };

    const cases = [case1, case2, case3, case4, case5, case6];

    for (let example of cases) {
      const emp = new Employee(example);

      emp.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it("should not throw any error if args are correct", () => {
    const case1 = {
      firstName: "John",
      lastName: "Doe",
      department: "IT",
    };
    const case2 = {
      firstName: "Anna",
      lastName: "Doe",
      department: "Management",
    };
    const cases = [case1, case2];
    for (let example of cases) {
      const emp = new Employee(example);

      emp.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
