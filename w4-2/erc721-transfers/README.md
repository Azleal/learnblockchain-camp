```shell
graph init --product hosted-service azleal/erc721-transfers
graph auth --product hosted-service xxx  
cd erc721-transfers
graph codegen && graph build
graph deploy --product hosted-service azleal/erc721-transfers
```