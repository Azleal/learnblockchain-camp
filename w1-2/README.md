## w1-2作业(2023-03-09)

> [w1-2作业](./images/w1-2-assignment.png)

1. 修改`Counter`合约, 仅有部署者可以调用`count()`
> 合约代码: [点击查看](./contracts/Counter.sol)

---

2. 使用hardhat部署修改后的`Counter`
> 部署命令: `npx hardhat run scripts/deploy.js --network goerli`
> 合约地址: [0x317ce49D862a1Fa331DB4cbD8adf054695BA508B](https://goerli.etherscan.io/address/0x317ce49D862a1Fa331DB4cbD8adf054695BA508B#code)

---

3. 使用hardhat测试`Counter`:
  - Case 1: 部署者成功调用`count()`
  - Case 2: 其他地址调用`count()`失败
> 测试代码: [点击查看](./test/Counter.t.js)

---

4. 代码开源到区块浏览器
> 开源命令: `npx hardhat verify --network goerli 0x317ce49D862a1Fa331DB4cbD8adf054695BA508B`

----

## 配置及运行说明
1. 复制[.env-example](./.env-example)为`.env`并修改其中参数
2. 安装依赖`npm install`
3. 编译合约`npx hardhat compile`
4. 测试合约`npx hardhat test test/Counter.t.js`
5. 部署合约至测试网`npx hardhat run scripts/deploy.js --network goerli`得到部署地址`address`
6. 将代码开源`npx hardhat verify --network goerli xxx`

