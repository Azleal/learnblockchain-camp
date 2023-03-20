// 导入chai库和一些必要的hardhat库
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Score Contract", function () {
  let owner, teacher, student1, student2;
  let scoreContract, teacherContract;

  before(async function () {
    // 获取测试账户
    [owner, teacher, student1, student2] = await ethers.getSigners();

    // 部署成绩合约
    const Score = await ethers.getContractFactory("Score");
    scoreContract = await Score.deploy();
    await scoreContract.deployed();

    // 部署老师合约
    const Teacher = await ethers.getContractFactory("Teacher");
    teacherContract = await Teacher.deploy(scoreContract.address);
    await teacherContract.deployed();

    // 设置老师
    await scoreContract.setTeacher(teacherContract.address);
  });

  describe("setScore", function () {
    it("should revert if called by non-teacher account", async function () {
      // 非老师调用setScore方法，应该抛出异常
      await expect(
        scoreContract.connect(student1).setScore(student1.address, 80)
      ).to.be.reverted;
    });

    
  });

  describe("getScore", function () {
    // it("should return correct score if it exists", async function () {
    //   // 成绩存在时，应该返回正确的成绩
    //   expect(await scoreContract.getScore(student1.address)).to.equal(80);
    // });

    it("should return 0 if score does not exist", async function () {
      // 成绩不存在时，应该返回0
      expect(await scoreContract.getScore(student2.address)).to.equal(0);
    });
  });

  describe("setTeacher and cancleTeacher", function () {
    it("should revert if called by non-owner account", async function () {
      // 非owner调用setTeacher或cancleTeacher方法，应该抛出异常
      await expect(
        scoreContract.connect(teacher).setTeacher(student1.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should set teacher successfully if called by owner account", async function () {
      // owner调用setTeacher方法，应该成功设置老师
      await scoreContract.connect(owner).setTeacher(student1.address);
      expect(await scoreContract.teachers(student1.address)).to.equal(true);
    });

    it("should cancle teacher successfully if called by owner account", async function () {
      // owner调用cancleTeacher方法，应该成功取消老师
      await scoreContract.connect(owner).cancleTeacher(student1.address);
      expect(await scoreContract.teachers(student1.address)).to.equal(false);
    });
  });
});

describe("Teacher Contract", function () {
  let owner, teacher, student1, student2;
  let scoreContract, teacherContract;

  before(async function () {
    // 获取测试账户
    [owner, teacher, student1, student2] = await ethers.getSigners();

    // 部署成绩合约
    const Score = await ethers.getContractFactory("Score");
    scoreContract = await Score.deploy();
    await scoreContract.deployed();

    // 部署老师合约
    const Teacher = await ethers.getContractFactory("Teacher");
    teacherContract = await Teacher.deploy(scoreContract.address);
    await teacherContract.deployed();

    // 设置老师
    await scoreContract.setTeacher(teacherContract.address);
  });

  describe("setStudentScore", function () {
    it("should call setScore method in Score contract successfully", async function () {
      // 调用setStudentScore方法，应该成功调用Score合约的setScore方法
      await teacherContract.setStudentScore(student1.address, 80);
      expect(await scoreContract.getScore(student1.address)).to.equal(80);
    });
    it("should revert if score is not in the range [0, 100]", async function () {
      // 成绩不在[0, 100]范围内，应该抛出异常
      await expect(
        teacherContract.setStudentScore(student1.address, 120)
      ).to.be.revertedWithCustomError(scoreContract, "invalidScore");
    });

    it("should set score successfully if called by teacher account", async function () {
      // 老师调用setScore方法，应该成功设置成绩
      await teacherContract.setStudentScore(student1.address, 90);
      expect(await scoreContract.getScore(student1.address)).to.equal(90);
    });

    it("should emit ScoreChanged event when score is changed", async function () {
      // 成绩发生变化时，应该触发ScoreChanged事件
      await expect(teacherContract.setStudentScore(student1.address, 80))
        .to.emit(scoreContract, "ScoreChanged")
        .withArgs(student1.address, 80);
    });
  });

  describe("getStudentScore", function () {
    it("should call getScore method in Score contract successfully", async function () {
      // 调用getStudentScore方法，应该成功调用Score合约的getScore方法
      await teacherContract.setStudentScore(student2.address, 90);
      expect(await teacherContract.getStudentScore(student2.address)).to.equal(
        90
      );
    });
  });
});
