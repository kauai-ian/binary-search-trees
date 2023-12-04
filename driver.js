import { tree } from "./bst.js";

const randomArr = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};
const treeRoot = tree(randomArr(10));
treeRoot.prettyPrint();

console.log(`is tree balanced ? ${treeRoot.isBalanced()}`);

console.log(`Level order iterative: ${treeRoot.levelOrder()}`);
console.log(`Level order recursion: ${treeRoot.levelOrderRec()}`);

console.log(`In order recursion: ${treeRoot.inOrderRec()}`);
console.log(`In order iterative: ${treeRoot.inOrderIt()}`);

console.log(`Pre order recursion: ${treeRoot.preOrderRec()}`);
console.log(`Pre order iterative: ${treeRoot.preOrderIt()}`);

console.log(`Post order recursion: ${treeRoot.postOrderRec()}`);
console.log(`Post order iterative: ${treeRoot.postOrderIt()}`);

treeRoot.insert( 101);
console.log("adding 101")
treeRoot.insert( 200);
console.log("adding 200")
treeRoot.insert(300);
console.log("adding 300")
treeRoot.insert(400);
console.log("adding 400")

console.log(`is tree balanced ? ${treeRoot.isBalanced()}`);
treeRoot.rebalance();
console.log("rebalancing tree")
console.log(`is tree balanced ? ${treeRoot.isBalanced()}`);
treeRoot.prettyPrint();

console.log(`Level order iterative: ${treeRoot.levelOrder()}`);
console.log(`Level order recursion: ${treeRoot.levelOrderRec()}`);

console.log(`In order recursion: ${treeRoot.inOrderRec()}`);
console.log(`In order iterative: ${treeRoot.inOrderIt()}`);

console.log(`Pre order recursion: ${treeRoot.preOrderRec()}`);
console.log(`Pre order iterative: ${treeRoot.preOrderIt()}`);

console.log(`Post order recursion: ${treeRoot.postOrderRec()}`);
console.log(`Post order iterative: ${treeRoot.postOrderIt()}`);

// console.log(`Height: ${treeRoot.heightRec()}`);
// console.log(`Depth of 200: ${treeRoot.depthRec(200)}`);

// console.log(treeRoot.isBalanced());

// treeRoot.prettyPrint();
// treeRoot.remove(101);
// treeRoot.prettyPrint();
// console.log(treeRoot.find(200))
// console.log(treeRoot.findRec(400));

// function logNodeValue(nodeData) {
//   console.log(nodeData);
// }
