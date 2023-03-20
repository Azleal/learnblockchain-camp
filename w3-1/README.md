## w3-1作业(2023-03-21)

> [w2-2作业](./images/w3-1-assignment.png)

1. [合约代码](./contracts/)

2. 部署合约
  - [Score合约](https://mumbai.polygonscan.com/address/xxx#code)
  - [Teacher合约](https://mumbai.polygonscan.com/address/xxx#code)


## 配置及运行说明
1. 复制[.env-example](./..env-example)为`.env`并修改其中参数
2. 安装依赖`npm install`
3. 编译合约`npx hardhat compile`
4. 测试合约`npx hardhat test test/xxx.t.js`
5. 部署合约至测试网`npx hardhat run scripts/deploy.js --network mumbai`得到部署地址`address`
6. 将代码开源`npx hardhat verify --network mumbai xxx`

