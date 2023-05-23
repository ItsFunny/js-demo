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


const signaturePacked = await wasm.sign_musig(yz_priv_bytes, hexStringToUint8Array("abcd"));
const pubKey = utils.hexlify(signaturePacked.slice(0, 32)).substr(2);
const signature = utils.hexlify(signaturePacked.slice(32)).substr(2);
console.log('signature.pubKey', pubKey);
console.log('signature.signature', signature);


const signaturePackedWithoutHash = await wasm.sign_musig_without_hash_msg(yz_priv_bytes, hexStringToUint8Array("abcd"));
const pubKeyWithoutHash = utils.hexlify(signaturePackedWithoutHash.slice(0, 32)).substr(2);
const signatureWithoutHash = utils.hexlify(signaturePackedWithoutHash.slice(32)).substr(2);
console.log('signature.pubKey withoutHash', pubKeyWithoutHash);
console.log('signature.signature withoutHash', signatureWithoutHash);

const pub_packed_bytes=await wasm.private_key_to_pubkey(yz_priv_bytes);
console.log("pub_scf",utils.hexlify(pub_packed_bytes))


const pub_xy_bytes=await wasm.private_key_to_pubkey_with_xy(yz_priv_bytes);
const x= utils.hexlify(pub_xy_bytes.slice(0, 32)).substr(2);
const y= utils.hexlify(pub_xy_bytes.slice(32)).substr(2);
console.log("x",x);
console.log("y",y);

const jsBytes='{"field1": "hello", "field2": 123}'
const aaa=await wasm.printA(jsBytes)
console.log("printA",aaa.toString())
