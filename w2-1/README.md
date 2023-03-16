## w2-1作业(2023-03-14)

> [w1-2作业](./images/w2-1-assignment.png)

1. [合约代码](./contracts/Bank.sol)

2. 部署合约[地址](https://goerli.etherscan.io/address/0xA53Bef4Af0B2A17137a1c390395a0f9Adb571f0D#code)


## 配置及运行说明
1. 复制[.env-example](./..env-example)为`.env`并修改其中参数
2. 安装依赖`npm install`
3. 编译合约`npx hardhat compile`
4. 测试合约`npx hardhat test test/Bank.t.js`
5. 部署合约至测试网`npx hardhat run scripts/deploy.js --network goerli`得到部署地址`address`
6. 将代码开源`npx hardhat verify --network goerli xxx`

