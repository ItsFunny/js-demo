import * as wasm from 'zksync-crypto';
import { utils } from 'ethers';

function hexStringToUint8Array(hexString){
    if (hexString.length % 2 !== 0){
        throw "Invalid hexString";
    }/*from  w w w.  j  av a 2s  . c  o  m*/
    var arrayBuffer = new Uint8Array(hexString.length / 2);

    for (var i = 0; i < hexString.length; i += 2) {
        var byteValue = parseInt(hexString.substr(i, 2), 16);
        if (isNaN(byteValue)){
            throw "Invalid hexString";
        }
        arrayBuffer[i/2] = byteValue;
    }

    return arrayBuffer;
}



const yz_priv = "05510911e24cade90e206aabb9f7a03ecdea26be4a63c231fabff27ace91471e";
const yz_priv_bytes = hexStringToUint8Array(yz_priv);


const signaturePacked =  wasm.sign_musig(yz_priv_bytes, hexStringToUint8Array("abcd"));
const pubKey = utils.hexlify(signaturePacked.slice(0, 32)).substr(2);
const signature = utils.hexlify(signaturePacked.slice(32)).substr(2);
console.log('signature.pubKey', pubKey);
console.log('signature.signature', signature);


const signaturePackedWithoutHash =  wasm.sign_musig_without_hash_msg(yz_priv_bytes, hexStringToUint8Array("abcd"));
const pubKeyWithoutHash = utils.hexlify(signaturePackedWithoutHash.slice(0, 32)).substr(2);
const signatureWithoutHash = utils.hexlify(signaturePackedWithoutHash.slice(32)).substr(2);
console.log('signature.pubKey withoutHash', pubKeyWithoutHash);
console.log('signature.signature withoutHash', signatureWithoutHash);

const pub_packed_bytes= wasm.private_key_to_pubkey(yz_priv_bytes);
console.log("pub_scf",utils.hexlify(pub_packed_bytes))


const pub_xy_bytes= wasm.private_key_to_pubkey_with_xy(yz_priv_bytes);
const x= utils.hexlify(pub_xy_bytes.slice(0, 32)).substr(2);
const y= utils.hexlify(pub_xy_bytes.slice(32)).substr(2);
console.log("x",x);
console.log("y",y);

// const jsBytes='{"field1": "hello", "field2": 123}'
// const aaa= wasm.printA(jsBytes)
// console.log("printA",aaa.toString())



// transfer
// {
//     const transfer_json= '{\"asset_id\":[1,[1]],\"asset_id_fee\":[1,[1]],\"sender_vault_id\":1,\"receiver_vault_id\":1,\"src_fee_vault_id\":1,\"max_amount_fee\":[1,[1]],\"amount\":[1,[1]],\"nonce\":1,\"expiration_timestamp\":\"1684834241\"}'
//     const bbb=wasm.sign_transfer(transfer_json,yz_priv_bytes,BigInt(0));
//     const pubbb = utils.hexlify(bbb.slice(0, 32)).substr(2);
//     const signature_ss = utils.hexlify(bbb.slice(32)).substr(2);
//     console.log("sign transfer",signature_ss);
// }



// withdraw
{
    const json='{\"base\":{\"nonce\":1,\"public_key\":\"42cbd3cbd97f9ac9c5c4b15f0b5ca78d57ff1e5948008799b9c0d330b1e217a9\",\"expiration_timestamp\":1684832800},\"position_id\":1,\"asset_id_collateral\":[1,[1]],\"amount\":\"1\"}';
    const bbb=wasm.sign_withdraw(json,yz_priv_bytes);
    const pubbb = utils.hexlify(bbb.slice(0, 32)).substr(2);
    const signature_ss = utils.hexlify(bbb.slice(32)).substr(2);
    console.log("withdraw signature",signature_ss);
}


// limit_order
{
    const json="{\"base\":{\"nonce\":1,\"public_key\":\"42cbd3cbd97f9ac9c5c4b15f0b5ca78d57ff1e5948008799b9c0d330b1e217a9\",\"expiration_timestamp\":1684832800},\"amount_buy\":\"1\",\"amount_sell\":\"1\",\"amount_fee\":\"1\",\"asset_id_buy\":\"1\",\"asset_id_sell\":\"1\",\"asset_id_fee\":\"1\",\"vault_buy\":1,\"vault_sell\":1,\"vault_fee\":1}";
    const bbb=wasm.sign_limit_order(json,yz_priv_bytes);
    const pubbb = utils.hexlify(bbb.slice(0, 32)).substr(2);
    const signature_ss = utils.hexlify(bbb.slice(32)).substr(2);
    console.log("limit order signature",signature_ss);
}
