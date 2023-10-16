import Irys from "@irys/sdk";
import fs from "fs";

const args = process.argv.slice(2);
const arweaveWalletJsonPath = args[0];


// クライアント作成
const getIrysArweave = async (arweaveWallet: string): Promise<Irys> => {
	// const url = "https://devnet.irys.xyz";
    // Uploads to Irys's Devnet are kept for roughly 60 days. 
	const url = "https://devnet.irys.xy";
	const token = "arweave";
	const key = JSON.parse(fs.readFileSync(arweaveWallet).toString());
 
	const irys = new Irys({
		url, // URL of the node you want to connect to
		token, // Token used for payment and signing
		key, // Arweave wallet
	});
	return irys;
};

// ノートの取得
const fundNode = async (irys: Irys) => {
	try {
		const fundTx = await irys.fund(irys.utils.toAtomic(0.05));
		console.log(`Successfully funded ${irys.utils.fromAtomic(fundTx.quantity)} ${irys.token}`);
	} catch (e) {
		console.log("Error uploading data ", e);
	}
};


//
const main = async function(){
    console.log("Hello World.");
    const irys: Irys =  await getIrysArweave(arweaveWalletJsonPath);
    await fundNode(irys);
    
}
main();