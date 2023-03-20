// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title 成绩合约接口
 */
interface IScore {
    
    /**
     * 设置学生成绩
     * 
     * @param _student 学生地址
     * @param _score 成绩,范围[0,100]
     */
    function setScore(address _student, uint256 _score) external;

    /**
     * 获取学生成绩
     * 
     * @param _student 学生地址
     */
    function getScore(address _student) external view returns (uint256);
}

/**
 * @title  成绩合约 
 */
contract Score is IScore, Ownable {
    /**
     * @dev 记录学生成绩
     */
    mapping(address => uint256) scores;
    /**
     * @notice 记录老师信息
     */
    mapping(address => bool) public teachers;

    // error: 操作人不是老师
    error notTeacher(address teacher);
    // error: 设置的成绩不合法
    error invalidScore(uint256 score);


    /**
     * 当成绩变更时触发
     * @param student 学生地址
     * @param score 变更的成绩
     */
    event ScoreChanged(address indexed student, uint256 score);

    /**
     * 只有老师可以调用
     */
    modifier onlyTeacher() {
        if (!teachers[msg.sender]) {
            revert notTeacher(msg.sender);
        }
        _;
    }

    /**
     * 设置老师
     * @param _teacher 老师地址
     */
    function setTeacher(address _teacher) external onlyOwner{
        teachers[_teacher] = true;
    }

    /**
     * 取消老师
     * @param _teacher 老师地址
     */
    function cancleTeacher(address _teacher) external onlyOwner{
        teachers[_teacher] = false;
    }

    /**
     * 设置学生成绩
     * 
     * @param _student 学生地址
     * @param _score 学生成绩
     */
    function setScore(address _student, uint256 _score) external override onlyTeacher{
        if (0 > _score || _score > 100) {
            revert invalidScore(_score);
        }
        scores[_student] = _score;
        emit ScoreChanged(_student, _score);
    }

    /**
     * 获取学生成绩
     * @param _student 学生地址
     */
    function getScore(address _student)
        external
        view
        override
        returns (uint256)
    {
        return scores[_student];
    }
}

/**
 * @title  老师合约 
 */
contract Teacher is Ownable{
    /**
     * @dev 成绩合约接口
     */
    IScore public score;

    /**
     * 初始化成绩合约
     * 
     * @param _score 成绩合约地址
     */
    constructor(address _score) {
        score = IScore(_score);
    }

    /**
     * 设置学生成绩
     * @param _student 学生地址
     * @param _score 学生成绩
     */
    function setStudentScore(address _student, uint256 _score) external onlyOwner{
        score.setScore(_student, _score);
    }

    /**
     * 获取学生成绩
     * @param _student 学生地址
     */
    function getStudentScore(address _student) external view returns (uint256) {
        return score.getScore(_student);
    }
}
