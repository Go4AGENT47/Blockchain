import SHA256 from 'crypto-js/sha256';

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash; 
        this.hash = '';
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "07/19/2019", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let KrishCoin = new Blockchain();
KrishCoin.addBlock(new Block(1, "07/19/2019", {amount: 5}));
KrishCoin.addBlock(new Block(2, "07/20/2019", {amount: 10}));
KrishCoin.addBlock(new Block(3, "07/21/2019", {amount: 50}));
KrishCoin.addBlock(new Block(4, "07/22/2019", {amount: 500}));

console.log('Is Blockchain Valid? ' + KrishCoin.isChainValid());

KrishCoin.chain[1].data = {amount: 250};
KrishCoin.chain[1].hash = KrishCoin.chain[1].calculateHash();

console.log('Is Blockchain Valid? ' + KrishCoin.isChainValid());

//console.log(JSON.stringify(KrishCoin, null, 4));
//proofofwork
//p2pnetwork
//checkfunds
//npm install --save crypto-js
//node .\main.js
//npm config set proxy http://xxx.xxx.xxx.4:8080   
//npm config set https-proxy http://xxx.xxx.xxx.4:8080
//npm config set https-proxy https://web-proxydirect.us.bank-dns.com:3128
//npm config set proxy http://web-proxydirect.us.bank-dns.com:3128
//npm config set proxy http://xxx.xxx.xxx.4:8080   
//npm config set https-proxy http://xxx.xxx.xxx.4:8080
//npm config rm proxy   
//npm config rm https-proxy